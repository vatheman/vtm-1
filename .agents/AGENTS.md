# Project Rules for vatheman/vtm-1

## Git Execution & Automated Push Instructions
- **Git Executable Path**: `C:\Users\바더만\AppData\Local\GitHubDesktop\app-3.6.3\resources\app\git\cmd\git.exe`
- When the user requests to push (e.g., "푸시하라", "git push"):
  1. Always set the PATH environment variable to include the GitHub Desktop Git directory before running git commands:
     `$gitCmd = "$env:LOCALAPPDATA\GitHubDesktop\app-3.6.3\resources\app\git\cmd"; $env:PATH = "$gitCmd;$env:PATH"`
  2. Automatically stage modified files, commit with a clear Korean/English summary message, and attempt `git push origin main`.
  3. If GitHub Desktop app is open, remind the user that they can also click `Push origin` directly in GitHub Desktop if GUI authentication is active.

## Supabase MCP Integration Instructions
- **Project Ref**: `hccxdafqavxioxnksgsy` (`vatheman's Project`)
- **Region**: `ap-northeast-2` (Seoul, South Korea)
- **Status**: `ACTIVE_HEALTHY`
- **Database Engine**: PostgreSQL 17 (`db.hccxdafqavxioxnksgsy.supabase.co`)
- **Personal Access Token**: Configured in `.env` and `mcp.json` (`SUPABASE_ACCESS_TOKEN`)
- The agent can automatically query, manage tables, run migrations, and manage database schema/records using Supabase Management API & MCP endpoints.
