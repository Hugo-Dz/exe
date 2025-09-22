import type { CLIArgs } from "../types/CLIArgs";

export const VALID_TARGETS = [
	"linux-x64",
	"linux-x64-baseline",
	"macos-arm64", 
	"windows-x64",
	"windows-x64-baseline",
	"darwin-x64",
	"darwin-arm64",
	"linux-x64-musl",
	"linux-arm64-musl"
] as const;

export interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

export function validateCLIArgs(args: any): ValidationResult {
	const errors: string[] = [];
	if (args.target && !VALID_TARGETS.includes(args.target)) {
		errors.push(`Invalid target "${args.target}". Valid targets: ${VALID_TARGETS.join(", ")}`);
	}
	if (args.out && typeof args.out !== "string") {
		errors.push("Output directory must be a string");
	}
	if (args.binaryName && typeof args.binaryName !== "string") {
		errors.push("Binary name must be a string");
	}
	if (args.volume && typeof args.volume !== "string") {
		errors.push("Volume must be a string");
	}
	if (args.external) {
		if (typeof args.external !== "string" && !Array.isArray(args.external)) {
			errors.push("External dependencies must be a string or array of strings");
		}
	}

	return {
		isValid: errors.length === 0,
		errors
	};
}
