"""Builds a letter page: wraps the source HTML with a <head> (link-preview tags,
so WhatsApp shows the cover) and adds the silent tracking script.

  python3 tools/build.py <src.html> <slug> "<week>" "<title line>"
  e.g. python3 tools/build.py vayetze/source.html vayetze 'ויצא תשפ"ז' 'איגרת למנהל - ערש"ק פרשת ויצא'
"""
import html
import json
import os
import re
import sys

SRC, SLUG, WEEK, TITLE = sys.argv[1:5]
SITE = "https://igeret-behrava.vercel.app"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

s = open(SRC, encoding="utf8").read()
assert "/_blob/" not in s, "unmapped asset left in the page"
t = html.escape(TITLE, quote=True)

head = f"""<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>בהרחבה · {t}</title>
<meta name="description" content="{t} | האגף לחינוך יסודי - בנים">
<meta property="og:type" content="article">
<meta property="og:title" content="בהרחבה | {t}">
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

tracking = open(os.path.join(ROOT, "tools", "track.js"), encoding="utf8").read()
tracking = tracking.replace('"__WEEK__"', json.dumps(WEEK, ensure_ascii=False))
out = head + s.strip() + "\n<script>\n" + tracking + "\n</script>\n</body>\n</html>\n"
os.makedirs(os.path.join(ROOT, SLUG), exist_ok=True)
dest = os.path.join(ROOT, SLUG, "index.html")
open(dest, "w", encoding="utf8").write(out)
print("wrote", dest, len(out))
