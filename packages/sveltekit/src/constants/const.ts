// Types
import type { AdapterOptions } from "../types/AdapterOptions";

export const ADAPTER_NAME = "jesterkit-sveltekit";
export const SVELTEKIT_DIR = `.svelte-kit/${ADAPTER_NAME}`;
export const TARGETS_MAP: Record<NonNullable<AdapterOptions["target"]>, string> = {
	"linux-x64": "bun-linux-x64",
	"linux-x64-baseline": "bun-linux-x64-baseline",
	"macos-arm64": "bun-macos-arm64",
	"windows-x64": "bun-windows-x64",
	"windows-x64-baseline": "bun-windows-x64-baseline",
	"darwin-x64": "bun-darwin-x64",
	"darwin-arm64": "bun-darwin-arm64",
	"linux-x64-musl": "bun-linux-x64-musl",
	"linux-arm64-musl": "bun-linux-arm64-musl",
};
