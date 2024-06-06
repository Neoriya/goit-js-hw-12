import{a as A,i as u,S as E}from"./assets/vendor-f144e563.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const F="43173775-fc7269b10cca3a5d436001063",L="https://pixabay.com/api/";async function y(r,s=1){try{const t=await A.get(L,{params:{key:F,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:s}});if(t.status!==200)throw new Error("Request failed with status: "+t.status);if(t.data.hits.length===0)throw new Error("Sorry, there are no images matching <br>your search query.Please try again!");return{images:t.data.hits,totalHits:t.data.totalHits}}catch(t){throw console.error("Error fetching images:",t),u.error({message:t.message,backgroundColor:"#EF4040",messageColor:"#FAFAFB",position:"topRight"}),t}}function b(r){return r.map(({likes:s,views:t,comments:c,downloads:e,webformatURL:o,largeImageURL:i,tags:v,id:w})=>`<li data-id="${w}">
      <div class="gallery">
        <a class='large-image' href="${i}">
          <img src="${o}" alt="${v}" class="preview-image" width="360" height="152">
        </a>
      </div>
      <div class="info-container">
        <div class="info-box">
          <span class="label">Likes</span>
          <span class="data-label">${s}</span>
        </div>
        <div class="info-box">
          <span class="label">Views</span>
          <span class="data-label">${t}</span>
        </div>
        <div class="info-box">
          <span class="label">Comments</span>
          <span class="data-label">${c}</span>
        </div>
        <div class="info-box">
          <span class="label">Downloads</span>
          <span class="data-label">${e}</span>
        </div>
      </div>
  </li>`).join("")}const C=document.querySelector("form"),g=document.querySelector("input"),a=document.querySelector("ul"),f=document.getElementById("spinner"),l=document.getElementById("load-more"),m=document.getElementById("spinner-load-more");C.addEventListener("submit",B);l.addEventListener("click",S);let n="",d,p=1,h=0;async function B(r){if(r.preventDefault(),a.innerHTML="",p=1,l.style.display="none",n=g.value.trim().toLowerCase(),!n||n.trim()===""){u.error({message:"Sorry, the query field is empty.",backgroundColor:"#EF4040",messageColor:"#FAFAFB",position:"topRight"}),g.value="",n="";return}f.style.display="block";try{const{images:s,totalHits:t}=await y(n,p);h=t,a.innerHTML="",a.insertAdjacentHTML("beforeend",b(s)),s.length<15||a.children.length>=h?(u.info({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#5A5A5A",messageColor:"#FAFAFB",position:"topRight"}),l.style.display="none"):l.style.display="block",d?d.refresh():d=new E(".gallery a",{nav:!0,captions:!0,captionsData:"alt",captionDelay:250})}catch(s){console.error("Error fetching images:",s)}finally{f.style.display="none",g.value=""}}async function S(){p+=1,m.style.display="block";try{const{images:r}=await y(n,p);a.insertAdjacentHTML("beforeend",b(r)),d.refresh();const{height:s}=a.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"}),(r.length<15||a.children.length>=h)&&(u.info({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#5A5A5A",messageColor:"#FAFAFB",position:"topRight"}),l.style.display="none")}catch(r){console.error("Error fetching images:",r)}finally{m.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map
