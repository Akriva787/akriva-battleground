# AKRIVA asset notices

## Textured soldier

The Vanguard soldier mesh, diffuse/normal textures, and Idle/Walk/Run animations are adapted from Soldier.glb in the official three.js examples, whose example credits Mixamo.

- Source: https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/Soldier.glb
- Example and attribution: https://threejs.org/examples/webgl_animation_skinning_blending.html
- Mixamo usage information: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html

The game embeds a transformed animation-frame representation and original texture maps for in-game rendering. The source GLB is not redistributed as a separate output. No BGMI models, textures, characters, or maps are included. This character is a generic armored operator, not a replica of a BGMI character.

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

No BGMI graphics, maps or characters are included.
