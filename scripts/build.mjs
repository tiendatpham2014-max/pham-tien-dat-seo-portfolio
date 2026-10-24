import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const targets = {
  "dist/index.html": [
    "src/html/00-document-open.html",
    "src/html/10-navigation.html",
    "src/html/20-main-open.html",
    "src/html/30-hero.html",
    "src/html/40-approach.html",
    "src/html/45-search-scene.html",
    "src/html/50-evidence.html",
    "src/html/60-process.html",
    "src/html/70-skills.html",
    "src/html/80-writing.html",
    "src/html/90-journey.html",
    "src/html/100-contact.html",
    "src/html/110-document-close.html",
  ],
  "dist/style.css": [
    "src/css/00-foundation.css",
    "src/css/10-navigation.css",
    "src/css/20-hero.css",
    "src/css/30-approach.css",
    "src/css/40-evidence.css",
    "src/css/50-process.css",
    "src/css/60-skills.css",
    "src/css/70-writing.css",
    "src/css/90-contact-footer.css",
    "src/css/100-responsive-base.css",
    "src/css/110-motion.css",
    "src/css/120-comparison.css",
    "src/css/130-contact-motion.css",
    "src/css/140-responsive-motion.css",
    "src/css/150-evidence-story.css",
    "src/css/170-responsive-stories.css",
    "src/css/180-art-direction.css",
    "src/css/185-dark-direction.css",
    "src/css/190-search-scene.css",
    "src/css/195-evidence-story.css",
    "src/css/196-career-horizon-scene.css",
    "src/css/198-theme-control.css",
    "src/css/200-light-theme.css",
  ],
  "dist/app.js": [
    "src/js/00-copy.js",
    "src/js/10-gsc-data.js",
    "src/js/20-state.js",
    "src/js/22-theme.js",
    "src/js/25-signal-lab.js",
    "src/js/30-metrics.js",
    "src/js/40-navigation.js",
    "src/js/50-language.js",
    "src/js/60-mobile-menu.js",
    "src/js/70-skills.js",
    "src/js/80-writing-rail.js",
    "src/js/90-comparison.js",
    "src/js/100-scroll-stories.js",
    "src/js/105-search-scene.js",
    "src/js/110-init.js",
  ],
};

const check = process.argv.includes("--check");
for (const [output, fragments] of Object.entries(targets)) {
  const contents = await Promise.all(
    fragments.map(async (fragment) => (await readFile(resolve(root, fragment), "utf8")).replace(/\r\n/g, "\n")),
  );
  const built = contents.join("");
  if (check) {
    const current = (await readFile(resolve(root, output), "utf8")).replace(/\r\n/g, "\n");
    if (current !== built) {
      throw new Error(`${output} is out of date. Run npm run build.`);
    }
  } else {
    await writeFile(resolve(root, output), built, "utf8");
  }
  process.stdout.write(`${check ? "Checked" : "Built"} ${output} from ${fragments.length} parts\n`);
}
