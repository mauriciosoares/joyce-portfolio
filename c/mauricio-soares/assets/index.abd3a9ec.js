const u=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))g(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&g(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function g(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}};u();var f="assets/DSC00114.7ab64938.jpg",b="assets/DSC05846.14e676c9.jpg",y="assets/DSC06020.873a8881.jpg",h="assets/DSC06085.64cf0c33.jpg",_="assets/DSC06277.83902dc1.jpg",x="assets/DSC06360.61e9b59b.jpg",v="assets/DSC06393.eab5ed23.jpg",k="assets/DSC06397.46d20000.jpg",S="assets/DSC06749.056000e7.jpg",j="assets/DSC07266.f6cbaf3e.jpg",w="assets/DSC07455.2c09b51f.jpg",C="assets/DSC09088.7a3f3710.jpg",D="assets/DSC09451.389f6600.jpg",z="assets/DSC09603.7a1950d9.jpg",L="assets/DSC09707.fa380911.jpg",E="assets/IMG_1057.07300cc4.jpg",I="assets/LRG_DSC04977.0cf7f53d.jpg",M="assets/PLM34.3a78da25.jpg",q="assets/PLM61.d935c456.jpg";let s=null,n=[],l=!1,m=document.querySelector("[data-modal-image]");function d(){m.innerHTML="",document.body.classList.remove("show-modal"),l=!1,history.pushState(null,null," ")}document.querySelector("[data-modal-close]").addEventListener("click",d);document.addEventListener("keydown",e=>{e.key==="Escape"&&d(),e.key==="ArrowRight"&&l&&document.querySelector('[data-gallery-nav="next"]').click(),e.key==="ArrowLeft"&&l&&document.querySelector('[data-gallery-nav="prev"]').click()});function c(e){if(n.indexOf(e)===-1)return d();history.pushState(null,null,`#${e}`),document.querySelector(`[data-image-id="${e}"]`),document.body.classList.add("show-modal"),l=!0,s=e;const o=new URL({"/images/gallery/full/DSC00114.jpg":f,"/images/gallery/full/DSC05846.jpg":b,"/images/gallery/full/DSC06020.jpg":y,"/images/gallery/full/DSC06085.jpg":h,"/images/gallery/full/DSC06277.jpg":_,"/images/gallery/full/DSC06360.jpg":x,"/images/gallery/full/DSC06393.jpg":v,"/images/gallery/full/DSC06397.jpg":k,"/images/gallery/full/DSC06749.jpg":S,"/images/gallery/full/DSC07266.jpg":j,"/images/gallery/full/DSC07455.jpg":w,"/images/gallery/full/DSC09088.jpg":C,"/images/gallery/full/DSC09451.jpg":D,"/images/gallery/full/DSC09603.jpg":z,"/images/gallery/full/DSC09707.jpg":L,"/images/gallery/full/IMG_1057.jpg":E,"/images/gallery/full/LRG_DSC04977.jpg":I,"/images/gallery/full/PLM34.jpg":M,"/images/gallery/full/PLM61.jpg":q}[`/images/gallery/full/${e}.jpg`],self.location).href;m.style.backgroundImage=`url(${o})`}Array.from(document.querySelectorAll("[data-image-id]")).forEach(e=>{const{imageId:o}=e.dataset;n.push(o),e.addEventListener("click",()=>{c(o)})});Array.from(document.querySelectorAll("[data-gallery-nav]")).forEach(e=>{e.addEventListener("click",()=>{const{galleryNav:o}=e.dataset;let i;o==="next"?i=n[n.indexOf(s)+1]||n[0]:i=n[n.indexOf(s)-1]||n[n.length-1],c(i)})});document.addEventListener("readystatechange",()=>{window.location.hash&&c(window.location.hash.replace("#",""))});const p=document.querySelector("#selected-images-count");document.querySelectorAll(".select-photo").forEach(e=>{e.addEventListener("change",function(){let o=parseInt(p.textContent);this.checked?o+=1:o-=1,p.textContent=o})});
