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
      }catch(e){}
    }
    return out;
  }
  function send(what, details){
    if(!TRACK_URL) return false;
    var w=who();
    var q="a=ev&w="+encodeURIComponent(WEEK)+"&what="+encodeURIComponent(what)+
          "&d="+encodeURIComponent(details||"")+"&n="+encodeURIComponent(w.n)+
          "&i="+encodeURIComponent(w.i)+"&id="+encodeURIComponent(w.id);
    var url=TRACK_URL+"?"+q;
    try{ if(navigator.sendBeacon && navigator.sendBeacon(url)) return true; }catch(e){}
    try{ fetch(url,{method:"POST",mode:"no-cors",keepalive:true}); return true; }catch(e){}
    try{ (new Image()).src=url; return true; }catch(e){}
    return false;
  }
  window.__track = send;
  if(!TRACK_URL) return;

  // Opened the letter
  send("פתח את האיגרת","");

  // Which parts were read: one summary row when the reader leaves
  var seen=[], reported=false;
  try{
    var io=new IntersectionObserver(function(es){es.forEach(function(en){
      var k=en.target.getAttribute("data-track");
      if(en.isIntersecting && k && seen.indexOf(k)<0) seen.push(k);
    })},{threshold:.45});
    document.querySelectorAll("section[data-track]").forEach(function(s){io.observe(s)});
  }catch(e){}
  document.querySelectorAll("details[data-track]").forEach(function(d){
    d.addEventListener("toggle",function(){var k=d.getAttribute("data-track");if(d.open&&seen.indexOf(k)<0)seen.push(k)});
  });
  function report(){ if(reported||!seen.length) return; reported=true; send("קרא חלקים", seen.join(", ")); }
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
