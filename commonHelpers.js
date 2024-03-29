import{a as L,i as m}from"./assets/vendor-57efd687.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();async function d(s,r){const e="https://pixabay.com"+"/api/",t={key:"43041938-51a06b63921488a862c0fcc6d",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,lang:"en",page:r,per_page:24};return(await L.get(e,{params:t})).data}function p(s){if(s.length===0)a.list.innerHTML="",m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else return s.map(({webformatURL:c,largeImageURL:i,tags:e,likes:t,views:n,comments:y,downloads:h})=>`
    <li class="gallery-item">
    <a class="gallery-link" href="${i}">
    <img class="gallery-image" src="${c}" alt="${e}" />
    </a>
    <div class="content-image">
    <p class="pege-item">Likes<span class="inf-item">${t}</span></p>
    <p class="pege-item">Views<span class="inf-item">${n}</span></p>
    <p class="pege-item">Comments<span class="inf-item">${y}</span></p>
    <p class="pege-item">Downloads<span class="inf-item">${h}</span></p>
    </div>
    </li>
    `).join("")}let l,o=1,u=0;const b=24,a={formElem:document.querySelector("form"),list:document.querySelector(".gallery-image"),loadItem:document.querySelector(".loader-cont"),btnLoad:document.querySelector(".btn-primary")};a.formElem.addEventListener("submit",S);a.btnLoad.addEventListener("click",M);async function S(s){if(s.preventDefault(),g(),o=1,l=s.target.elements.search.value.trim(),l){a.list.innerHTML="";const r=await d(l,o);u=Math.ceil(r.total/b),a.list.insertAdjacentHTML("beforeend",p(r.hits)),f()}else a.list.innerHTML="",m.info({message:"Line is empty, enter a value",position:"topLeft"});s.target.reset()}async function M(){o+=1;const s=await d(l,o);a.list.insertAdjacentHTML("beforeend",p(s.hits)),f()}function f(){o>=u?g():E()}function E(){a.btnLoad.classList.remove("hidden")}function g(){a.btnLoad.classList.add("hidden")}
//# sourceMappingURL=commonHelpers.js.map
