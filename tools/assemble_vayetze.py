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
.ws{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.w{border-radius:12px;padding:12px 14px;display:grid;gap:4px}
.w.s{background:var(--teal-soft)}
.w.c{background:var(--gold-soft)}
.w .k{font-weight:800;font-size:.85rem;color:var(--teal)}
.w.c .k{color:var(--orange)}
.w b{font-family:var(--display);font-size:1.08rem}
.w p{margin:0;font-size:.95rem;color:var(--muted)}
.body .cal{flex-wrap:wrap;overflow:visible}
.body .cal .day{flex:1 1 130px}
.wall{margin-top:8px;border-top:1px dashed var(--line);padding-top:6px}
.wl{margin:0;font-weight:700;font-size:.9rem;color:var(--teal)}
.wb{margin:4px 0;font-size:.95rem}
.kit{display:grid;gap:8px;border-top:1px dashed var(--line);padding-top:10px;margin-top:4px}
.kitrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.kt{font-weight:700;min-width:9em}
.glinks{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:.9rem}
.glinks a{color:var(--brand);font-weight:600}
.kn{font-size:.85rem;margin:0}
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
