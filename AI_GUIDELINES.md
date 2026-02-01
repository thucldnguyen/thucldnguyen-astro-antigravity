# AI Agent Guidelines

## Workflow Rules

### Testing & Verification
- **Do NOT auto-run browser tests or UI verification steps** after every code change.
- **Batch verification**: Only run tests when explicitly requested by the user, or at the very end of a significant session.
- **Respect User Focus**: Avoid interrupting the flow with long-running automated tasks unless authorized.

## Project Context
- **Project**: thucldnguyen-astro-antigravity
- **Framework**: Astro
- **Browser Automation**: Use sparingly and only upon request.
