/* WhatsApp buttons: on a computer go straight to WhatsApp Web (no "open the app?" page),
   always in the same tab; on a phone keep wa.me, which opens the WhatsApp app directly. */
(function(){
  var mobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  function toWeb(href){
    var m=String(href).match(/^https:\/\/wa\.me\/(\d*)\/?\?text=(.*)$/);
    if(!m) return null;
    return "https://web.whatsapp.com/send?"+(m[1]?"phone="+m[1]+"&":"")+"text="+m[2];
  }
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="https://wa.me/"]');
    if(!a||mobile) return;
    var w=toWeb(a.getAttribute("href")); if(!w) return;
    a.setAttribute("href",w); a.setAttribute("target","wa-web");
  });  // bubble phase: runs after the button's own handler has set the final message
  // "copy the message" buttons
  document.addEventListener("click",function(e){
    var b=e.target.closest&&e.target.closest("button[data-copytext]"); if(!b) return;
    var t=b.getAttribute("data-copytext");
    function fallback(){ var ta=document.createElement("textarea"); ta.value=t; ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select();
      var ok=false; try{ ok=document.execCommand("copy"); }catch(_){} ta.remove(); b.textContent=ok?"הועתק ✓":"לא הועתק"; }
    if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(t).then(function(){b.textContent="הועתק ✓"},fallback); else fallback();
    if(window.__track) window.__track("העביר הודעה",(b.getAttribute("data-what")||"")+" (העתקה)");
  });
})();
