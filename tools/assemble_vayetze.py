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
.gated{display:none!important}
.next{display:block;margin:8px auto 0;font:inherit;font-weight:800;font-size:1.05rem;border:none;border-radius:14px;padding:12px 22px;background:linear-gradient(90deg,#ff8f4f,#f07a32);color:#2a1d63;cursor:pointer;box-shadow:0 6px 18px rgba(240,122,50,.3)}
.next small{display:block;font-weight:600;font-size:.88rem;margin-top:2px}
.bridge .bt{display:none}
.bridge .back{display:none;margin:0 auto 6px;font:inherit;font-size:.82rem;border:none;background:none;color:var(--muted);cursor:pointer;text-decoration:underline}
.bridge.head .next{display:none}
.bridge.head .bt{display:block;font-family:var(--display);font-size:1.05rem}
.bridge.head .back{display:block}
.bridge.free .next,.bridge.free .back{display:none}
.bridge.free .bt{display:block}
.showall{display:block;text-align:center;color:#d9d1f2;font-size:.85rem;margin-top:6px}
@keyframes enterIn{from{opacity:0;transform:translateY(26px) scale(.98)}to{opacity:1;transform:none}}
@keyframes riseIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.enter{animation:enterIn .6s cubic-bezier(.2,.8,.2,1) both}
.rise{animation:riseIn .55s ease both}
.bridge.head.enter .bt{animation:riseIn .5s ease both}
@media (prefers-reduced-motion: reduce){.enter,.rise{animation:none}}
.lbtn{position:fixed;left:12px;bottom:14px;z-index:60;display:flex;align-items:center;gap:6px;font:inherit;font-weight:800;border:none;border-radius:999px;padding:8px 14px 8px 12px;background:#2a1d63;color:#fff;box-shadow:0 6px 18px rgba(42,29,99,.35);cursor:pointer}
.lbtn .lic{font-size:1.2rem}
.lbtn.top{background:linear-gradient(90deg,#ff8f4f,#f07a32);color:#2a1d63}
.lpanel{position:fixed;inset:0;z-index:70;background:rgba(18,15,34,.55);display:flex;align-items:center;justify-content:center;padding:14px;opacity:0;transition:opacity .25s}
.lpanel.show{opacity:1}
.lcard{position:relative;width:min(360px,100%);max-height:92vh;background:linear-gradient(180deg,#1d1747 0%,#3d2f7a 55%,#594e93 100%);border-radius:22px;padding:16px 16px 12px;color:#fff;text-align:center;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.lclose{position:absolute;top:8px;left:10px;background:none;border:none;color:#d9d1f2;font-size:1.1rem;cursor:pointer}
.lhead{font-weight:700;font-size:.95rem;color:#d9d1f2;margin:4px 0 6px}
.sky{position:relative;font-family:var(--display);font-weight:900;color:#ffe08a;font-size:1.05rem;padding:8px 0 6px;text-shadow:0 0 14px rgba(255,224,138,.8)}
.star{position:absolute;color:#ffe08a;animation:tw 2.4s ease-in-out infinite}
.star.s1{right:22%;top:2px;font-size:.8rem}.star.s2{left:20%;top:10px;font-size:1rem;animation-delay:.8s}.star.s3{right:40%;top:22px;font-size:.6rem;animation-delay:1.5s}
@keyframes tw{0%,100%{opacity:.3}50%{opacity:1}}
.lbox{position:relative;margin:0 auto;width:78%;display:flex;flex-direction:column;gap:9px;padding:6px 0}
.rail{position:absolute;top:-6px;bottom:-6px;width:8px;border-radius:4px;background:linear-gradient(180deg,#e9c27b,#b9861f)}
.rail.r1{right:0}.rail.r2{left:0}
.rung{position:relative;z-index:1;display:flex;align-items:center;gap:8px;margin:0 4px;font:inherit;color:#2a1d63;background:linear-gradient(180deg,#f3d9a4,#d9ad5d);border:none;border-radius:6px;padding:6px 10px;cursor:pointer;text-align:right;box-shadow:0 2px 0 #9a6f1c;transition:transform .2s,background .3s}
.rung:hover{transform:translateY(-1px)}
.rung .rn{font-weight:900;width:1.4em;text-align:center}
.rung .rl{font-weight:700;font-size:.92rem}
.rung.seen{background:linear-gradient(180deg,#ffb27c,#f07a32)}
.rung.cur{background:linear-gradient(180deg,#fff,#ffe08a);box-shadow:0 0 0 3px #ffe08a,0 0 18px rgba(255,224,138,.9)}
.orb{position:absolute;left:-30px;z-index:2;width:24px;height:24px;border-radius:50%;background:radial-gradient(circle,#fff 0,#ffe08a 45%,rgba(255,224,138,0) 72%);box-shadow:0 0 18px 6px rgba(255,224,138,.7);pointer-events:none}
.ground{display:block;width:100%;margin-top:12px;padding:8px 0 4px;border:none;border-top:3px solid #4eabbc;background:linear-gradient(180deg,rgba(78,171,188,.25),rgba(78,171,188,0));font:inherit;font-weight:800;color:#a6e3ec;font-size:.95rem;cursor:pointer}
.ground.cur{color:#fff;text-shadow:0 0 10px #ffe08a}
.lmsg{margin:8px 0 2px;font-weight:700;color:#ffb27c;min-height:1.3em}
@media (prefers-reduced-motion: reduce){.star{animation:none}}
.rope{position:fixed;left:2px;top:50%;transform:translateY(-50%);z-index:60;width:40px;height:min(64vh,470px);opacity:.28;transition:opacity .45s,filter .45s;filter:saturate(.6)}
.rope.ready,.rope.lit,.rope:hover,.rope:focus-within{opacity:1;filter:none}
.rope svg{width:100%;height:100%;overflow:visible}
.rope .rp{fill:none;stroke:#8a6420;stroke-width:3.2;stroke-linecap:round}
.rope .rp2{fill:none;stroke:#e6c27a;stroke-width:1.4;stroke-dasharray:3 4;stroke-linecap:round}
.rope .wood{fill:#c99a4a;stroke:#7a5518;stroke-width:1}
.rope .knot{fill:#8a6420}
.rope .rr{cursor:pointer}
.rope g:focus{outline:none}
.rope g:focus-visible .wood{stroke:#f07a32;stroke-width:2}
.rope .rr.seen .wood{fill:#f0a465}
.rope .rr.cur .wood{fill:#ffe08a;stroke:#f07a32}
.rope .rgr{cursor:pointer;stroke:#4eabbc;stroke-width:2.2;stroke-linecap:round}
.rope .rgr.cur{stroke:#2f8fa1}
.rope .rsky path{fill:#d9c48a}
.rope .rsky.cur path{fill:#ffcf4a}
.rope .rorb circle{fill:#ffe08a}
.rope .rorb .core{fill:#fff}
.rpill{position:fixed;left:46px;z-index:61;background:#2a1d63;color:#fff;font-weight:700;font-size:.85rem;padding:6px 12px;border-radius:12px;opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .3s;pointer-events:none;max-width:62vw;box-shadow:0 6px 16px rgba(42,29,99,.3)}
.rpill.show{opacity:1;transform:none}
.bgl{position:fixed;inset:0;z-index:0;pointer-events:none;display:flex;justify-content:center}
.bgl svg{height:100vh;width:min(46vw,300px);overflow:visible}
.wrap{position:relative;z-index:1}
.bl-lad{opacity:.11;animation:breathe 7s ease-in-out infinite;transition:opacity .6s}
.bgl.dark .bl-lad{opacity:.5;animation:none}
@keyframes breathe{0%,100%{opacity:.06}50%{opacity:.12}}
.bl-rail{stroke:#3d2f7a;stroke-width:5;stroke-linecap:round;fill:none}
.bl-rung{stroke:#3d2f7a;stroke-width:4.5;stroke-linecap:round}
.bl-rung.seen{stroke:#f07a32}
.bl-rung.on{stroke:#f07a32;stroke-width:6}
.bl-here ellipse{fill:#ffb27c;opacity:.35;transition:opacity .6s}
.bgl.dark .bl-here ellipse{opacity:.8}
.bl-sky{fill:#ffe08a;opacity:.25}
.bl-ground{stroke:#4eabbc;stroke-width:4;fill:none;opacity:.25}
.bl-angel{opacity:.4;animation-timing-function:linear;animation-iteration-count:infinite}
.bl-angel .b{fill:#ffd36e}
.bl-angel .w{fill:#fff3cf}
.bl-angel.up{animation-name:angelUp}
.bl-angel.down{animation-name:angelDown}
@keyframes angelUp{0%{transform:translateY(980px);opacity:0}10%{opacity:.45}90%{opacity:.45}100%{transform:translateY(60px);opacity:0}}
@keyframes angelDown{0%{transform:translateY(60px);opacity:0}10%{opacity:.4}90%{opacity:.4}100%{transform:translateY(980px);opacity:0}}
.leaving{transition:opacity .6s ease,filter .6s ease,transform .6s ease;opacity:0!important;filter:blur(2px);transform:translateY(-10px)}
@media (prefers-reduced-motion: reduce){.bl-lad,.bl-angel{animation:none}.bl-angel{display:none}}
/* Frosted panel: text sits on a calm surface, the ladder shows through as a soft shadow */
:root{--glass:rgba(246,245,251,.86);--glass-thin:rgba(246,245,251,.55)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--glass:rgba(18,15,34,.84);--glass-thin:rgba(18,15,34,.5)}}
:root[data-theme="dark"]{--glass:rgba(18,15,34,.84);--glass-thin:rgba(18,15,34,.5)}
.wrap{background:var(--glass);-webkit-backdrop-filter:blur(7px) saturate(1.1);backdrop-filter:blur(7px) saturate(1.1);border-radius:26px;padding-inline:clamp(10px,3vw,22px);margin-top:10px!important;margin-bottom:24px!important;box-shadow:0 10px 40px rgba(42,29,99,.10),inset 0 0 0 1px rgba(255,255,255,.35);transition:background .6s}
.bgl.dark ~ .wrap{background:var(--glass-thin)}
@supports not ((backdrop-filter:blur(2px)) or (-webkit-backdrop-filter:blur(2px))){.wrap{background:var(--bg)}}
.mini-fold{margin-top:6px;border:1px dashed var(--line);border-radius:12px;padding:8px 12px;display:grid;gap:8px}
.mini-fold summary{cursor:pointer;font-weight:700;color:var(--brand);list-style:none}
.mini-fold summary::-webkit-details-marker{display:none}
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
