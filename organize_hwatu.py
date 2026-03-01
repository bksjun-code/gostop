import os
import shutil

src_dir = r"c:\제미나이\GOSTOP\hwatu_images\hanafuda_recolor\Hanafuda-Louie-Recolor-main\svg"
dest_dir = r"c:\제미나이\GOSTOP\hwatu_cards"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

# Mapping from English month and type to Hwatu standards
# Hwatu Months:
# 1: January (Pine)
# 2: February (Plum)
# 3: March (Cherry)
# 4: April (Wisteria)
# 5: May (Iris)
# 6: June (Peony)
# 7: July (Bush Clover)
# 8: August (Susuki/Moon)
# 9: September (Chrysanthemum)
# 10: October (Maple)
# 11: November (Paulownia/Dong) -> Hanafuda November is Willow (Rain) but in Hwatu, November is Paulownia (Dong) and Dec is Rain.
# Wait, let's map exactly to standard Hwatu index.
# In Hwatu (Korean):
# 1: 송학 (January, Pine)
# 2: 매조 (February, Plum)
# 3: 벚꽃 (March, Cherry)
# 4: 흑싸리 (April, Wisteria)
# 5: 난초 (May, Iris)
# 6: 모란 (June, Peony)
# 7: 홍싸리 (July, Bush Clover)
# 8: 공산 (August, Moon)
# 9: 국진 (September, Chrysanthemum)
# 10: 단풍 (October, Maple)
# 11: 오동 (November in Hwatu, but December in Japanese Hanafuda)
# 12: 비 (December in Hwatu, but November in Japanese Hanafuda)

# The louie-recolor hanafuda set uses literal month names.
# So:
# January -> 1
# February -> 2
# March -> 3
# April -> 4
# May -> 5
# June -> 6
# July -> 7
# August -> 8
# September -> 9
# October -> 10
# November (Willow) -> 12 (in Hwatu, this is December 'Bi')
# December (Paulownia) -> 11 (in Hwatu, this is November 'Odong')

month_map = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 12, # Willow -> Bi
    "December": 11  # Paulownia -> Odong
}

# Sub-type mapper
type_map = {
    "Hikari": "gwang", # 광
    "Tane": "yul",     # 열끝 (동물, 사물)
    "Tanzaku": "tti",  # 띠 (단)
    "Kasu_1": "pi_1",  # 피 1
    "Kasu_2": "pi_2",  # 피 2
    "Kasu_3": "pi_3"   # 피 3 (비 피 등)
}

# Note: Hwatu has 'SsangPi' (Double Pi).
# Specifically:
# 9월 국진의 열끝(Tane)은 쌍피로도 쓰임. (9_yul)
# 11월 오동(Hanafuda Dec)은 피가 3장 (Kasu_1, Kasu_2, Kasu_3), 단 Kasu_3을 쌍피(색깔 다른 오동)로 볼 수 있음.
# 12월 비(Hanafuda Nov)는 광, 열끝(제비), 띠, 쌍피(비쌍피). Hanafuda에선 Tanzaku(비띠), Tane(제비), Kasu_1(쌍피) 로 맵핑됨.

for filename in os.listdir(src_dir):
    if filename.endswith(".svg"):
        # e.g., Hanafuda_April_Kasu_1.svg
        parts = filename.replace(".svg", "").split("_")
        if len(parts) >= 3:
            month_str = parts[1]
            type_str = parts[2]
            if len(parts) == 4:
                type_str += "_" + parts[3]
            
            month_idx = month_map.get(month_str)
            mapped_type = type_map.get(type_str, type_str.lower())
            
            if month_idx:
                new_name = f"{month_idx:02d}_{mapped_type}.svg"
                shutil.copy2(os.path.join(src_dir, filename), os.path.join(dest_dir, new_name))
                print(f"Copied {filename} -> {new_name}")

print("Done organizing 48 Hwatu cards.")
