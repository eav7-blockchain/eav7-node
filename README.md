<div align="center">

# EAV7 Node

**A DPoS Layer-1 blockchain with an EVM-compatible VM, post-quantum hybrid signatures, a native AI layer and a trustless cross-chain bridge — written in 100% pure Node.js with zero external dependencies.**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](./package.json)
[![Tests](https://img.shields.io/badge/tests-156_passing-brightgreen)](./test)
[![Chain ID](https://img.shields.io/badge/Chain_ID-72020-8A2BE2)](https://eavscan.com)

[Explorer](https://eavscan.com) · [Documentation](https://github.com/eav7-blockchain/eav7-docs) · [Explorer source](https://github.com/eav7-blockchain/eav7-scan)

</div>

---

## Overview

EAV7 is a Layer-1 blockchain inspired by TRON, with DPoS consensus, a TRX-style
token economy and the **EAV20** token standard (TRC-20 equivalent). It is
implemented from scratch in modern Node.js (>= 24) with **no third-party
packages** — the entire node, VM, cryptography, P2P and REST layers use only the
Node standard library.

```bash
# spin up a mining node (creates the wallet and genesis on its own)
node bin/eav7.js mine

# mining dashboard:  http://127.0.0.1:6070/app
# run the tests:     npm test
```

## Highlights

| Area | What EAV7 ships |
|------|-----------------|
| **Consensus** | DPoS, up to 27 validators elected by **stake + votes**, 1s blocks, deterministic round-robin, **BFT finality** |
| **Security** | `eav7-hybrid-1` — every wallet/tx/block carries **two** signatures: secp256k1 **and** ML-DSA-44 (NIST FIPS 204 post-quantum) |
| **EAVM** | Own EVM-compatible VM (keccak-256, secp256k1 `ecrecover`, RLP) — add EAV7 to MetaMask / Trust Wallet as a custom network |
| **State commitment** | Merkle **state root** in every header → light clients and account proofs |
| **Bridge** | **Trustless** lock-and-release with source-committee proofs (M-of-N quorum) and signed committee rotation |
| **Governance** | On-chain parameter voting (2/3+1), **treasury**, timelock, permissions & multisig |
| **Assets** | EAV20 tokens (+ admin: mint/burn/pause/blacklist/freeze), **EAV721** NFTs, **EAV-NS** name service |
| **DeFi primitives** | Voter rewards, resource model (energy + bandwidth) with delegation, vesting, gasless meta-transactions |
| **AI layer** | Native on-chain AI tasks with escrow, designated oracle and result proof |

## Network parameters

| Item | Value |
|------|-------|
| Native coin | **EAV7** — 6 decimals (1 EAV7 = 1,000,000 e7) |
| Genesis supply | 100,000,000,000 EAV7 |
| Block time | 1s |
| Block reward | 16 EAV7 (with halving) |
| Active validators | up to 27 |
| Addresses | `E7` + 32 hex (34 chars) |
| Hashes | `E7` + SHA3-256 (64 chars) |
| EAVM Chain ID | **72020** |
| Public RPC | `https://rpc.eavscan.com` |

## Running a node

```bash
# seed node
node bin/eav7.js mine --port 6070

# a second miner joining the network
node bin/eav7.js mine --port 6071 --peers http://127.0.0.1:6070
node bin/eav7.js faucet <ADDRESS> --node http://127.0.0.1:6070
node bin/eav7.js stake --wallet data/node-6071/validator-wallet.json --amount 1000
```

### CLI

```text
eav7 wallet new | wallet show <file>
eav7 mine | node start [--port] [--peers] [--observer] [--genesis file]
eav7 status | balance <E7…> | faucet <E7…>
eav7 send  --wallet w.json --to E7… --amount 12.5
eav7 stake | unstake --wallet w.json --amount 1000
eav7 token create | send | list | info
eav7 ai task | tasks | worker | sentinel
eav7 bridge out | transfers
```

## Architecture

```
src/config.js            protocol parameters (tokenomics, fees, timings, fork heights)
src/crypto/hash.js       E7 hash (SHA3-256), canonical JSON, merkle
src/crypto/keys.js       eav7-hybrid-1: secp256k1 + ML-DSA-44, E7 addresses
src/core/transaction.js  48 signed transaction types (dual signature)
src/core/block.js        producer-signed blocks (+ state root) + genesis
src/core/state.js        state machine: accounts, staking, votes, tokens/NFTs,
                         names, permissions, resources, governance, treasury, AI, bridge
src/core/stateroot.js    Merkle state commitment + account proofs (light clients)
src/core/blockstore.js   on-disk blocks + in-RAM window (snapshot boot, O(window) reorg)
src/core/blockchain.js   chain, DPoS validation, BFT finality, fork choice, persistence
src/eavm/               the EAVM (VM, host, keccak, RLP) + MetaMask/Trust RPC
src/bridge/             trustless cross-chain relayer + committee proofs
src/ai/                 on-chain AI task builders, oracle worker, security sentinel
src/node/{node,api,p2p} full node: production, REST, gossip and sync
bin/eav7.js             CLI
public/app.html         mining dashboard
test/                   156 tests across 36 files (node:test)
```

## Testing

```bash
npm test        # runs node --test over test/
```

All consensus-affecting changes are **gated by a fork height** and remain
backward-compatible with the historical chain. Set `EAV7_GENESIS_ACTIVE=1` to
launch a fresh network with every feature active from block 0.

## Wallets (MetaMask / Trust Wallet)

Add EAV7 as a custom EVM network:

| Field | Value |
|-------|-------|
| Network name | EAV7 EAVM |
| RPC URL | `https://rpc.eavscan.com` |
| Chain ID | `72020` |
| Symbol | EAV7 |
| Explorer | `https://eavscan.com` |

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md). Please note
the project is **zero-dependency** by design (Node standard library only), and
consensus changes must be fork-height gated.

## Security

Found a vulnerability? Please follow our [Security Policy](./SECURITY.md) and
disclose privately — do **not** open a public issue.

## License

[Apache License 2.0](./LICENSE) © EAV7 Blockchain
