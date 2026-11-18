# Social Network

A full-stack social-network project from the SPICED Academy web-development bootcamp. It explores account workflows, user discovery, editable profiles, and friendship requests.

## Features

- Registration, login, and cookie-based sessions.
- Profile photos and biography editing.
- User discovery and search.
- Send, accept, or cancel friendship requests and list friends.
- PostgreSQL persistence and S3-backed photo uploads.
- Password-reset UI and backend exercises.

## Stack

React 18, TypeScript and JavaScript, Redux Toolkit, React Router, Bootstrap, Express, PostgreSQL, AWS SDK v2, and Webpack. Socket.IO is listed as a dependency, but the chat screen is currently a placeholder, not an implemented real-time feature.

## Local setup

Requirements: Node.js/npm, PostgreSQL with `psql`, and your own S3 development bucket. The original manifest targets Node 14; compatibility with a supported Node release should be checked when restoring the project.

```bash
git clone https://github.com/Shubender/social-network.git
cd social-network
npm ci
createdb social_network
psql -d social_network -f server/initial.sql
```

The SQL file recreates tables; use an empty development database. Create a root `.env`:

```dotenv
PORT=3001
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/social_network
SESSION_SECRET=replace-with-a-long-random-local-value
AWS_KEY=your-access-key
AWS_SECRET=your-secret-key
AWS_BUCKET=your-development-bucket
```

```bash
npm run dev
```

Open `http://localhost:3000`. Webpack proxies requests to the Express server on port 3001. The repository also provides `npm run build`, `npm start`, and `npm test`; their presence does not mean the build or tests currently pass.

## Code guide

- [Server routes](server/server.js) and [database queries](server/db.js)
- [React components](client/src/components) and [Redux friendship state](client/src/redux/friends)
- [Webpack configuration](webpack.config.js) and [database schema](server/initial.sql)

## Project status

Educational implementation, not a production social platform. The password-reset exercise returns a reset code in its response and the email sender is disconnected; that flow needs redesign before real use. The chat component is explicitly under construction. Full startup, existing tests, and AWS integrations have not been revalidated in this documentation update.
