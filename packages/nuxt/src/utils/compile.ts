// Libs
import { execSync } from "child_process";
import { join } from "path";
import { stat } from "fs/promises";

// Utils
import { TARGETS_MAP } from "../constants/const";

// Types
import type { CLIArgs } from "../types/CLIArgs";

export async function compileApplication(options: CLIArgs) {
	const out = options.out || "dist";
	const binaryName = options.binaryName || "app";

	try {
		const bunVersion = execSync("bun --version", { encoding: "utf8", stdio: "pipe" }).trim();
		const versionParts = bunVersion.split(".").map(Number);

		if (versionParts.length !== 3 || versionParts.some(isNaN)) {
			console.error(`Invalid Bun version format: ${bunVersion}`);
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
			console.error(
				`Bun version ${bunVersion} is too old. Please upgrade to ${required.join(".")} or later with bun upgrade.`
			);
			process.exit(1);
		}
	} catch (error) {
		console.error("Bun is not installed. Please install Bun and try again.");
		process.exit(1);
	}
	const compileArgs = [
		"build",
		"--compile",
		...(options.target ? [`--target=${TARGETS_MAP[options.target]}`] : []),
		...(options.bunArgs || []),
		".output/bundle.js",
		"--outfile",
		join(out, binaryName),
	].join(" ");
	execSync(`bun ${compileArgs}`, { stdio: "inherit" });

	const binaryPath = join(out, binaryName);
	const { size: sizeInBytes } = await stat(binaryPath);
	const sizeInMb = (sizeInBytes / (1024 * 1024)).toFixed(1);

	return { binaryPath, sizeInMb };
}
