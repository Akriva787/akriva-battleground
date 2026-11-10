# AKRIVA asset notices

## Tactical human character

Military tactical suit (LowPolyGameReady) by DanlyVostok (1799danly), CC BY 4.0. Original model and license were verified through Sketchfab's public model metadata.

- Creator/model: https://sketchfab.com/3d-models/military-tactical-suit-lowpolygameready-ef698ce36b1545a78ce592dd3db4c7ed
- License: https://creativecommons.org/licenses/by/4.0/
- Asset copy: https://github.com/cktang88/3d-fps/blob/main/public/assets/models/characters/soldier_tac.glb

Changes for Akriva: omitted optional headset with incompatible attachment offsets; repacked seven texture materials into atlases; retargeted animations; baked animation frames; resized to 1.84 metres; added a game-held rifle. This is a generic tactical human wearing a cap and face covering.

Idle/Walk/Run animation data adapted from Mixamo / three.js Soldier.glb:

- Source: https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/Soldier.glb
- Example attribution: https://threejs.org/examples/webgl_animation_skinning_blending.html
- Mixamo usage: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html

No BGMI models, textures or characters are included. Vehicle designs are original unbranded procedural models.

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
