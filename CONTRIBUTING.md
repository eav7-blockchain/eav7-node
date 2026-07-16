# Contributing to EAV7

Thanks for your interest in improving EAV7. This guide applies to all
repositories in the [`eav7-blockchain`](https://github.com/eav7-blockchain)
organization.

## Ground rules

- Be respectful — see the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Never commit secrets: private keys, wallet files (`*-wallet.json`), `.env`
  files, or the `data/` directory. These are git-ignored; keep them that way.
- Consensus-affecting changes must be **gated by a fork height** and remain
  backward-compatible with the historical chain (grandfathering). Never ship a
  change that would fork or halt a running network without coordination.

## Workflow

1. Fork the repository and create a topic branch from `main`
   (`feat/…`, `fix/…`, `docs/…`).
2. Make your change with tests that cover it.
3. Run the test suite locally and make sure it is green.
4. Open a Pull Request describing **what** changed and **why**, and note any
   consensus/fork-height implications.

## Node repository (`eav7-node`)

- 100% Node.js (>= 24), **zero external dependencies** — do not add npm
  packages. Use only the Node standard library.
- Run the tests: `npm test` (which runs `node --test test/`).
- Match the surrounding code style, comment density, and naming.

## Explorer repository (`eav7-scan`)

- Next.js app. `npm run build` must pass (TypeScript + lint).
- Keep the i18n dictionaries in sync (`node scripts/merge-i18n.mjs`).

## Commit messages

Use clear, imperative messages (`fix: reject high-s block signatures`).
Reference issues where relevant.

## Reporting bugs

Open an issue using the provided templates. For **security** issues, do **not**
open a public issue — follow the [Security Policy](./SECURITY.md).
