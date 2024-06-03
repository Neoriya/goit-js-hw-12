import{i as p,S as h}from"./assets/vendor-0fc460d7.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const g="43173775-fc7269b10cca3a5d436001063";function y(a){const s=new URLSearchParams({key:g,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`https://pixabay.com/api/?${s}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>{if(t.hits.length===0)throw new Error("Sorry, there are no images matching <br>your search query.Please try again!");return t.hits}).catch(t=>{throw console.error("Error fetching images:",t),p.error({message:t.message,backgroundColor:"#EF4040",messageColor:"#FAFAFB",position:"topRight"}),t})}function b(a){return a.map(({likes:s,views:t,comments:i,downloads:e,webformatURL:r,largeImageURL:n,tags:f,id:m})=>`<li data-id="${m}">
      <div class="gallery">
        <a class='large-image' href="${n}">
          <img src="${r}" alt="${f}" class="preview-image" width="360" height="152">
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
          <span class="data-label">${i}</span>
        </div>
        <div class="info-box">
          <span class="label">Downloads</span>
          <span class="data-label">${e}</span>
        </div>
      </div>
  </li>`).join("")}const v=document.querySelector("form"),u=document.querySelector("input"),l=document.querySelector("ul"),d=document.getElementById("spinner");u.addEventListener("input",L);v.addEventListener("submit",w);let o,c;function L(a){o=a.target.value.trim().toLowerCase()}function w(a){if(a.preventDefault(),l.innerHTML="",!o||o.trim()===""){p.error({message:"Sorry, the query field is empty.",backgroundColor:"#EF4040",messageColor:"#FAFAFB",position:"topRight"}),u.value="",o="";return}d.style.display="block",y(o).then(s=>{l.innerHTML="",l.insertAdjacentHTML("beforeend",b(s)),c?c.refresh():c=new h(".gallery a",{nav:!0,captions:!0,captionsData:"alt",captionDelay:250})}).catch(s=>{console.error("Error fetching images:",s)}).finally(()=>{d.style.display="none",u.value="",o=""})}
//# sourceMappingURL=commonHelpers.js.map
