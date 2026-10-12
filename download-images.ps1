# Downloads the AI-generated hero/service images and All-Tite's own project photos
# into the images/ folder. Run from this folder:  powershell -ExecutionPolicy Bypass -File .\download-images.ps1
$ErrorActionPreference = "Continue"
New-Item -ItemType Directory -Force -Path "images\projects" | Out-Null

$files = @{
  "images\hero.jpg"       = "https://www.trybloom.ai/img/955ac721-44ab-4e3b-8e7e-1ee137bb4b5c"
  "images\commercial.jpg" = "https://www.trybloom.ai/img/46472634-09ac-410f-9ce0-d0d406c4e3e7"
  "images\craft.jpg"      = "https://www.trybloom.ai/img/a753c6ed-b96e-4ba6-b2bb-5add50f302ac"
}
$cdn = "https://primary.jwwb.nl/public/y/y/t/temp-vbzyliilpgxqtwceeavp"
foreach ($n in "white-granular-completed-roof","black-granular-alsan-flashings","wall-flashing-scaffolding","deck-replacement","torch-patching","edges-of-the-newly-installed-area") {
  $files["images\projects\$n.jpg"] = "$cdn/$n-high.jpg"
}
$files["images\projects\oldhouserestoration.webp"] = "$cdn/oldhouserestoration-high.webp"

foreach ($k in $files.Keys) {
  try {
    Invoke-WebRequest -Uri $files[$k] -OutFile $k -UseBasicParsing
    Write-Host "OK   $k"
  } catch {
    Write-Host "FAIL $k  ->  open $($files[$k]) in your browser and save it as $k"
  }
}
