import {
    LCDClient,
    MnemonicKey,
    MsgStoreCode,
    MsgInstantiateContract,
    MsgExecuteContract,
    MsgMigrateContract
} from '@terra-money/terra.js'
import * as fs from 'fs'

async function init() {
    const mk = new MnemonicKey({
        mnemonic: process.env.MNEMONIC
    })

    const terra = new LCDClient({
        URL: process.env.LCD_URL,
        chainID: process.env.CHAIN_ID,
        gasPrices: {
            [process.env.GAS_DENOM]: process.env.GAS_PRICE
        },
        isClassic: true
    })

    const wallet = terra.wallet(mk)
    let msg

    switch (process.argv[2]) {
        case 'store':
            msg = new MsgStoreCode(
                wallet.key.accAddress,
                fs.readFileSync(process.argv[3] || process.env.WASM_FILE).toString('base64')
            )
            break

        case 'instantiate':
            msg = new MsgInstantiateContract(
                wallet.key.accAddress,
                wallet.key.accAddress,
                process.argv[3] || process.env.CODE_ID,
                {count: 0},
                {uluna: process.argv[4] || 1 },
                process.argv[5] || process.env.CONTRACT_LABEL
            )
            break

        case 'execute':
            msg = new MsgExecuteContract(
                wallet.key.accAddress,
                process.argv[3] || process.env.CONTRACT_ADDRESS,
                {increment: {}}
            )
            break

        case 'migrate':
            msg = new MsgMigrateContract(
                wallet.key.accAddress,
                process.env.CONTRACT_ADDRESS,
                process.argv[3] || process.env.CODE_ID,
                {count: 0},
            )
            break
    }

    if (msg) {
        await broadcastAndLog(terra, wallet, msg)
    } else if (process.argv[2] === 'query') {
        const result = await terra.wasm.contractQuery(
            process.argv[3] || process.env.CONTRACT_ADDRESS,
            {get_count: {}}
        )
        console.log(result)
    }
}

async function broadcastAndLog(terra, wallet, msg) {
    try {
        const tx = await wallet.createAndSignTx({
            msgs: [msg],
            chainID: process.env.CHAIN_ID
        })

        const txResult = await terra.tx.broadcastSync(tx, process.env.CHAIN_ID)

        console.log(`https://finder.terraclassic.community/mainnet/tx/${txResult.txhash}`)
    } catch (e) {
        console.error(e)
    }
}

init().catch(console.error)
