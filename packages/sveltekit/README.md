# Get started with SvelteKit

Requirements

- [Bun](https://bun.com/) installed on your machine to build the executable (not to run).

Install the package

```bash
npm install @jesterkit/exe-sveltekit
```

Use the adapter in your SvelteKit config file

```js
// svelte.config.js
import adapter from "@jesterkit/exe-sveltekit";

export default {
	kit: {
		adapter: adapter(),
	},
};
```

Build the executable

```bash
npm run build
```

Run the executable

```bash
./dist/app
```

## Adapter options

- `out`: The output directory for the built binary (default: `dist`).
- `binaryName`: The name of the executable (default: `app`).
- `embedStatic`: Whether to embed static assets in the binary (default: `true`).
- `target`: The target platform for the binary (default to your current platform). Available targets: `linux-x64`, `linux-x64-baseline`, `macos-arm64`, `windows-x64`, `windows-x64-baseline`, `darwin-x64`, `darwin-arm64`, `linux-x64-musl`, `linux-arm64-musl`.
- `volume`: The volume mount point for the binary (no volume mount by default). Useful for persistent storage for self-hosting, usually `/data`.

## Environment variables

- Make sure your import env variables from `$env/dynamic/private`, not from `$env/static/private`.
