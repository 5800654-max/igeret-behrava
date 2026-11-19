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
.rtime{margin:4px 0 0;background:rgba(255,255,255,.14);border-radius:999px;padding:6px 14px;font-size:.92rem;color:#fff;display:inline-block}
.bridge{text-align:center;color:var(--brand);font-weight:700;margin:6px auto 0;max-width:34em;line-height:1.5}
.bridge .st{display:block;font-size:.78rem;color:var(--orange);font-weight:800;margin-bottom:2px}
.climb{position:fixed;top:0;right:0;left:0;height:4px;z-index:50}
.climb span{display:block;height:100%;width:0;background:linear-gradient(90deg,#ff8f4f,#4eabbc)}
.thanks{background:linear-gradient(150deg,#594e93,#2a1d63);color:#fff;border-radius:14px;padding:14px 16px;margin-bottom:10px;text-align:center}
.thanks p{margin:4px 0}
.tk-h{font-family:var(--display);font-weight:900;font-size:1.25rem;color:#ff8f4f}
.ladder{position:fixed;left:10px;bottom:16px;z-index:60;width:30px;padding:6px 5px;display:flex;flex-direction:column;gap:5px;border-left:3px solid #b8aef0;border-right:3px solid #b8aef0;border-radius:4px;background:rgba(255,255,255,.75);backdrop-filter:blur(4px)}
.ladder i{display:block;height:5px;border-radius:3px;background:#d9d5ec;transition:background .4s}
.ladder i.on{background:linear-gradient(90deg,#ff8f4f,#f07a32)}
.cheer{position:fixed;left:48px;bottom:22px;z-index:60;background:#2a1d63;color:#fff;font-weight:700;padding:8px 14px;border-radius:12px;font-size:.92rem;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s;pointer-events:none;max-width:70vw}
.cheer.show{opacity:1;transform:none}
.bridge{transition:color .4s}
.bridge.on{color:var(--orange)}
.bridge.on .st{color:var(--teal)}
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
