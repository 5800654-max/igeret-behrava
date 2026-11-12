"""Builds toldot/index.html from the Claude artifact version of the letter.

Swaps the artifact's asset links for local files, adds a real <head> with
link-preview tags (so WhatsApp shows the cover), and adds silent tracking.
"""
import json
import re
import sys

SRC = sys.argv[1]
OUT = sys.argv[2]
SITE = "https://igeret-behrava.vercel.app"
SLUG = "toldot"

s = open(SRC, encoding="utf8").read()

assets = {
    "092a4674b10bba3566b21b1125b2ba2b": "media/shavua-hachasidut.jpg",
    "3f8cc44903b95a0b2100abb09ee0c2a9": "media/tadrich-yud-shvat.pdf",
    "a531bd20534d23830cc5a2de728463a0": "media/bocharim-poster.jpg",
    "afa4a45b02edf86340ede830a767f1d0": "media/kitat-hayahalomim.jpg",
    "bc12e8cd5ca72cb3451b53358bf0587c": "media/keter-poster.jpg",
    "bfbadbb9b57ad38b704de3b616cdda1c": "media/bocharim.mp4",
    "c3cbfa9fcfac36840c0f14285c0a57e9": "media/toda-tiferet-menachem.jpg",
    "d47667f9b1e9aee505548c969d51b7c0": "media/bocharim-video-poster.jpg",
    "e22b32202f2189eb7251117f739cde6b": "media/keter-torah.mp4",
}
for blob, path in assets.items():
    s = s.replace("/_blob/" + blob, path)
assert "/_blob/" not in s, "unmapped asset left in the page"

# The owner-only dashboard depends on Claude's runtime; on the website the
# reports come from the tracking sheet instead.
s = re.sub(r'\s*<!-- Owner-only reading dashboard -->\s*<section class="panel owner".*?</section>', "", s, count=1, flags=re.S)

title_m = re.search(r"<title>(.*?)</title>", s)
title = title_m.group(1) if title_m else "בהרחבה"
s = s.replace(title_m.group(0), "", 1) if title_m else s

head = f"""<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="איגרת למנהל - ערש&quot;ק פרשת תולדות | האגף לחינוך יסודי - בנים">
<meta property="og:type" content="article">
<meta property="og:title" content="בהרחבה | איגרת למנהל - ערש&quot;ק פרשת תולדות">
<meta property="og:description" content="האגף לחינוך יסודי - בנים · רשת אהלי יוסף יצחק">
<meta property="og:image" content="{SITE}/{SLUG}/cover.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="{SITE}/{SLUG}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.png">
<style>:root{{padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
</head>
<body>
"""

tracking = open(__file__.replace("build_toldot.py", "track.js"), encoding="utf8").read()
s = head + s.strip() + "\n<script>\n" + tracking.replace('"__WEEK__"', json.dumps("תולדות תשפ\"ז", ensure_ascii=False)) + "\n</script>\n</body>\n</html>\n"
open(OUT, "w", encoding="utf8").write(s)
print("wrote", OUT, len(s))
