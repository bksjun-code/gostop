import os
try:
    from PIL import Image
except ImportError:
    import sys
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image

src_dir = r"c:\제미나이\GOSTOP\image"
dest_dir = r"c:\제미나이\GOSTOP\real_cards"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

# 12 months, 4 types each according to script.js
specs = [
    (1, ["gwang", "pi_1", "pi_2", "tti"]),
    (2, ["pi_1", "pi_2", "tti", "yul"]),
    (3, ["gwang", "pi_1", "pi_2", "tti"]),
    (4, ["pi_1", "pi_2", "tti", "yul"]),
    (5, ["pi_1", "pi_2", "tti", "yul"]),
    (6, ["pi_1", "pi_2", "tti", "yul"]),
    (7, ["pi_1", "pi_2", "tti", "yul"]),
    (8, ["gwang", "pi_1", "pi_2", "yul"]),
    (9, ["pi_1", "pi_2", "tti", "yul"]),
    (10, ["pi_1", "pi_2", "tti", "yul"]),
    (11, ["gwang", "pi_1", "pi_2", "pi_3"]), # 11월 피 3장
    (12, ["gwang", "kasu", "tti", "yul"]),   # 12월 쌍피(kasu)
]

for month, types in specs:
    img_path = os.path.join(src_dir, f"{month}월.jpg")
    if not os.path.exists(img_path):
        print(f"Skipping {month}월.jpg: file not found.")
        continue

    try:
        img = Image.open(img_path)
        w, h = img.size
        # Crop to 4 pieces: 2x2 grid
        # 0: top-left, 1: top-right, 2: bottom-left, 3: bottom-right
        w_half = w // 2
        h_half = h // 2
        
        boxes = [
            (0, 0, w_half, h_half),
            (w_half, 0, w, h_half),
            (0, h_half, w_half, h),
            (w_half, h_half, w, h)
        ]
        
        for i, box in enumerate(boxes):
            piece = img.crop(box)
            piece_name = f"{month:02d}_{types[i]}.jpg"
            piece.save(os.path.join(dest_dir, piece_name))
            print(f"Saved {piece_name}")
            
    except Exception as e:
        print(f"Error processing {month}월.jpg: {e}")

print("Splitting complete.")
