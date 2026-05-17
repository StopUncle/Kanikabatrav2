/**
 * Generate a Dark Mirror scenario from a markdown spec.
 *
 * Usage:
 *   tsx scripts/generate-scenario.ts content/scenario-specs/<file>.md
 *
 * Flow:
 *   1. Parse the spec.
 *   2. Call the Anthropic API (claude-opus-4-7) to generate the .ts file body.
 *   3. Write the file to lib/simulator/scenarios/<track>/<id>.ts.
 *   4. Structural lint the result in-process.
 *   5. Print a summary and, if requested, run the full typecheck.
 *
 * The script intentionally does NOT auto-commit, does NOT auto-wire the
 * track's index.ts, and does NOT auto-retry on validation failure. The
 * human stays in the loop: review the prose, wire the file in by hand,
 * commit deliberately.
 */

import fs from "node:fs";
import path from "node:path";
import { parseSpec } from "./lib/scenario-spec-parser";
import { generateScenario } from "./lib/scenario-generator";
import {
  lintGeneratedFile,
  runTypecheck,
} from "./lib/scenario-validator";

async function main() {
  const args = process.argv.slice(2);
  const specPath = args.find((a) => !a.startsWith("-"));
  const skipTypecheck = args.includes("--skip-typecheck");

  if (!specPath) {
    console.error(
      "Usage: tsx scripts/generate-scenario.ts <path-to-spec.md> [--skip-typecheck]",
    );
    process.exit(2);
  }

  if (!fs.existsSync(specPath)) {
    console.error(`Spec not found: ${specPath}`);
    process.exit(2);
  }

  const projectRoot = path.resolve(__dirname, "..");
  const source = fs.readFileSync(specPath, "utf8");

  // 1. Parse.
  let parsed: ReturnType<typeof parseSpec>;
  try {
    parsed = parseSpec(source);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(2);
  }
  console.log(`Spec: ${parsed.spec.id} (track: ${parsed.spec.track})`);

  // 2. Check we are not about to overwrite an existing scenario silently.
  const outputDir = path.join(
    projectRoot,
    "lib",
    "simulator",
    "scenarios",
    parsed.spec.track,
  );
  const outputPath = path.join(outputDir, `${parsed.spec.id}.ts`);
  if (fs.existsSync(outputPath)) {
    console.error(
      `Refusing to overwrite ${outputPath}. Delete the file first if you want to regenerate.`,
    );
    process.exit(2);
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 3. Generate.
  console.log("Calling Anthropic API (this may take 30 to 90 seconds)...");
  let result: Awaited<ReturnType<typeof generateScenario>>;
  try {
    result = await generateScenario(parsed.spec, parsed.body, { projectRoot });
  } catch (err) {
    console.error(`Generation failed: ${(err as Error).message}`);
    process.exit(1);
  }
  console.log(
    `Generated ${result.source.length} characters. Tokens: ${result.usage.input} in, ${result.usage.output} out. Stop reason: ${result.stopReason ?? "unknown"}.`,
  );

  // 4. Write the file.
  fs.writeFileSync(outputPath, result.source, "utf8");
  console.log(`Wrote ${path.relative(projectRoot, outputPath)}`);

  // 5. Structural lint.
  const lintResult = await lintGeneratedFile(outputPath);
  if (lintResult.errors.length > 0) {
    console.error(`\nStructural validation failed:`);
    for (const e of lintResult.errors) console.error(`  - ${e}`);
    console.error(
      `\nThe generated file is at ${outputPath}. Review, fix, or delete it.`,
    );
    process.exit(1);
  }
  const scenario = lintResult.scenario!;
  const endingCount = scenario.scenes.filter((s) => s.isEnding).length;
  console.log(
    `Structural lint passed: ${scenario.scenes.length} scenes, ${endingCount} endings.`,
  );

  // 6. Optional full typecheck.
  if (!skipTypecheck) {
    console.log("Running `npm run type-check` (slow)...");
    const tc = runTypecheck(projectRoot);
    if (!tc.ok) {
      console.error("\nTypecheck failed:");
      console.error(tc.output);
      process.exit(1);
    }
    console.log("Typecheck passed.");
  } else {
    console.log("Typecheck skipped (--skip-typecheck).");
  }

  // 7. Print next steps. We deliberately do not auto-wire index.ts: the
  // delta is small enough for the human to apply and review.
  const indexPath = path.relative(
    projectRoot,
    path.join(outputDir, "index.ts"),
  );
  console.log(`
Generated successfully. The scenario is NOT yet wired into the registry.
To finish:

  1. Open ${indexPath} and add:
       import s_${parsed.spec.id.replace(/-/g, "_")} from "./${parsed.spec.id}";
     then append s_${parsed.spec.id.replace(/-/g, "_")} to the track's SCENARIOS array.

  2. Re-run \`npx tsx scripts/validate-scenarios.ts\` to make sure the full
     registry still passes (catches duplicate-id collisions across tracks).

  3. Read the prose for tone and accuracy before committing. The model
     produces a draft, not a finished cut.
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
