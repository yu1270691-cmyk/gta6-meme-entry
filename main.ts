// gta6-meme-x-01 entry program (Node 22, standard library only).
// Its one job: carry POST.json from the repository root over to the output directory,
// where the grader reads the post's address. Nothing else is needed.
//
// Local run (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const sourceDir: string = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const targetDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourceFile = resolve(sourceDir, 'POST.json');
const targetFile = resolve(targetDir, 'POST.json');

mkdirSync(targetDir, { recursive: true });

try {
  copyFileSync(sourceFile, targetFile);
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`POST.json could not be copied from ${sourceDir}: ${reason}`);
  process.exit(1);
}
