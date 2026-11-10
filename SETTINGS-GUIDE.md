# Shared mobile and PC settings

Open **Settings** in the top-right corner. Preferences are stored in this browser on this device. Offline matches pause automatically and resume on Done or close; a previously manual pause stays paused. Online matches keep running.

- **Controls:** keyboard/mouse or touch layout; standard or left-fire touch preset; 85–115% action-button size; 45–100% touch-button opacity; aim sensitivity; normal/inverted vertical aim; reset control preferences.
- **Graphics / Audio:** Low, Balanced or High; sound, music, music volume and fullscreen. Higher graphics settings may reduce performance.
- **Loadout:** select/equip one of four guns at its existing in-game credit price; open the equipment menu; open operator/outfit and weapon-finish previews.

The shared Settings modal replaces the large persistent settings strip. Desktop uses keyboard/mouse shortcuts and only shows relevant nearby loot/vehicle/heal actions. Mobile retains thumb combat controls; unavailable quick actions disappear.

## Preview gallery

**Operators & outfits** opens the existing eight choices, including the separate Mira model. The gallery now also works during a paused offline match, using the same models and material textures as gameplay. It preserves player position, inventory and credits. Outfit selection retains the existing online synchronization.

**Weapon finishes / 3D preview** shows four rotating gun meshes with Classic steel, Desert brass, Arctic silver and Crimson carbon finishes. Previewing a weapon does not buy or equip it. Select an actual gun in Settings → Loadout to equip it; normal weapon prices and online weapon rules apply.

Finishes are local cosmetic preferences and do not affect damage, magazine size or firing rate. Other online clients currently see the default weapon finish. The gallery is a separate scene; an online player remains vulnerable while browsing it.

## Verification

Run `node verify-settings.cjs` from this folder. Checks cover independent multi-touch lifecycles, mouse fallback, settings pause/resume and manual-pause preservation, tabs, control setting bounds/reset, Mira selection, finite model and weapon-preview rendering, cosmetic persistence, unchanged position/credits during preview, and credit-based weapon changes.

Physical-phone frame rates and hardware multi-touch remain unverified. BGMI/PUBG references informed the organization of controls and graphics options; this does not reproduce their complete settings or assets.
