"""Assembles vayetze/source.html from the shared design (CSS + logo) and vayetze/body.html."""
import os, sys, urllib.parse
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
css = open(os.path.join(ROOT, "tools", "design.css"), encoding="utf8").read()
logo = open(os.path.join(ROOT, "tools", "logo.datauri"), encoding="utf8").read().strip()
body = open(os.path.join(ROOT, "vayetze", "body.html"), encoding="utf8").read()
extra = """
input{font:inherit;font-size:16px;color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px 12px;width:100%;box-sizing:border-box}
.sendnow,.cta{display:inline-block;font:inherit;font-weight:700;border:none;border-radius:12px;padding:11px 22px;background:var(--orange);color:#2a1d63;cursor:pointer;text-decoration:none}
.cta{font-size:1.15rem;padding:14px 30px}
.sendnow:disabled{opacity:.7;cursor:default}
.poll{margin-top:6px;gap:10px}
.okline{display:flex;gap:8px;align-items:center;font-size:.95rem}
.okline input{width:auto}
.more{margin:0}
.pending{background:#fff2b3;color:#5a4500;border:2px dashed #b9861f;border-radius:10px;padding:8px 12px;font-weight:700}
"""
import re
m = re.search(r'id="fwd-tomchei">(.*?)</div>', body, re.S)
body = body.replace("__TOMCHEI_WA__", urllib.parse.quote(m.group(1)))
body = body.replace("__LOGO__", logo)
out = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
       '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;800;900&display=swap">\n'
       "<style>" + css + extra + "</style>\n" + body)
open(os.path.join(ROOT, "vayetze", "source.html"), "w", encoding="utf8").write(out)
print("ok", len(out))
