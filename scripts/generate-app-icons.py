#!/usr/bin/env python3
"""Generate favicon and app icons from Manammoo's profile photo."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "assets" / "images" / "IMG-20241229-WA0067.webp"
PUBLIC = ROOT / "public"


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Source image not found: {SOURCE}")

    img = Image.open(SOURCE).convert("RGBA")
    w, h = img.size
    side = min(w, h)
    left, top = (w - side) // 2, (h - side) // 2
    square = img.crop((left, top, left + side, top + side))

    PUBLIC.mkdir(exist_ok=True)
    square.resize((48, 48), Image.Resampling.LANCZOS).save(
        PUBLIC / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)]
    )
    square.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png")
    square.resize((192, 192), Image.Resampling.LANCZOS).save(PUBLIC / "icon-192.png")
    print("App icons updated from IMG-20241229-WA0067.webp")


if __name__ == "__main__":
    main()
