# Security Policy

The EAV7 team takes the security of the protocol, the node software, and the
network seriously. We appreciate responsible disclosure.

## Supported versions

The `main` branch and the latest tagged release receive security fixes.

## Reporting a vulnerability

**Do not open a public issue for security vulnerabilities.**

Report privately to **security@eav7.com** (or **contato@eav7.com**) with:

- a description of the issue and its impact;
- steps to reproduce or a proof of concept;
- affected component (node, EAVM, bridge, explorer) and version/commit.

You can expect an acknowledgement within **72 hours** and a remediation plan
after triage. Consensus-affecting fixes are rolled out as **coordinated
hard forks gated by block height** — please allow time for a safe deployment
across validators before any public disclosure.

## Scope

In scope: consensus and block validation, the EAVM, cryptography
(`eav7-hybrid-1`: secp256k1 + ML-DSA-44), the cross-chain bridge, transaction
and state handling, the JSON-RPC / REST surfaces, and the P2P layer.

Out of scope: issues that require a compromised operator machine, social
engineering, or third-party wallet limitations.

## Recognition

With your consent, we credit reporters of valid vulnerabilities in the
release notes of the fix.
