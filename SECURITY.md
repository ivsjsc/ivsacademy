# Security & Secret Management

This document explains how to manage secrets for this repository and rotate credentials when needed.

## Immediate action: rotate any exposed keys
If you find any real API keys committed (for example in `server/.env`), rotate them immediately at the provider (OpenAI, Google Cloud, etc.) and revoke the old keys.

## Local development
- Keep a `server/.env` **only** on your local machine. Do NOT commit it.
- Use `server/.env.example` as the template to copy from:
  - `cp server/.env.example server/.env`
  - Fill the real values on your machine.
- To generate secure values locally:
  - Linux/macOS: `openssl rand -hex 32`
  - PowerShell: `[Convert]::ToBase64String((New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes(32))`
  - Node: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## CI / Production
- Store secrets in your cloud provider or GitHub Actions (repository/org secrets).
- Example GitHub Actions usage:

```yaml
env:
  SESSION_SECRET: ${{ secrets.SESSION_SECRET }}
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

- Ensure `NODE_ENV=production` and secure cookie flags are enabled.

## Secret scanning in CI
- A secret scanning script is added at `server/scripts/check_secrets.js` and is run on server CI (`.github/workflows/server-ci.yml`).
- If the scan fails on a PR, you must remove or rotate the secret and push again.

## Rotating secrets (recommended steps)
1. Generate a new key in the provider dashboard (OpenAI, Google Cloud, etc.).
2. Add the new key to your secret manager (e.g., GitHub Secrets) under a new name or the same name.
3. Deploy to a staging environment and validate functionality.
4. Revoke the old key in the provider dashboard.
5. If the old key was committed to the repo, consider rotating any other keys that may have been exposed and update the incident/ops log.

## If secrets were committed
- Immediately rotate the keys at the provider and remove them from source. Optionally, consider rewriting Git history if they were committed in recent commits (coordinate with your team).
- Update the incident log and notify stakeholders.

## Contact
- For help: open an issue and tag @maintainers for urgent secret rotation.
