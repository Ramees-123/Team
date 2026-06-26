#!/usr/bin/env python3
"""Convert gallery JPEG/JPG images to WebP for faster deploy loading."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIRS = [
    ROOT / "src" / "assets" / "images",
    ROOT / "public" / "assets" / "images",
]
GALLERY_FILE = ROOT / "src" / "app" / "components" / "photo-gallery" / "photo-gallery.component.ts"
SOURCE_EXTS = {".jpg", ".jpeg", ".JPG", ".JPEG"}


def convert_file(source: Path, quality: int, keep_originals: bool) -> tuple[int, int] | None:
    target = source.with_suffix(".webp")
    if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
        return None

    before = source.stat().st_size
    with Image.open(source) as img:
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
        img.save(target, "WEBP", quality=quality, method=6)

    after = target.stat().st_size
    if not keep_originals:
        source.unlink()
    return before, after


def update_gallery_references() -> int:
    if not GALLERY_FILE.exists():
        return 0

    text = GALLERY_FILE.read_text(encoding="utf-8")
    updated = text
    updated = re.sub(r"\.jpeg'", ".webp'", updated)
    updated = re.sub(r"\.jpg'", ".webp'", updated)

    if updated != text:
        GALLERY_FILE.write_text(updated, encoding="utf-8")
        return len(re.findall(r"\.webp'", updated))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert gallery images to WebP.")
    parser.add_argument("--quality", type=int, default=82, help="WebP quality (1-100). Default: 82")
    parser.add_argument(
        "--keep-originals",
        action="store_true",
        help="Keep JPEG/JPG files after conversion (larger deploy size).",
    )
    args = parser.parse_args()

    converted = 0
    skipped = 0
    total_before = 0
    total_after = 0

    for image_dir in IMAGE_DIRS:
        if not image_dir.exists():
            print(f"Skip missing folder: {image_dir}")
            continue

        sources = sorted(
            p for p in image_dir.iterdir() if p.is_file() and p.suffix in SOURCE_EXTS
        )
        print(f"\n{image_dir} — {len(sources)} source image(s)")

        for source in sources:
            result = convert_file(source, args.quality, args.keep_originals)
            if result is None:
                skipped += 1
                continue
            before, after = result
            converted += 1
            total_before += before
            total_after += after
            saved = 100 - (after / before * 100) if before else 0
            print(f"  OK {source.name} -> {source.stem}.webp ({saved:.0f}% smaller)")

    refs = update_gallery_references()
    if refs:
        print(f"\nUpdated gallery references ({refs} .webp paths).")

    if converted:
        saved_total = total_before - total_after
        pct = saved_total / total_before * 100 if total_before else 0
        print(
            f"\nConverted {converted} file(s), skipped {skipped} up-to-date."
            f"\nSize: {total_before / 1024 / 1024:.2f} MB -> {total_after / 1024 / 1024:.2f} MB"
            f" ({pct:.0f}% smaller)"
        )
    else:
        print(f"\nNo new conversions ({skipped} already up-to-date).")

    if not args.keep_originals:
        print("Original JPEG/JPG files removed from assets (WebP only for deploy).")

    return 0


if __name__ == "__main__":
    sys.exit(main())
