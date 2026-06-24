# Ranky UI

[Ranky](https://ranky.top) is a Discord bot that creates custom League of Legends rankings for your
server. This is its web frontend: a React app that lets users log in with Discord, browse their
mutual servers with the bot, and view and manage their rankings directly in the browser — the same
data the bot works with.

## Running locally

```bash
npm install
npm run dev:mock       # no backend needed — fully mocked responses
npm run dev:local      # local backend  (http://localhost:8080)
npm run dev:deployed   # prod backend   (https://api.ranky.top)
```

| Profile    | API Base URL            | Mock mode |
|------------|-------------------------|-----------|
| `local`    | `http://localhost:8080` | `false`   |
| `deployed` | `https://api.ranky.top` | `false`   |
| `mock`     | —                       | `true`    |

No `.env` files needed — profiles are set via `REACT_APP_PROFILE` in `src/config.js`.

## Building & deploying

```bash
npm run build
```

The postbuild step copies the output to `/docs`, which is what GitHub Pages serves from the `main`
branch. Commit the `/docs` folder after every build intended for production.
