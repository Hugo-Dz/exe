# Get started with TanStack

⚠️ The TanStack package is **experimental**.

Requirements:

- [Bun](https://bun.com/) installed on your machine to build the executable (not to run).

Install the package

```bash
npm install @jesterkit/exe-tanstack
```

Add the postbuild script to your `package.json`

```json
{
	"scripts": {
		"postbuild": "exe-tanstack"
	}
}
```

Build the executable

```bash
npm run build
```

Run the executable.

```bash
./dist/app
```

## Postbuild options

- `out`: The output directory for the built binary (default: `dist`).
- `binaryName`: The name of the executable (default: `app`).
- `target`: The target platform for the binary (default to your current platform). Available targets: `linux-x64`, `linux-x64-baseline`, `macos-arm64`, `windows-x64`, `windows-x64-baseline`, `darwin-x64`, `darwin-arm64`, `linux-x64-musl`, `linux-arm64-musl`.
- `volume`: The volume mount point for the binary (no volume mount by default). Useful for persistent storage for self-hosting, usually `/data`.
- `external`: The external dependencies to exclude from bundling (comma-separated string or array).

Example

```json
{
	"scripts": {
		"postbuild": "exe-tanstack --out dist --binaryName my-app --target linux-x64 --volume /data"
	}
}
```
