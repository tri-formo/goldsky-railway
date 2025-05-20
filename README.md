# Express TypeScript API Server

A simple Express.js API server written in TypeScript.

## Installation

```bash
npm install
```

## Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server
- `npm run watch` - Watch for changes and rebuild

## API Endpoints

- `GET /` - Welcome message
- `GET /api/hello` - Returns a hello message
- `POST /api/echo` - Echoes back the request body

## Development

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable.

To start the development server:

```bash
npm run dev
```

## Building for Production

To build the TypeScript code:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```
