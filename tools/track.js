/* Silent tracking: every open, click and answer goes to the Apps Script log.
   The reader sees nothing change except a small confirmation. */
(function(){
  var TRACK_URL = "https://script.google.com/macros/s/AKfycbw-GjxvO6u1KoxGlAFgXl-W30OwkEsooqXbS0qrD4GWhcCx_ZfBjNKqcIRBkP-ZPMf7/exec";   // Apps Script web-app address (…/exec). Empty = tracking off.
  var WEEK = "__WEEK__";

  function who(){
    var id=(location.hash||"").slice(1), out={n:"",i:"",id:""};
    if(/^g-[0-9a-f]+$/.test(id)){
      try{
        var b=new Uint8Array(id.slice(2).match(/../g).map(function(h){return parseInt(h,16)}));
        var t=new TextDecoder().decode(b).split("|");
        out={n:t[0]||"",i:t[1]||"",id:t[3]||""};
        if(out.n) window.__igMe=out;
        try{ if(out.n) localStorage.setItem("igeret-me", JSON.stringify(out)); }catch(e){}
      }catch(e){}
    }
    if(!out.n){ try{ var m=JSON.parse(localStorage.getItem("igeret-me")||"null"); if(m&&m.n) out=m; }catch(e){} }
    if(!out.n && window.__igMe) out=window.__igMe;
    return out;
  }
  // A random id per device, so one personal link opened on two devices shows up
  function device(){
    var d="";
    try{ d=localStorage.getItem("igeret-dv")||""; }catch(e){}
    if(!d){ d=window.__igDv||Math.random().toString(36).slice(2,8); window.__igDv=d; try{ localStorage.setItem("igeret-dv",d); }catch(e){} }
    return d;
  }
  function hex(str){ return Array.prototype.map.call(new TextEncoder().encode(str),function(b){return ("0"+b.toString(16)).slice(-2)}).join(""); }
  function unhex(h){ try{ return new TextDecoder().decode(new Uint8Array(h.match(/../g).map(function(x){return parseInt(x,16)}))); }catch(e){ return ""; } }
  var params=new URLSearchParams(location.search);
  var SRC=(params.get("src")||"").slice(0,40);                      // which group or broadcast link
  var FROM=/^[0-9a-f]+$/.test(params.get("from")||"") ? unhex(params.get("from")).split("|") : null;   // who passed the link on
  // The address in the browser now names the reader, without their identity.
  // If they copy it and send it on, the next reader must identify and is logged as "הגיע דרך" them.
  function markAddress(w){
    try{
      var q=new URLSearchParams(); if(SRC) q.set("src",SRC); q.set("from",hex(w.n+"|"+(w.i||"")));
      history.replaceState(null,"",location.pathname+"?"+q.toString());
    }catch(e){}
  }
  function openDetails(w, extra){
    var parts=[]; if(extra) parts.push(extra);
    if(FROM && FROM[0] && FROM[0]!==w.n) parts.push("הגיע דרך: הרב "+FROM[0]+(FROM[1]?" ("+FROM[1]+")":""));
    if(SRC) parts.push("קישור: "+SRC);
    return parts.join(" | ");
  }

  function send(what, details){
    if(!TRACK_URL) return false;
    var w=who();
    var q="a=ev&w="+encodeURIComponent(WEEK)+"&what="+encodeURIComponent(what)+
          "&d="+encodeURIComponent(details||"")+"&n="+encodeURIComponent(w.n)+
          "&i="+encodeURIComponent(w.i)+"&id="+encodeURIComponent(w.id)+"&dv="+encodeURIComponent(device());
    var url=TRACK_URL+"?"+q;
    try{ if(navigator.sendBeacon && navigator.sendBeacon(url)) return true; }catch(e){}
    try{ fetch(url,{method:"POST",mode:"no-cors",keepalive:true}); return true; }catch(e){}
    try{ (new Image()).src=url; return true; }catch(e){}
    return false;
  }
  window.__track = send;
  window.__who = who;
  window.__wallUrl = TRACK_URL ? TRACK_URL+"?a=wall&w="+encodeURIComponent(WEEK) : "";
  if(!TRACK_URL) return;

  // Opened from a shared link (WhatsApp group or broadcast): ask once who is reading
  function greetName(w){
    var g=document.getElementById("greet"); if(!g) return;
    g.textContent="לכבוד שליח הרבי בחינוך, הרב "+w.n+(w.i?" | "+w.i:""); g.hidden=false;
  }
  var me=who();
  if(me.n){ greetName(me); send("פתח את האיגרת",openDetails(me,"")); markAddress(me); }
  else {
    // Must identify before reading: a window over the letter, no way to skip
    var box=document.createElement("div");
    box.className="whoami";
    box.setAttribute("role","dialog"); box.setAttribute("aria-modal","true");
    box.setAttribute("style","position:fixed;inset:0;z-index:9999;background:rgba(42,29,99,.92);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Rubik,Arial,sans-serif");
    box.innerHTML='<div style="background:#fff;color:#1d1838;border-radius:18px;padding:22px 18px;max-width:420px;width:100%;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.35)">'+
      '<div style="color:#4eabbc;font-weight:700">האגף לחינוך יסודי - בנים</div>'+
      '<div style="font-size:40px;font-weight:900;color:#ff8f4f;line-height:1.2">בהרחבה</div>'+
      '<p style="margin:10px 0 14px;font-weight:700">נעים להכיר! לפני הקריאה, כתבו את שמכם ואת המוסד:</p>'+
      '<input id="me-n" autocomplete="name" placeholder="שם (למשל: לוי כהן)" style="display:block;width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:11px 12px;border-radius:10px;border:1px solid #cfcbe3;margin-bottom:8px">'+
      '<input id="me-i" autocomplete="organization" placeholder="מוסד" style="display:block;width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:11px 12px;border-radius:10px;border:1px solid #cfcbe3;margin-bottom:10px">'+
      '<p id="me-err" style="color:#c0392b;min-height:1.2em;margin:0 0 8px;font-size:14px"></p>'+
      '<button type="button" id="me-ok" style="width:100%;font:inherit;font-size:18px;font-weight:700;border:none;border-radius:12px;padding:12px;background:#ff8f4f;color:#2a1d63;cursor:pointer">לקריאת האיגרת</button></div>';
    document.body.appendChild(box);
    var oldOverflow=document.documentElement.style.overflow;
    document.documentElement.style.overflow="hidden";
    function done(){
      var n=box.querySelector("#me-n").value.trim().replace(/^הרב\s+/,""), i=box.querySelector("#me-i").value.trim();
      n=n.replace(/\s+/g," "); i=i.replace(/\s+/g," ");
      var err=box.querySelector("#me-err"), heb=/[\u05D0-\u05EA]/g;
      if(!n||!i){ err.textContent="צריך למלא גם שם וגם מוסד."; return; }
      if(!/^[\u05D0-\u05EA"'׳״.\- ]+$/.test(n)||n.split(" ").filter(function(x){return (x.match(heb)||[]).length>=2}).length<2){
        err.textContent="נא לכתוב שם פרטי ושם משפחה, באותיות עבריות."; return; }
      if(!/^[\u05D0-\u05EA0-9"'׳״.,()\- ]+$/.test(i)||(i.match(heb)||[]).length<3){
        err.textContent="נא לכתוב את שם המוסד באותיות עבריות."; return; }
      var w={n:n,i:i,id:""}; window.__igMe=w;
      try{ localStorage.setItem("igeret-me", JSON.stringify(w)); }catch(e){}
      box.remove(); document.documentElement.style.overflow=oldOverflow; greetName(w);
      send("פתח את האיגרת",openDetails(w,"הזדהה בכניסה")); markAddress(w);
    }
    // Left without filling in a name: one row, so these visits are still counted
    var left=false;
    function leftAnon(){ if(left||document.body.contains(box)===false) return; left=true; send("נכנס ולא הזדהה",openDetails({n:""},"")); }
    addEventListener("pagehide",leftAnon);
    document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="hidden") leftAnon(); });
    box.querySelector("#me-ok").addEventListener("click",done);
    box.addEventListener("keydown",function(e){ if(e.key==="Enter") done(); });
  }

  // Which parts were read: one summary row when the reader leaves
  var seen=[], reported=false;
  try{
    // A part counts as read when 45% of it is on screen, or when it fills 40% of the screen
    // (long parts never reach 45% on a phone)
    var th=[]; for(var t=0;t<=20;t++) th.push(t/20);
    var io=new IntersectionObserver(function(es){es.forEach(function(en){
      var k=en.target.getAttribute("data-track"), vh=window.innerHeight||800;
      var enough=en.intersectionRatio>=.45 || en.intersectionRect.height>=vh*.4;
      if(en.isIntersecting && enough && k && seen.indexOf(k)<0) seen.push(k);
    })},{threshold:th});
    document.querySelectorAll("section[data-track]").forEach(function(s){io.observe(s)});
  }catch(e){}
  document.querySelectorAll("details[data-track]").forEach(function(d){
    d.addEventListener("toggle",function(){var k=d.getAttribute("data-track");if(d.open&&seen.indexOf(k)<0)seen.push(k)});
  });
  function report(){ if(reported||!seen.length||!who().n) return; reported=true; send("קרא חלקים", seen.join(", ")); }
  document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="hidden") report(); });
  addEventListener("pagehide",report);

  // Reactions: a quiet tick, logged at once
  var LB={read:"קראתי",strong:"מחזק",idea:"יש לי רעיון",training:"אשמח להדרכה"};
  document.querySelectorAll("#react a, #react button").forEach(function(b){
    b.addEventListener("click",function(){
      var on=b.getAttribute("aria-pressed")==="true";
      send(on?LB[b.dataset.k]:"ביטל: "+LB[b.dataset.k],"");
    });
  });

  // Riddle and question: a single "שליחה" button instead of WhatsApp/email
  function replaceBar(prefix, label, build, ok){
    var bar=document.getElementById(prefix+"-wa"); if(!bar) return;
    bar=bar.parentNode;
    var btn=document.createElement("button");
    btn.type="button"; btn.textContent=label; btn.className="sendnow";
    bar.innerHTML=""; bar.appendChild(btn);
    btn.addEventListener("click",function(){
      var m=build(); var st=document.getElementById(prefix+"-status");
      if(!m){ return; }
      send(m.what,m.d); btn.textContent="נשלח ✓"; btn.disabled=true;
      if(st) st.textContent=ok;
    });
  }
  replaceBar("r","שליחת התשובה",function(){
    var who_=document.getElementById("r-who").value, sec=document.getElementById("r-secret").value.trim(), bl=document.getElementById("r-bless").value.trim();
    if(!who_||!sec||!bl){ document.getElementById("r-status").textContent="כדי להיכנס להגרלה צריך לענות על שלוש השאלות."; return null; }
    return {what:"תשובה לחידה", d:"מוסד: "+who_+" | הסוד: "+sec+" | ברכה: "+bl};
  },"התשובה נקלטה ונכנסה להגרלה. הפתרון יפורסם באיגרת הבאה.");
  replaceBar("ask","שלח שאלה",function(){
    var t=document.getElementById("ask-text").value.trim();
    if(!t){ document.getElementById("ask-status").textContent="כתבו את השאלה לפני השליחה."; return null; }
    return {what:"שאלה", d:t};
  },"השאלה נשלחה, ונחזור אליך באופן אישי. יישר כוח על האומץ לשאול!");

  // Checklist: every tick is logged
  document.querySelectorAll("#chk input[type=checkbox]").forEach(function(c){
    c.addEventListener("change",function(){
      var txt=(c.parentNode.querySelector("span")||{}).textContent||c.dataset.k;
      send(c.checked?"צ'ק-ליסט: סימן":"צ'ק-ליסט: ביטל", txt.slice(0,80));
    });
  });
  var cc=document.getElementById("chk-copy"), cw=document.getElementById("chk-wa");
  function handed(){ send("צ'ק-ליסט: העביר להמשך טיפול", (document.getElementById("chk-to")||{}).value||""); }
  if(cc) cc.addEventListener("click",handed);
  if(cw) cw.addEventListener("click",handed);

  // Copy buttons (messages to parents / teachers)
  document.querySelectorAll("[data-copy]").forEach(function(b){
    b.addEventListener("click",function(){ send("העתיק הודעה", b.getAttribute("data-copy")); });
  });

  // Videos and PDF
  document.querySelectorAll("video").forEach(function(v){
    var once=false; v.addEventListener("play",function(){ if(!once){once=true; send("צפה בסרטון",(v.getAttribute("aria-label")||"").slice(0,60));} });
  });
  document.querySelectorAll('a[href$=".pdf"]').forEach(function(a){
    a.addEventListener("click",function(){ send("פתח את התדריך המלא",""); });
  });
})();
