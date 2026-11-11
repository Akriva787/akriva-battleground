# AKRIVA asset notices

## Tactical operators

Mixamo Soldier from the three.js examples, with original Akriva texture recolours. Uses the existing baked idle/walk/run clips and normal maps. Seven tactical outfits share this model; they are cosmetic variations, not seven separate body meshes.

- Source: https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/Soldier.glb
- Mixamo terms: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html

## Additional stylized operator roster

Characters from Quaternius's "Ultimate Animated Character Pack" (CC0), with their own idle/walk/run animations baked into frames. Colours and poses are kept as the pack ships them. The military soldier models from the pack are not used.

- Pack: https://quaternius.com/packs/ultimatedanimatedcharacter.html
- License: CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/

## Mira operator

Mixamo "Michelle" character as distributed in the three.js examples (`Michelle.glb`), simplified to about 14,000 triangles, with the idle/walk/run animations of the three.js example soldier retargeted and baked into frames. The in-game name "Mira" is original to Akriva.

- Model source: https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/Michelle.glb
- Mixamo usage terms: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html

Map location names in the Frontier Sector are original to Akriva.

Vehicle designs are original unbranded procedural models.

## Ground surface

Dirt texture by Poly Haven (Charlotte Baglioni), CC0.

- Asset: https://polyhaven.com/a/dirt
- Source map: https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dirt/dirt_diff_1k.jpg

## Original components

Gameplay logic, map layout, procedural environment geometry, equipment systems and interface were made for this prototype. The imported soldier mesh and its textures/animations are third-party assets credited above.

## India country outline

Source: Survey of India, Government of India. Generalized International Boundary Vector data (`Outline_of_India.zip`), downloaded 7 November 2026 from https://surveyofindia.gov.in/documents/Outline_of_India.zip via https://surveyofindia.gov.in/pages/outline-maps-of-india . The source Lambert Conformal Conic coordinates are compressed into game units and simplified. Mainland and 1,150 additional outline rings are retained. Gameplay roads, district blocks and transit pads are fictional, and city hub coordinates are approximate. No state-boundary geometry is supplied.

Survey of India’s vector-download notice permits individual/internal/educational/research/website use and excludes commercial usage: https://www.surveyofindia.gov.in/documents/ibd-vectorformat.pdf . This map build is a noncommercial prototype; no open-source license is granted over the SoI data by this export.

Triangulation used Mapbox Earcut as an authoring tool; Earcut is not loaded by the game runtime.

## Photographic world surface atlas

Concrete Wall 006, Asphalt 02 and Red Brick albedo and OpenGL normal maps by Poly Haven, CC0. Repacked into two 1024px atlases for this game. These are used for rough plaster, road aggregate and brick; car paint/glass remain original procedural materials.

- https://polyhaven.com/a/concrete_wall_006
- https://polyhaven.com/a/asphalt_02
- https://polyhaven.com/a/red_brick
- License: https://polyhaven.com/license

World materials and game maps are separate from the character asset credited above.
