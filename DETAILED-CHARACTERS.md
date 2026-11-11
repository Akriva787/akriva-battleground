# Additional detailed characters

Victor Tactical and Forest Elf join Classic Battleground and the seven tactical outfit variants in the default gallery. Open Characters, select either card, inspect its rotating 3D preview, and press Done. Selection persists locally and uses existing online outfit synchronization. Desktop and mobile use the same roster and models.

Each new character has a distinct mesh, original texture atlas, and baked idle/walk/run poses. Geometry and textures load on selection, rather than adding both large models to startup. Existing weapons, modes and saved character choices are preserved. Source attribution appears in ASSET-NOTICES.md.

Run `node verify-detailed.cjs` and `node verify-settings.cjs` for asset packing and control/selection regression checks. Physical phone performance and matches with 104 simultaneous detailed characters remain unmeasured.
