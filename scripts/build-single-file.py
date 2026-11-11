from pathlib import Path
import base64

root = Path(__file__).resolve().parent.parent
page = (root / "index.html").read_text(encoding="utf-8")
page = page.replace('<link rel="stylesheet" href="style.css">', '<style>' + (root / "style.css").read_text(encoding="utf-8") + '</style>')
for name in ("weapons.js", "online104.js", "india-data.js", "india.js", "platform.js", "world-materials.js", "soldier-data.js", "characters-index.js", "characters-data.js", "classic-data.js", "game.js"):
    page = page.replace('<script src="' + name + '"></script>', '<script>' + (root / name).read_text(encoding="utf-8") + '</script>')
music = base64.b64encode((root / "tactical-theme.wav").read_bytes()).decode("ascii")
page = page.replace('src="tactical-theme.wav"', 'src="data:audio/wav;base64,' + music + '"')
output = root / "dist"
output.mkdir(exist_ok=True)
(output / "index.html").write_text(page, encoding="utf-8")
print("Created " + str(output / "index.html"))
