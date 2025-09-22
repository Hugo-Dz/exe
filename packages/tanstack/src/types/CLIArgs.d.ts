type Target =
	| "linux-x64"
	| "linux-x64-baseline"
	| "macos-arm64"
	| "windows-x64"
	| "windows-x64-baseline"
	| "darwin-x64"
	| "darwin-arm64"
	| "linux-x64-musl"
	| "linux-arm64-musl";

export declare type CLIArgs = {
	/** Output directory for the built binary (/dist by default) */
	out?: string;
	/** Name of the executable binary (default: "app") */
	binaryName?: string;
	/** Target platform for the binary. By default, the binary is built for the current platform. */
	target?: Target;
	/** Volume mount point for the binary (default no volume mount). Can be used for persistent storage, usually /data. */
	volume?: string;
	/** External dependencies to exclude from bundling (comma-separated string or array) */
	external?: string | string[];
};
