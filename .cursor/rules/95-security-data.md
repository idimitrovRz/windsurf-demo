# Security & Data Safety — Browser Game Reality

## External data
If the project consumes external/untrusted data (API, query params, storage, postMessage):
- Validate using Zod (preferred) or equivalent runtime schema validation.
- Never trust JSON shape at compile time.

## Sensitive info
- Do not log secrets, tokens, user identifiers, or raw payloads in production.
- Use structured, redacted logs when necessary.

## Storage
- Treat localStorage/sessionStorage as untrusted input on read.
- Validate and version stored payloads.

## Anti-cheat / integrity
- Assume client code is inspectable and modifiable.
- Do not implement “security through obscurity” claims.
- Prefer server-side enforcement for critical integrity decisions.
