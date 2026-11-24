
(function(){
  var $=function(id){return document.getElementById(id)};
  var T=function(what,d){ if(window.__track) window.__track(what,d||""); };
  ["אור מנחם צפת","ת\"ת טבריה","ת\"ת מגדל העמק","ת\"ת נוף הגליל","ת\"ת עפולה","צבאות מנחם חיפה והקריות","אהלי יוסף יצחק עתלית","בני מנחם חדרה","ת\"ת חריש","דברי מנחם נתניה","בית חינוך כפר סבא","בית חינוך רעננה","אור מנחם עמנואל","אהלי מנחם תל אביב","בני מנחם חולון","בני מנחם בני ברק","ת\"ת כפר חב\"ד","אור שמחה כפר חב\"ד","בית חינוך גני איילון","ת\"ת חב\"ד ליובאוויטש לוד","נער ישראל ירושלים","אהלי מנחם ביתר עילית","תפארת מנחם ביתר עילית","תפארת שמואל בית שמש","פאר מנחם אלעד","תורת מנחם תל ציון","ת\"ת רחובות","בית חינוך נס ציונה","בית חינוך אשדוד","ת\"ת קרית מלאכי","בני מנחם קרית מלאכי","אהלי מנחם קרית גת","אור מנחם אשקלון","בית ישראל נתיבות","אור מנחם אופקים","אור מנחם ערד"].forEach(function(i){ $("r-who").add(new Option(i,i)); $("y-inst").add(new Option(i,i)); $("rk-inst").add(new Option(i,i)); });
  function say(id,t){ var e=$(id); if(e) e.textContent=t; }
  function wire(btn,check,ok){
    $(btn).addEventListener("click",function(){
      var r=check(); if(!r) return;
      T(r.what,r.d); this.textContent="נשלח ✓"; this.disabled=true; if(ok) say(ok[0],ok[1]);
    });
  }
  // A personal thank-you to the coordinator, with the coordinator's name when we have it
  var RAKAZIM={"אור מנחם צפת": ["ישראל נח פרידמן"], "ת\"ת טבריה": ["דוד קירשינזפט"], "ת\"ת מגדל העמק": ["שמואל קרץ", "שניאור ביטון"], "ת\"ת נוף הגליל": ["מנדי שמולביץ"], "ת\"ת עפולה": ["יוסי ברוד"], "צבאות מנחם חיפה והקריות": ["אליהו קניג", "אביחי יצחק"], "אהלי יוסף יצחק עתלית": ["אלירן שמר"], "בני מנחם חדרה": ["יוסי שחר"], "ת\"ת חריש": ["מנשה שוורץ"], "דברי מנחם נתניה": ["נחום גולדשמיד"], "בית חינוך כפר סבא": ["יודלה בלוי"], "בית חינוך רעננה": ["יוסף ונקרט"], "אור מנחם עמנואל": ["דניאל קופרשמידט"], "אהלי מנחם תל אביב": ["סעדיה ליברוב"], "בני מנחם חולון": ["מנחם גלרנטר"], "בני מנחם בני ברק": ["שניאור כהנא"], "ת\"ת כפר חב\"ד": ["שרגא קפלן"], "אור שמחה כפר חב\"ד": ["אושי שאער"], "בית חינוך גני איילון": ["שלום בער כהן"], "ת\"ת חב\"ד ליובאוויטש לוד": ["מנחם קרישבסקי"], "נער ישראל ירושלים": ["עומרי כורך"], "אהלי מנחם ביתר עילית": ["שמואל מנדלזון"], "תפארת מנחם ביתר עילית": ["לוי טננבוים"], "תפארת שמואל בית שמש": ["משה אמוזיג"], "פאר מנחם אלעד": ["שניאור זלמן חביב", "יוסף מפעי"], "תורת מנחם תל ציון": "@self", "ת\"ת רחובות": ["מני שחר"], "בית חינוך נס ציונה": ["מנדי מיידניצ'יק"], "בית חינוך אשדוד": ["שניאור קאיקוב"], "ת\"ת קרית מלאכי": ["יוסף יצחק חרמץ", "יעקב יעיש"], "בני מנחם קרית מלאכי": ["מנחם מעטוף"], "אהלי מנחם קרית גת": ["צבי כץ", "דוד שטרן"], "אור מנחם אשקלון": ["יהודה גודשמיט"], "בית ישראל נתיבות": ["דודי סויסה"], "אור מנחם אופקים": "@self", "אור יהודה": ["יהושע אלישביץ"], "ברקת": ["יענקי ערנטרוי"], "תורת אמת ירושלים": ["מנדי פרידמן"], "כפר חב\"ד (אידיש)": ["לוי לוין"], "פתח תקוה": ["מנחם שאער"]};
  Object.keys(RAKAZIM).forEach(function(k){ if(![].some.call($("rk-inst").options,function(o){return o.value===k})) $("rk-inst").add(new Option(k,k)); });
  function rkText(){ var n=RAKAZIM[$("rk-inst").value]||[];
    if(n==="@self") n=["שותף היקר בשבוע החסידות"];
    var many=n.length>1;
    var rav=function(full){ var w=full.split(" "); return w.length>1? "ר' "+w.slice(0,-1).join(" ")+" שיחי' "+w[w.length-1] : "ר' "+full+" שיחי'"; };
    var head;
    if(n.length&&n[0].indexOf("שותף")===0) head="ל"+n[0]+",";
    else if(many) head="לשלוחי הרבי בחינוך\nמחנכים בלגיונו של מלך\nהרכזים החברתיים-חסידיים\n"+n.map(rav).join(" ו");
    else head="לשליח הרבי בחינוך\nמחנך בלגיונו של מלך\nהרכז החברתי-חסידי"+(n.length?"\n"+rav(n[0]):"");
    return head+"\nשלום וברכה!\n\n"+
      "רציתי לומר "+(many?"לכם":"לך")+" תודה אישית על כל מה ש"+(many?"השקעתם":"השקעת")+" מאחורי הקלעים בשבוע החסידות \"אורייתא\": ההכנה, ההפקה וההפעלה. ראיתי, והערכתי.\nיישר כוח גדול, ולשנה טובה בלימוד החסידות ובדרכי החסידות!"; }
  var rkTouched=false;
  $("rk-text").value=rkText();
  $("rk-text").addEventListener("input",function(){ rkTouched=true; rkHref(); });
  $("rk-inst").addEventListener("change",function(){ if(!rkTouched) $("rk-text").value=rkText(); rkHref();
    $("rk-self").hidden=RAKAZIM[$("rk-inst").value]!=="@self"; });
  $("rk-think").addEventListener("click",function(){
    T("שאלה","אשמח לחשוב יחד עם הרשת על מינוי רכז חברתי-חסידי למוסד ("+$("rk-inst").value+")");
    this.textContent="נשלח ✓ ניצור קשר בקרוב"; this.disabled=true; });
  function rkHref(){ $("rk-wa").href="https://wa.me/?text="+encodeURIComponent($("rk-text").value); }
  rkHref();
  $("rk-wa").addEventListener("click",function(){ rkHref(); T("העביר הודעה","תודה לרכז "+($("rk-inst").value||"")+" (וואטסאפ)"); });
  $("rk-copy").addEventListener("click",function(){ var b=this, v=$("rk-text").value;
    (navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(function(){b.textContent="הועתק ✓"},function(){$("rk-text").select();b.textContent="מסומן. אפשר להעתיק"});
    T("העביר הודעה","תודה לרכז "+($("rk-inst").value||"")+" (העתקה)"); });
  // Copy buttons
  document.querySelectorAll("[data-copy]").forEach(function(b){ b.addEventListener("click",function(){
    var src=$(b.dataset.copy), text=src.innerText;
    (navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(function(){b.textContent="הועתק ✓"},function(){
      var r=document.createRange();r.selectNodeContents(src);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="מסומן. אפשר להעתיק"});
  })});
  // Outbound links
  document.querySelectorAll("a[data-link]").forEach(function(a){ a.addEventListener("click",function(){ T("לחץ על קישור",a.dataset.link); }) });
  // Reactions: quiet toggles (track.js logs them)
  document.querySelectorAll("#react a").forEach(function(b){ b.addEventListener("click",function(e){ e.preventDefault();
    b.setAttribute("aria-pressed", b.getAttribute("aria-pressed")==="true"?"false":"true"); }) });
  wire("p-send",function(){ var a=$("p-gift").value.trim();
    if(!a){ say("p-status","כתבו את התשובה לפני השליחה."); return null; }
    return {what:"שאלת השבוע", d:"המתנה לצוות: "+a}; },["p-status","תודה! התשובה הגיעה אלינו."]);
  // Blessing: opens the reader's WhatsApp with the text ready; they pick the person. Logged too.
  function blessText(){ var to=$("b-to").value, t=$("b-text").value.trim();
    return "מזל טוב "+to.replace(/^הרב /,"לרב ")+"!\n"+t+"\n\n(ברכה מאיגרת \"בהרחבה\")"; }
  function blessHref(){ $("b-wa").href="https://wa.me/?text="+encodeURIComponent(blessText()); }
  $("b-text").addEventListener("input",blessHref); $("b-to").addEventListener("change",blessHref); blessHref();
  $("b-wa").addEventListener("click",function(e){ var t=$("b-text").value.trim();
    if(!t){ e.preventDefault(); say("b-status","כתבו ברכה לפני השליחה."); return; }
    blessHref(); T("ברכה",$("b-to").value+": "+t); say("b-status","יישר כוח! הברכה בדרך."); });
  wire("r-send",function(){ var w=$("r-who").value.trim(), s=$("r-secret").value.trim(), b=$("r-bless").value.trim();
    if(!w||!s||!b){ say("r-status","כדי להיכנס להגרלה צריך לענות על שלוש השאלות."); return null; }
    return {what:"תשובה לחידה", d:"מוסד: "+w+" | הסוד: "+s+" | ברכה: "+b}; },["r-status","התשובה נקלטה ונכנסה להגרלה. הפתרון יפורסם באיגרת הבאה."]);
  wire("y-send",function(){ var n=$("y-name").value.trim(), p=$("y-phone").value.trim(), m=$("y-mail").value.trim(), i=$("y-inst").value.trim();
    if(!i||!n||(!p&&!m)){ say("y-status","צריך למלא מוסד, שם, ולפחות נייד או מייל."); return null; }
    if(!$("y-ok").checked){ say("y-status","סמנו שאיש הקשר יודע ומסכים לקבל הודעות."); return null; }
    return {what:"איש קשר נוסף", d:"מוסד: "+i+" | שם: "+n+" | תפקיד: "+$("y-role").value+" | נייד: "+p+" | מייל: "+m}; },["y-status","תודה! איש הקשר נוסף, ומעכשיו הוא יקבל במקביל אליך."]);
  wire("ask-send",function(){ var t=$("ask-text").value.trim(); if(!t){ say("ask-status","כתבו את השאלה לפני השליחה."); return null; }
    return {what:"שאלה", d:t}; },["ask-status","השאלה נשלחה, ונחזור אליך באופן אישי."]);
})();

/* Kits: add-to-calendar and ready messages for staff, coordinator and right hand */
(function(){
  var T=function(w,d){ if(window.__track) window.__track(w,d||""); };
  var D=function(y,m,d,h1,h2,title,loc,det,heb){ return {y:y,m:m,d:d,h1:h1,h2:h2,t:title,loc:loc||"",det:det||"",heb:heb||""}; };
  var RAKAZ="השתלמות והכשרה לתפקיד רכז החינוך החברתי-חסידי";
  var BEIT='"בית המדרש" לשלוחי החינוך (30 שעות גמול)';
  var BEIT='"בית המדרש" לשלוחי החינוך (30 שעות גמול)';
  var KITS={
    beit:{events:[],groups:[{label:"קמפוס שלוחי החינוך - חולון (ימי חמישי)",events:[D(2026,12,31,null,null,BEIT+" · יום 1","קמפוס שלוחי החינוך - חולון","",'כ"א טבת'),D(2027,2,18,null,null,BEIT+" · יום 2","קמפוס שלוחי החינוך - חולון","",'י"א אדר א\''),D(2027,5,6,null,null,BEIT+" · יום 3","קמפוס שלוחי החינוך - חולון","",'כ"ט ניסן')]},{label:"קמפוס שלוחי החינוך - חיפה (ימי שלישי)",events:[D(2026,12,29,null,null,BEIT+" · יום 1","קמפוס שלוחי החינוך - חיפה","",'י"ט טבת'),D(2027,2,16,null,null,BEIT+" · יום 2","קמפוס שלוחי החינוך - חיפה","",'ט\' אדר א\''),D(2027,5,4,null,null,BEIT+" · יום 3","קמפוס שלוחי החינוך - חיפה","",'כ"ז ניסן')]}],
      msgs:[{to:"לקבוצת הצוות",text:'צוות יקר, שלום וברכה!\n"בית המדרש" של הרשת לשלוחי החינוך: שלושה ימי למידה, מוכרים לגמול השתלמות של 30 שעות.\n\nקמפוס שלוחי החינוך - חולון (ימי חמישי): כ"א טבת (31.12) · י"א אדר א\' (18.2) · כ"ט ניסן (6.5)\nקמפוס שלוחי החינוך - חיפה (ימי שלישי): י"ט טבת (29.12) · ט\' אדר א\' (16.2) · כ"ז ניסן (4.5)\n\nמשתתפים בשלושת הימים, בקמפוס אחד: התוכנית בנויה כרצף.\nמי שמעוניין, כתבו לי.'}]},
    yudtes:{events:[],
      msgs:[{to:"לקבוצת הצוות",text:'צוות יקר, שלום וברכה!\nשבוע החסידות "אורייתא" בשיאו, ואנחנו נכנסים להילוך גבוה לקראת י"ט כסלו, ראש השנה לחסידות.\nתודה לכל אחד ואחד מכם על ההשקעה, ובמיוחד לרכז שלנו, שמאחורי הקלעים.\nבואו נסיים את השבוע בשמחה גדולה, ונעביר לתלמידים את האור של חג הגאולה.\n\nלשנה טובה בלימוד החסידות ובדרכי החסידות תכתבו ותחתמו!'}]}
  };
  var p2=function(n){return (n<10?"0":"")+n};
  function hm(h){ var H=Math.floor(h),M=Math.round((h-H)*60); return p2(H)+p2(M)+"00"; }
  function ymd(e,add){ var dt=new Date(e.y,e.m-1,e.d+(add||0)); return dt.getFullYear()+p2(dt.getMonth()+1)+p2(dt.getDate()); }
  function gcal(e){
    var dates=e.h1==null? ymd(e)+"/"+ymd(e,1) : ymd(e)+"T"+hm(e.h1)+"/"+ymd(e)+"T"+hm(e.h2);
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&ctz=Asia/Jerusalem&text="+encodeURIComponent(ttl(e))+"&dates="+dates+
      "&location="+encodeURIComponent(e.loc)+"&details="+encodeURIComponent((e.det?e.det+"\n":"")+'מתוך איגרת "בהרחבה" של האגף לחינוך יסודי - בנים');
  }
  function ics(evs){
    var esc=function(t){return String(t).replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\;")};
    var L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//behrava//he","CALSCALE:GREGORIAN",
      "BEGIN:VTIMEZONE","TZID:Asia/Jerusalem","BEGIN:STANDARD","DTSTART:19701025T020000","RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU","TZOFFSETFROM:+0300","TZOFFSETTO:+0200","TZNAME:IST","END:STANDARD",
      "BEGIN:DAYLIGHT","DTSTART:19700327T020000","RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=FR;BYMONTHDAY=23,24,25,26,27,28,29","TZOFFSETFROM:+0200","TZOFFSETTO:+0300","TZNAME:IDT","END:DAYLIGHT","END:VTIMEZONE"];
    evs.forEach(function(e,i){
      L.push("BEGIN:VEVENT","UID:behrava-"+ymd(e)+"-"+i+"@igeret-behrava","DTSTAMP:20261120T000000Z");
      if(e.h1==null){ L.push("DTSTART;VALUE=DATE:"+ymd(e),"DTEND;VALUE=DATE:"+ymd(e,1)); }
      else { L.push("DTSTART;TZID=Asia/Jerusalem:"+ymd(e)+"T"+hm(e.h1),"DTEND;TZID=Asia/Jerusalem:"+ymd(e)+"T"+hm(e.h2)); }
      L.push("SUMMARY:"+esc(ttl(e))); if(e.loc) L.push("LOCATION:"+esc(e.loc)); if(e.det) L.push("DESCRIPTION:"+esc(e.det));
      L.push("END:VEVENT");
    });
    L.push("END:VCALENDAR"); return L.join("\r\n");
  }
  function fmt(e){ return (e.heb? e.heb+" ("+e.d+"."+e.m+")" : e.d+"."+e.m)+(e.loc?" · "+e.loc:""); }
  function ttl(e){ return e.t+(e.heb?" · "+e.heb:""); }
  document.querySelectorAll(".kit").forEach(function(box){
    var k=KITS[box.dataset.kit]; if(!k) return;
    var h="", groups=k.groups||(k.events.length?[{label:"ליומן",events:k.events}]:[]);
    groups.forEach(function(g,gi){
      h+='<div class="kitrow"><span class="kt">📅 '+g.label+'</span><button type="button" class="ghost mini" data-ics="'+gi+'">'+(g.events.length>1?"כל "+(g.events.length===3?"שלושת":g.events.length)+" המועדים":"להוסיף")+' (אייפון / אאוטלוק)</button></div>';
      h+='<div class="glinks">'+g.events.map(function(e,i){return '<a href="'+gcal(e)+'" target="_blank" rel="noopener" data-g="'+gi+'-'+i+'">'+(k.groups?fmt({heb:e.heb,d:e.d,m:e.m}):fmt(e))+' ביומן גוגל</a>'}).join("")+'</div>';
    });
    if(groups.length) h+='<p class="muted kn">'+(k.groups?'בגוגל מוסיפים כל מועד בנפרד, את שלושתם. ':'')+'ביומן גוגל אפשר להוסיף מוזמנים: מורים, הרכז, יד ימין. את קובץ היומן אפשר גם להעביר להם.</p>';
    k.msgs.forEach(function(m,i){
      h+='<div class="kitrow"><span class="kt">✉️ '+m.to+'</span><button type="button" class="cpbtn" data-cp="'+i+'">להעתיק</button><a class="wabtn" href="https://wa.me/?text='+encodeURIComponent(m.text)+'" target="_blank" rel="noopener" data-wa="'+i+'">בוואטסאפ</a></div>';
    });
    box.innerHTML=h;
    box.querySelectorAll("[data-ics]").forEach(function(ib){ ib.addEventListener("click",function(){
      var g=groups[+ib.dataset.ics];
      var blob=new Blob([ics(g.events)],{type:"text/calendar;charset=utf-8"}), a=document.createElement("a");
      a.href=URL.createObjectURL(blob); a.download="behrava-"+box.dataset.kit+(groups.length>1?"-"+ib.dataset.ics:"")+".ics"; document.body.appendChild(a); a.click(); a.remove();
      T("הוסיף ליומן", box.dataset.kit+" "+g.label+" (קובץ)"); ib.textContent="ירד ✓";
    }); });
    box.querySelectorAll("[data-g]").forEach(function(a){ a.addEventListener("click",function(){ T("הוסיף ליומן", box.dataset.kit+" (גוגל) "+a.textContent); }) });
    box.querySelectorAll("[data-cp]").forEach(function(b){ b.addEventListener("click",function(){ var m=k.msgs[b.dataset.cp];
      (navigator.clipboard?navigator.clipboard.writeText(m.text):Promise.reject()).then(function(){b.textContent="הועתק ✓"},function(){b.textContent="לא הועתק"});
      T("העביר הודעה", box.dataset.kit+" "+m.to); }) });
    box.querySelectorAll("[data-wa]").forEach(function(a){ a.addEventListener("click",function(){ T("העביר הודעה", box.dataset.kit+" "+k.msgs[a.dataset.wa].to+" (וואטסאפ)"); }) });
  });
})();

/* Blessings wall: only principals who came in through their personal email link see it and post on it */
(function(){ var started=false;
function initWall(){
  var $=function(id){return document.getElementById(id)};
  var me=window.__who?window.__who():{};
  if(started || !(me.id||me.n) || !window.__wallUrl) return; started=true;
  var walls=document.querySelectorAll(".wall");
  walls.forEach(function(w){ w.hidden=false; w.innerHTML='<p class="wl">💬 קיר הברכות</p><div class="wi"><p class="wb muted we">עוד אין ברכות. היו הראשונים!</p></div>'; });
  $("b-wall").hidden=false;
  var lb=document.querySelector('label[for="b-to"]'); if(lb) lb.textContent="כתבו ברכה: היא תופיע על קיר הברכות, ואפשר גם לשלוח אותה בווצאפ";
  $("b-help").textContent="את קיר הברכות רואים רק מנהלי האגף.";
  function add(to,text,name){
    walls.forEach(function(w){ if(w.dataset.to!==to) return;
      var p=document.createElement("p"); p.className="wb"; p.textContent='"'+text+'"';
      var s=document.createElement("span"); s.className="muted"; s.textContent=" (הרב "+String(name||"").replace(/^הרב\s+/,"")+")"; p.appendChild(s);
      var e=w.querySelector(".we"); if(e) e.remove(); w.querySelector(".wi").appendChild(p); });
  }
  fetch(window.__wallUrl).then(function(r){return r.json()}).then(function(list){
    (list||[]).forEach(function(b){ add(b.to,b.text,b.name); });
  }).catch(function(){});
  $("b-wall").addEventListener("click",function(){
    var t=$("b-text").value.trim(); if(!t){ $("b-status").textContent="כתבו ברכה לפני הפרסום."; return; }
    if(window.__track) window.__track("ברכה",$("b-to").value+": "+t);
    add($("b-to").value,t,me.n); $("b-text").value=""; $("b-status").textContent="הברכה פורסמה על הקיר. יישר כוח!";
  });
}
document.addEventListener("DOMContentLoaded",initWall); addEventListener("igme",initWall);
})();

/* Reading time, a climb bar, and a thank-you that counts the minutes */
(function(){
  var t0=Date.now();
  try{
    // Count what a reader actually reads: open text, not forms, ready messages or the folded "more" part
    var w=0;
    document.querySelectorAll(".wrap section p, .wrap section h1, .wrap section h2, .wrap section h3, .wrap .stations li, .wrap .qk p").forEach(function(el){
      if(el.closest(".kit,.fwd,#more,.poll,#yad form,.thanks,details:not([open])")) return;
      w+=(el.innerText||"").split(/\s+/).filter(Boolean).length;
    });
    var m=Math.max(3,Math.round(w/200*1.25*2)/2);
    document.getElementById("rmin").textContent=String(m);
  }catch(e){}
  var bar=document.getElementById("climb");
  function onScroll(){
    var h=document.documentElement, max=h.scrollHeight-h.clientHeight;
    bar.style.width=(max>0?Math.min(100,h.scrollTop/max*100):0)+"%";
  }
  addEventListener("scroll",onScroll,{passive:true}); onScroll();
  var shown=false;
  try{ new IntersectionObserver(function(es){ es.forEach(function(en){
    if(!en.isIntersecting||shown) return; shown=true;
    var min=Math.round((Date.now()-t0)/60000);
    var me=window.__who?window.__who():{};
    var who=me&&me.n?"הרב "+me.n+", ":"";
    document.getElementById("tk-t").textContent=who+(min>=1?"תודה על "+(min===1?"הדקה":min+" הדקות")+" שהקדשת. ":"")+"הזמן שאתה מקדיש לקריאה הוא מתנה גמורה למוסד שלך. אתה משקיע בדבר הנכון.";
    if(window.__track) window.__track("הגיע לסוף", min+" דקות");
    dispatchEvent(new CustomEvent("igtop"));
  }); },{threshold:.3}).observe(document.getElementById("thanks")); }catch(e){}
})();

/* Step by step: one part on screen at a time; "continue" closes the part before */
(function(){
  var wrap=document.querySelector(".wrap");
  var kids=[].slice.call(wrap.children);
  var intro=[], groups=[], cur=intro, bridges=[];
  kids.forEach(function(el){
    if(el.classList&&el.classList.contains("bridge")){ bridges.push(el); cur=[]; groups.push(cur); return; }
    cur.push(el);
  });
  if(!bridges.length) return;
  var T=function(w,d){ if(window.__track) window.__track(w,d||""); };
  var c=-1, all=false;
  bridges.forEach(function(br,i){
    var label=br.lastChild.textContent.replace(/^\s*↓\s*/,"");
    br.lastChild.textContent="";
    var t=document.createElement("span"); t.className="bt"; t.textContent=label; br.appendChild(t);
    var b=document.createElement("button"); b.type="button"; b.className="next";
    b.innerHTML="להמשיך ↓<small></small>"; b.querySelector("small").textContent=label;
    br.appendChild(b);
    b.addEventListener("click",function(){ show(i,"up"); T("המשיך לשלב", String(i+1)); });
    var back=document.createElement("button"); back.type="button"; back.className="back"; back.textContent="↑ לשלב הקודם";
    br.insertBefore(back,br.firstChild);
    back.addEventListener("click",function(){ show(i-1,"down"); });
  });
  function vis(list,v){ list.forEach(function(el){ el.classList.toggle("gated",!v); }); }
  var busy=false, reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function visibleNow(){ return (c===-1?intro:groups[c].concat([bridges[c]])).concat(bridges[c+1]?[bridges[c+1]]:[]); }
  function show(n,how){
    if(all||busy) return;
    if((how==="up"||how==="down"||how==="ladder")&&!reduce&&n!==c){
      busy=true;
      dispatchEvent(new CustomEvent("igclimb",{detail:{from:c,to:n}}));
      visibleNow().forEach(function(el){ if(el) el.classList.add("leaving"); });
      setTimeout(function(){
        visibleNow().forEach(function(el){ if(el) el.classList.remove("leaving"); });
        busy=false; doShow(n,how);
      },700);
      return;
    }
    doShow(n,how);
  }
  function doShow(n,how){
    c=n;
    vis(intro,c===-1);
    groups.forEach(function(g,k){ vis(g,k===c); });
    bridges.forEach(function(br,k){
      br.classList.toggle("gated",!(k===c||k===c+1));
      br.classList.toggle("head",k===c);
      br.classList.toggle("on",k<=c);
    });
    dispatchEvent(new CustomEvent("igstep",{detail:{n:c,how:how||""}}));
    animate(c===-1?intro:groups[c].concat([bridges[c]]));
    var top=c===-1?0:bridges[c].getBoundingClientRect().top+scrollY-24;
    scrollTo({top:top,behavior:"smooth"});
    dispatchEvent(new Event("scroll"));
  }
  // Entrance animation: the part rises in, its pieces one after another
  function animate(list){
    list.forEach(function(el){
      if(!el||!el.classList) return;
      el.classList.remove("enter"); void el.offsetWidth; el.classList.add("enter");
      [].slice.call(el.children).slice(0,10).forEach(function(ch,i){
        ch.classList.remove("rise"); void ch.offsetWidth; ch.style.animationDelay=(120+i*80)+"ms"; ch.classList.add("rise");
      });
    });
  }
  function groupOf(el){ for(var i=0;i<groups.length;i++){ if(groups[i].some(function(g){ return g===el||g.contains(el); })) return i; } return -1; }
  document.querySelectorAll('.toc a[href^="#"]').forEach(function(a){
    a.addEventListener("click",function(e){
      if(all) return;
      var t=document.querySelector(a.getAttribute("href")); if(!t) return;
      var g=groupOf(t); if(g<0) return;
      e.preventDefault(); show(g);
    });
  });
  var sa=document.getElementById("showall");
  if(sa) sa.addEventListener("click",function(e){
    e.preventDefault(); all=true;
    vis(intro,true); groups.forEach(function(g){ vis(g,true); });
    bridges.forEach(function(br){ br.classList.remove("gated","head"); br.classList.add("free"); });
    T("פתח הכול",""); sa.remove();
  });
  window.__showStep=function(n,how){ show(n,how); };
  window.__isAll=function(){ return all; };
  show(-1);
})();

