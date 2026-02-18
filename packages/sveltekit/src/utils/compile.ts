// Libs
import { execSync } from "child_process";
import { join } from "path";
import { stat } from "fs/promises";

// Types
import type { Builder } from "@sveltejs/kit";
import type { Target } from "../types/AdapterOptions";

// Constants
import { SVELTEKIT_DIR, TARGETS_MAP } from "../constants/const";

export async function compileApplication(
	builder: Builder,
	options: { target?: Target; out: string; binaryName: string; bunArgs?: string[] }
) {
	try {
		const bunVersion = execSync("bun --version", { encoding: "utf8", stdio: "pipe" }).trim();
		const versionParts = bunVersion.split(".").map(Number);

		if (versionParts.length !== 3 || versionParts.some(isNaN)) {
			builder.log.error(`Invalid Bun version format: ${bunVersion}`);
			process.exit(1);
		}

		const major = versionParts[0]!;
		const minor = versionParts[1]!;
		const patch = versionParts[2]!;
		const required = [1, 2, 18];

		const isVersionValid =
			major > required[0]! ||
			(major === required[0]! && minor > required[1]!) ||
			(major === required[0]! && minor === required[1]! && patch >= required[2]!);

		if (!isVersionValid) {
			builder.log.error(
				`Bun version ${bunVersion} is too old. Please upgrade to ${required.join(".")} or later with bun upgrade.`
			);
			process.exit(1);
		}
	} catch (error) {
		builder.log.error("Bun is not installed. Please install Bun and try again.");
		process.exit(1);
	}
	const compileArgs = [
		"build",
		"--compile",
		...(options.target ? [`--target=${TARGETS_MAP[options.target]}`] : []),
		...(options.bunArgs || []),
		join(SVELTEKIT_DIR, "temp-server/index.ts"),
		"--outfile",
		join(options.out, options.binaryName),
	].join(" ");
	execSync(`bun ${compileArgs}`, { stdio: "inherit" });

	// On Windows, Bun adds .exe extension automatically
	const isWindows = process.platform === "win32";
	const binaryPath = join(options.out, options.binaryName + (isWindows ? ".exe" : ""));
	const { size: sizeInBytes } = await stat(binaryPath);
	const sizeInMb = (sizeInBytes / (1024 * 1024)).toFixed(1);

	return { binaryPath, sizeInMb };
}
