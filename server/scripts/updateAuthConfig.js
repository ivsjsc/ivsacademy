#!/usr/bin/env node
// Usage: node server/scripts/updateAuthConfig.js --key <ADMIN_API_KEY> --file <path-to-json>
// This script writes ai/server/config/auth-config.json atomically and should be run locally or from CI using an ADMIN_API_KEY set in the environment.
const fs = require('fs');
const path = require('path');

const argv = require('minimist')(process.argv.slice(2));
const providedKey = argv.key || process.env.ADMIN_API_KEY;
const sourceFile = argv.file || argv.f;

if (!providedKey) {
  console.error('ADMIN_API_KEY must be provided via --key or ADMIN_API_KEY env var');
  process.exit(2);
}
if (!sourceFile) {
  console.error('Source JSON file must be provided with --file');
  process.exit(2);
}

// Simple verification to ensure this runs intentionally
if (providedKey === 'replace_with_admin_api_key') {
  console.error('Refusing to run with placeholder ADMIN_API_KEY');
  process.exit(2);
}

const dest = path.join(__dirname, '..', 'server', '..', 'ai', 'server', 'config', 'auth-config.json');
try {
  const txt = fs.readFileSync(sourceFile, 'utf8');
  const parsed = JSON.parse(txt);
  // Basic validation
  parsed.allowedEmails = parsed.allowedEmails || [];
  parsed.allowedDomains = parsed.allowedDomains || [];
  parsed.allowedGitHubOrgs = parsed.allowedGitHubOrgs || [];

  // Write atomically
  const tmp = dest + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(parsed, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, dest);
  console.log('Auth config updated at', dest);
  process.exit(0);
} catch (err) {
  console.error('Failed to update auth config:', err.message);
  process.exit(1);
}
