## Backend/Contracts

1. `forc new contract` - create new project
2. Copy contracts from native-asset-contract
3. Create fuel-toolchain.toml with the contents
    ```
    [toolchain]
    channel = "nightly-2024-04-12"

    [components]
    forc = "0.53.0"
    fuel-core = "0.23.0"
    ```
4. run `forc build`