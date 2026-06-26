import os
from pillow_heif import open_heif
from PIL import Image

src_dir = "src"
dst_dir = "src/assets/images"

for fname in os.listdir(src_dir):
    if fname.lower().endswith(".heic"):
        src_path = os.path.join(src_dir, fname)
        dst_name = os.path.splitext(fname)[0] + ".jpeg"
        dst_path = os.path.join(dst_dir, dst_name)

        print(f"Converting {src_path} -> {dst_path}")

        heif = open_heif(src_path)
        img = heif.to_pillow()
        img.save(dst_path, format="JPEG", quality=90)

        print(f"Saved: {dst_path}")

print("Done!")