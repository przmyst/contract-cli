# Terra Contract CLI

Interact with the Terra blockchain easily using this command-line interface (CLI) script. Perform actions such as storing a contract, instantiating it, executing functions, querying state, and migrating contracts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/przmyst/contract-cli
   ```
2. Navigate to the directory and install the dependencies:
   ```bash
   npm install
   ```

## Usage

You can interact with the Terra blockchain by using the following command format:

```bash
node index <command> [arguments...]
```

Ensure you have the necessary environment variables set up, such as `MNEMONIC`, `CHAIN_ID`, etc.

## Commands

- **store**: Store a WASM contract on the Terra blockchain.
  ```bash
  node index store [path-to-wasm-file]
  ```

- **instantiate**: Instantiate a stored contract.
  ```bash
  node index instantiate [code-id] [luna-deposit] [label]s
  ```

- **execute**: Execute the `increment` function of a given contract.
  ```bash
  node index execute [contract-address]
  ```

- **query**: Query the state of a given contract.
  ```bash
  node index query [contract-address]
  ```

- **migrate**: Migrate a contract to new code.
  ```bash
  node index migrate [code-id]
  ```
