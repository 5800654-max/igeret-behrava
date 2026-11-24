/* In the background: seven wrapped gifts, one drove at a time, with space between them.
   They breathe quietly; the reader's gift glows; on "continue" its lid opens.
   At the end, "to satisfy his eye": all seven open together. */
(function(){
  var host=document.getElementById("bgl"); if(!host) return;
  var N=7, H=1000, NS="http://www.w3.org/2000/svg";
  function el(n,a,p){ var e=document.createElementNS(NS,n); for(var k in a) e.setAttribute(k,a[k]); (p||svg).appendChild(e); return e; }
  var svg=document.createElementNS(NS,"svg"); svg.setAttribute("viewBox","0 0 200 "+H); svg.setAttribute("preserveAspectRatio","xMidYMid meet");
  var defs=el("defs",{});
  var f=el("filter",{id:"gglow",x:"-100%",y:"-100%",width:"300%",height:"300%"},defs);
  el("feGaussianBlur",{stdDeviation:"6"},f);
  // the road the droves walk on
  el("path",{d:"M100 990 C 60 800, 140 620, 100 450 S 70 150, 100 20","class":"bg-road"});
  var Y=[], X=[]; for(var i=0;i<N;i++){ Y[i]=900-i*135; X[i]=100+(i%2?16:-16); }  // gift 1 low, gift 7 high, with space between
  var gifts=Y.map(function(y,i){
    var g=el("g",{"class":"bg-gift",transform:"translate("+X[i]+" "+y+")"});
    el("ellipse",{cx:"0",cy:"6",rx:"46",ry:"40","class":"bg-halo",filter:"url(#gglow)"},g);
    el("rect",{x:"-30",y:"-18",width:"60",height:"44",rx:"5","class":"bg-box"},g);
    el("rect",{x:"-5",y:"-18",width:"10",height:"44","class":"bg-rib"},g);
    var lid=el("g",{"class":"bg-lid"},g);
    el("rect",{x:"-34",y:"-30",width:"68",height:"13",rx:"4","class":"bg-box"},lid);
    el("rect",{x:"-5",y:"-30",width:"10",height:"13","class":"bg-rib"},lid);
    el("ellipse",{cx:"-10",cy:"-36",rx:"10",ry:"6",transform:"rotate(-20 -10 -36)","class":"bg-bow"},lid);
    el("ellipse",{cx:"10",cy:"-36",rx:"10",ry:"6",transform:"rotate(20 10 -36)","class":"bg-bow"},lid);
    var sp=el("g",{"class":"bg-spark"},g);
    [[-14,-44],[0,-52],[14,-44]].forEach(function(p){ el("circle",{cx:String(p[0]),cy:String(p[1]),r:"2.6"},sp); });
    return g;
  });
  host.appendChild(svg);
  var cur=-1, top=false;
  function place(){
    gifts.forEach(function(g,k){
      g.classList.toggle("cur",k===cur&&!top);
      g.classList.toggle("open",top||k<cur||(k===cur));
    });
  }
  addEventListener("igclimb",function(e){
    host.classList.add("dark"); cur=e.detail.to; top=false; place();
    setTimeout(function(){ host.classList.remove("dark"); },1500);
  });
  addEventListener("igstep",function(e){ if(cur!==e.detail.n){ cur=e.detail.n; top=false; place(); } });
  addEventListener("igtop",function(){ host.classList.add("dark","all"); top=true; place(); setTimeout(function(){ host.classList.remove("dark"); },2400); });
  place();
  // The finale: seven small gifts in a row, opening one after another
  var row=document.getElementById("gifts-row");
  if(row){
    for(var j=0;j<N;j++){ var s=document.createElement("span"); s.className="gmini"; s.style.animationDelay=(j*160)+"ms"; s.textContent="🎁"; row.appendChild(s); }
    addEventListener("igtop",function(){ row.classList.add("go"); });
  }
})();
