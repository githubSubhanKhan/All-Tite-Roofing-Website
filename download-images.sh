#!/usr/bin/env bash
# Downloads the AI-generated hero/service images and All-Tite's own project photos
# into images/. Run from this folder:  bash download-images.sh
mkdir -p images/projects
get() { curl -fsSL -o "$1" "$2" && echo "OK   $1" || echo "FAIL $1  ->  open $2 in your browser and save it as $1"; }

get images/hero.jpg       https://www.trybloom.ai/img/955ac721-44ab-4e3b-8e7e-1ee137bb4b5c
get images/commercial.jpg https://www.trybloom.ai/img/46472634-09ac-410f-9ce0-d0d406c4e3e7
get images/craft.jpg      https://www.trybloom.ai/img/a753c6ed-b96e-4ba6-b2bb-5add50f302ac

CDN=https://primary.jwwb.nl/public/y/y/t/temp-vbzyliilpgxqtwceeavp
for n in white-granular-completed-roof black-granular-alsan-flashings wall-flashing-scaffolding deck-replacement torch-patching edges-of-the-newly-installed-area; do
  get "images/projects/$n.jpg" "$CDN/$n-high.jpg"
done
get images/projects/oldhouserestoration.webp "$CDN/oldhouserestoration-high.webp"
