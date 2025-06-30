import{a as y}from"./vendor-DDD7fsZd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const T="https://your-energy.b.goit.study/api/";y.defaults.headers.post["Content-Type"]="application/json";const x=async(a,e)=>{try{return(await y.get(`${T}${a}`,{params:e})).data}catch(t){throw console.error("Error in get:",t),t}},j=async(a,e)=>{try{return(await y.patch(`${T}${a}`,e)).data}catch(t){throw console.error("Error in patch:",t),t}},W=async(a,e)=>{try{return(await y.post(`${T}${a}`,e)).data}catch(t){return console.error("Error in post:",t),t.response}},M=document.getElementById("subscribe-form"),F=M?.querySelector(".form_input");M&&F&&M.addEventListener("submit",async function(a){a.preventDefault();const e=F.value.trim();await W("subscription",{email:e})});const $=()=>{const a=localStorage.getItem("favorites");try{return a?JSON.parse(a):[]}catch(e){return console.error("Failed to parse favorites:",e),[]}};class Q{constructor(e="#modal-root"){this.#r=e}#r;#i="";#t=!1;#s=0;#a="";#l="";get#e(){return document.querySelector(this.#r)}get#h(){return this.#e?.querySelector(".modal-backdrop")}get#m(){return this.#e?.querySelector("#menu-close-button")}get#d(){return this.#e?.querySelectorAll(".star-rating svg")}get#n(){return this.#e?.querySelector(".modal-rating-count")}get#o(){return this.#e?.querySelector("#send-rating-button")}get#c(){return this.#e?.querySelector("#rating-form")}get#p(){return this.#e?.querySelector("#email")}get#g(){return this.#e?.querySelector("#comment")}#v(){this.#i="",this.#s=0,this.#a="",this.#l="",this.#t=!1,this.#c&&this.#c.reset?.(),this.#n&&(this.#n.textContent="0.0"),this.#o&&this.#o.setAttribute("disabled","true")}#u(){return`
      <div class="modal-backdrop">
        <div class="modal-rating-container">
          <svg id="menu-close-button" class="menu-close-button">
            <use href="./img/icons.svg#menu-close"></use>
          </svg>
          <p class="modal-rating-header">Rating</p>
          <div class="modal-rating-info-container">
            <div class="modal-rating-stars-container">
              <p class="modal-rating-count">0.0</p>
              <ul class="star-rating">
                ${[1,2,3,4,5].map(e=>`
                  <li><svg data-index="${e}"><use href="./img/icons.svg#icon-star"></use></svg></li>
                `).join("")}
              </ul>
            </div>
            <form id="rating-form">
              <label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autocomplete="email"
                  />
              </label>
              <label>
                <textarea required name="comment" id="comment" placeholder="Your comment" rows="4"></textarea>
              </label>
              <div class="modal-controls">
                <button type="submit" id="send-rating-button" class="btn primary" disabled>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>`}#y(){this.#e?.dispatchEvent(new CustomEvent("rating-modal:close",{bubbles:!0}))}#E=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#f=e=>{this.#d?.forEach((t,s)=>{t.classList.toggle("hovered",s<e),t.classList.toggle("selected",s<this.#s)})};#b(){if(!this.#o)return;const e=this.#a.trim()&&this.#l.trim()&&this.#s>0;this.#o.disabled=!e}#q=async e=>{e.preventDefault();const t=new FormData(e.target),s=t.get("email")?.trim(),i=t.get("comment")?.trim();try{await j(`exercises/${this.#i}/rating`,{rate:this.#s,email:s,review:i}),this.hideModal()}catch(r){console.error("Rating submit failed:",r),alert("Failed to submit rating. Please try again later.")}};#S(){this.#d?.forEach((e,t)=>{e.addEventListener("mouseover",()=>this.#f(t+1)),e.addEventListener("mouseout",()=>this.#f(this.#s)),e.addEventListener("click",()=>{this.#s=t+1,this.#f(this.#s),this.#n&&(this.#n.textContent=this.#s.toFixed(1)),this.#b()})})}#w=e=>{e.key==="Escape"&&this.hideModal()};showModal(e){e&&(this.#i=e,this.#e.innerHTML=this.#u(),this.#h?.addEventListener("click",this.#E),this.#m?.addEventListener("click",this.hideModal),this.#c?.addEventListener("submit",this.#q),this.#p?.addEventListener("input",t=>{this.#a=t.target.value,this.#b()}),this.#g?.addEventListener("input",t=>{this.#l=t.target.value,this.#b()}),window.addEventListener("keydown",this.#w),document.body.style.overflow="hidden",this.#t=!0,this.#S())}hideModal=()=>{this.#t&&(window.removeEventListener("keydown",this.#w),document.body.style.overflow="visible",this.#e.innerHTML="",this.#y(),this.#v())}}class R{constructor(e="#modal-root"){this.#r=e,this.#s=new Q(this.#r),this.#a.addEventListener("rating-modal:close",this.#v)}#r;#i=!1;#t={};#s=null;get#a(){return document.querySelector(this.#r)}get#l(){return document.querySelector(".modal-backdrop")}get#e(){return document.querySelector("#add-to-favorite-button")}get#h(){return document.querySelector("#give-a-rating-button")}get#m(){return document.querySelector("#menu-close-button")}#d(e){this.#t=e;const{target:t="N/A",bodyPart:s="N/A",equipment:i="N/A",gifUrl:r="",name:n="Unknown Exercise",description:E="No description available",rating:m=0,burnedCalories:q=0,time:f=0,popularity:b=0}=this.#t;return`<div class="modal-backdrop">
      <div class="modal-container">
        <svg id="menu-close-button" class="menu-close-button">
          <use href="./img/icons.svg#menu-close"></use>
        </svg>
        <div class="info-container">
          <img src="${r}" alt="exercise" class="modal-image" onerror="this.src='/src/img/no-image.webp'" />
          <div>
            <p class="modal-name">${n}</p>
            <div class="modal-rating-info">
              <p class="modal-rating">${m}</p>
              ${this.#p(m)}
            </div>
            <hr />
            <ul class="modal-meta">
              <li>
                <p>Target</p>
                <p>${t}</p>
              </li>
              <li>
                <p>Body Part</p>
                <p>${s}</p>
              </li>
              <li>
                <p>Equipment</p>
                <p>${i}</p>
              </li>
              <li>
                <p>Popular</p>
                <p>${b}</p>
              </li>
              <li>
                <p>Burned Calories</p>
                <p>${q}${f?` / ${f} min`:""}</p>
              </li>
            </ul>
            <hr />
            <p class="modal-description">${E}</p>
          </div>
        </div>
        <div class="modal-controls">
          <button id="add-to-favorite-button" class="btn primary">
            Add to favorites
          </button>
          <button id="give-a-rating-button" class="btn secondary">
            Give rating
          </button>
        </div>
      </div>
    </div>`}#n=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#o=()=>{const e=$(),t=this.#t.name,s=e.findIndex(i=>i.name===t);s!==-1?e.splice(s,1):e.push(this.#t),localStorage.setItem("favorites",JSON.stringify(e)),this.#c()};#c=()=>{const e=this.#e;if(!e)return;const t=$().some(s=>s.name===this.#t.name);e.innerHTML=t?'Remove from favorites <svg><use href="./img/icons.svg#icon-trash"></use></svg>':'Add to favorites <svg><use href="./img/icons.svg#icon-heart"></use></svg>'};#p(e){const t=Math.floor(e),s=5-t;return`
    <ul class="modal-rating-stars">
      ${'<li><svg class="active"><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(t)}
      ${'<li><svg><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(s)}
    </ul>
  `}#g=()=>{this.hideModal(),this.#s.showModal(this.#t._id)};#v=()=>{this.showModal(this.#t)};#u=e=>{e.key==="Escape"&&this.hideModal()};showModal=e=>{if(!this.#i)try{this.#a.innerHTML=this.#d(e),this.#e?.addEventListener("click",this.#o),this.#l?.addEventListener("click",this.#n),this.#m?.addEventListener("click",this.hideModal),this.#h?.addEventListener("click",this.#g),window.addEventListener("keydown",this.#u),document.body.style.overflow="hidden",this.#c(),this.#i=!0}catch{this.#a.innerHTML=""}};hideModal=()=>{this.#i&&(window.removeEventListener("keydown",this.#u),document.body.style.overflow="visible",this.#a.innerHTML="",this.#i=!1)}}class D{constructor(e={}){this.container=e.container,this.showRating=e.showRating??!0,this.showRemoveBtn=e.showRemoveBtn??!1,this.onStartClick=e.onStartClick||(()=>{}),this.onRemoveClick=e.onRemoveClick||(()=>{}),this.customClass=e.customClass||""}generateExerciseCard(e){const t=this.showRating?`
      <div class="rating">
        ${e.rating} <span class="star">
          <svg width="14" height="14">
            <use href="./img/icons.svg#icon-star-full"></use>
          </svg>
        </span>
      </div>
    `:"",s=this.showRemoveBtn?`
      <img class="icon-top remove-btn" src="./img/icons/trash-01.svg" alt="Trash Icon" data-id="${e._id||e.id}">
    `:"";return`
      <div class="exercise-item ${this.customClass}" data-exercise-id="${e._id||e.id}">
        <div class="exercise-top-row">
          <div class="workout-rating-left">
            <div class="workout-badge">${e.equipment?e.equipment.toUpperCase():"WORKOUT"}</div>
            ${this.showRating?t:s}
          </div>
          <button class="start-btn" data-exercise-id="${e._id||e.id}">
            Start
            <span class="arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" style="stroke: #242424;">
                <use href="./img/icons.svg#icon-arrow-start"></use>
              </svg>
            </span>
          </button>
        </div>
        <div class="exercise-middle-row">
          <div class="exercise-icon">
            <svg width="20" height="20">
              <use href="./img/icons.svg#icon-runner"></use>
            </svg>
          </div>
          <h3 class="exercise-title">${e.name}</h3>
        </div>
        <div class="exercise-bottom-row">
          <span><span class="meta-label">Burned calories:</span> <span class="meta-value">${e.burnedCalories}</span></span>
          <span><span class="meta-label">Body part:</span> <span class="meta-value">${e.bodyPart}</span></span>
          <span><span class="meta-label">Target:</span> <span class="meta-value">${e.target}</span></span>
        </div>
      </div>
    `}render(e){if(!this.container){console.error("Container not provided for ExercisesList");return}if(!e||e.length===0){this.container.innerHTML=this.getEmptyMessage();return}const t=e.map(s=>this.generateExerciseCard(s)).join("");this.showRemoveBtn?this.container.innerHTML=t:this.container.innerHTML=`<div class="exercises-list">${t}</div>`,this.attachEventListeners()}getEmptyMessage(){return this.showRemoveBtn?`<p class="no-favorites-msg">
        It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
      </p>`:'<div class="error">No exercises found.</div>'}attachEventListeners(){this.container.querySelectorAll(".start-btn").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const i=t.dataset.exerciseId;this.onStartClick(i)})}),this.showRemoveBtn&&this.container.querySelectorAll(".remove-btn").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();const r=s.dataset.id;this.onRemoveClick(r)})})}removeExercise(e){const t=this.container.querySelector(`[data-exercise-id="${e}"]`);t&&(t.remove(),this.container.querySelectorAll(".exercise-item").length===0&&(this.container.innerHTML=this.getEmptyMessage()))}clear(){this.container&&(this.container.innerHTML="")}}function k(a,e){if(e<=1)return"";const t=[];return t.push(`
    <button class="page-btn nav-btn prev" ${a===1?"disabled":""} data-page="prev">
      <svg width="20" height="20">
        <use href="./img/icons.svg#icon-nav-arrow"></use>
      </svg>
    </button>
  `),t.push(J(a,e)),t.push(`
    <button class="page-btn nav-btn next" ${a===e?"disabled":""} data-page="next">
      <svg width="20" height="20">
        <use href="./img/icons.svg#icon-nav-arrow"></use>
      </svg>
    </button>
  `),`<div class="muscles-pagination">${t.join("")}</div>`}function J(a,e){const t=[];if(e<=5)for(let s=1;s<=e;s++)t.push(`<button class="page-btn ${s===a?"active":""}" data-page="${s}">${s}</button>`);else{t.push(`<button class="page-btn ${a===1?"active":""}" data-page="1">1</button>`),a>3&&t.push('<span class="page-dots">...</span>');const s=Math.max(2,a-1),i=Math.min(e-1,a+1);for(let r=s;r<=i;r++)r!==1&&r!==e&&t.push(`<button class="page-btn ${r===a?"active":""}" data-page="${r}">${r}</button>`);a<e-2&&t.push('<span class="page-dots">...</span>'),e>1&&t.push(`<button class="page-btn ${e===a?"active":""}" data-page="${e}">${e}</button>`)}return t.join("")}const c={FILTERS_PER_PAGE:12,EXERCISES_PER_PAGE:10,SEARCH_DEBOUNCE_DELAY:1e3,ANIMATION_DURATION:0,DEFAULT_FILTER:"Muscles"},u={musclesGrid:"#muscles-grid",tabs:".tab",searchSection:"#search-section",breadcrumb:"#breadcrumb",searchInput:".search-input",searchClearBtn:"#search-clear-btn"},h={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"};class Y{constructor(){this.currentPage=1,this.totalPages=1,this.currentFilter=c.DEFAULT_FILTER,this.selectedBodyPart="",this.allExercises=[],this.filteredExercises=[],this.exercisesMap=new Map,this.currentHeight=0,this.searchTimeout=null}reset(){this.currentPage=1,this.totalPages=1,this.allExercises=[],this.filteredExercises=[],this.exercisesMap.clear(),this.selectedBodyPart="",this.clearSearchTimeout()}clearSearchTimeout(){this.searchTimeout&&(clearTimeout(this.searchTimeout),this.searchTimeout=null)}}class o{static getElementById(e){return document.getElementById(e.replace("#",""))}static querySelectorAll(e){return document.querySelectorAll(e)}static show(e){e.style.display="block"}static hide(e){e.style.display="none"}static setContent(e,t){e.innerHTML=t}static measureContentHeight(e,t){const s=document.createElement("div");Object.assign(s.style,{visibility:"hidden",position:"absolute",top:"-9999px",width:`${t}px`}),s.innerHTML=e,document.body.appendChild(s);const i=s.scrollHeight;return document.body.removeChild(s),i}static animateHeight(e,t,s=c.ANIMATION_DURATION){e.style.height=`${t}px`,setTimeout(()=>{e.style.height="auto"},s)}}class I{static async fetchFilters(e,t=1){return await x("filters",{filter:e,page:t,limit:c.FILTERS_PER_PAGE})}static async fetchExercises(e,t,s=1){const i={page:s,limit:c.EXERCISES_PER_PAGE};switch(t){case h.BODY_PARTS:i.bodypart=e;break;case h.MUSCLES:i.muscles=e;break;case h.EQUIPMENT:i.equipment=e;break}return await x("exercises",i)}}class p{static filterCard(e){return`
      <div class="muscle-card" data-filter="${e.name}" data-filter-type="${e.filter}">
        <img src="${e.imgURL}" alt="${e.name}" class="muscle-card-img" />
        <div class="muscle-card-label">
          <span class="muscle-card-title">${e.name}</span>
          <span class="muscle-card-subtitle">${e.filter}</span>
        </div>
      </div>
    `}static loadingTemplate(e){return`<div class="loading" style="height: ${e-80}px;">Loading...</div>`}static errorTemplate(e){return`<div class="error">${e}</div>`}static contentWrapper(e,t=""){return`
      <div class="content-wrapper">
        <div class="content-area">${e}</div>
        ${t?`<div class="pagination-area">${t}</div>`:""}
      </div>
    `}}class z{constructor(){this.state=new Y,this.elements=this.initializeElements(),this.modal=new R,this.exercisesList=null,this.elements&&this.setupEventListeners()}initializeElements(){const e={musclesGrid:o.getElementById(u.musclesGrid),tabs:o.querySelectorAll(u.tabs),searchSection:o.getElementById(u.searchSection),breadcrumb:o.getElementById(u.breadcrumb),searchClearBtn:o.getElementById(u.searchClearBtn)};return!e.musclesGrid||!e.searchSection?null:(e.searchInput=e.searchSection.querySelector(u.searchInput),e)}setupEventListeners(){this.setupTabListeners(),this.setupSearchListeners(),this.setupExerciseClickListeners()}setupTabListeners(){this.elements.tabs.forEach(e=>{e.addEventListener("click",()=>this.handleTabSwitch(e))})}setupSearchListeners(){this.elements.searchInput.addEventListener("input",e=>this.handleSearchInput(e)),this.elements.searchInput.addEventListener("keydown",e=>this.handleSearchKeydown(e)),this.elements.searchClearBtn.addEventListener("click",e=>this.handleSearchClear(e))}setupExerciseClickListeners(){this.elements.musclesGrid.addEventListener("click",e=>{const t=e.target.closest(".muscle-card");if(t){const r=t.dataset.filter,n=t.dataset.filterType;this.renderExercisesList(r,n,"",1);return}if(e.target.closest(".back-btn")){this.state.reset(),this.clearSearchInput(),this.renderFilters(this.state.currentFilter,1);return}const i=e.target.closest(".page-btn");if(i){this.handlePagination(i,this.state.selectedBodyPart?"exercises":"filters");return}})}async renderFilters(e=c.DEFAULT_FILTER,t=1){this.hideSearchAndBreadcrumb(),this.state.selectedBodyPart="",this.prepareContainer();try{const s=await I.fetchFilters(e,t);if(this.updateFilterState(s,e),!s.results.length){this.showError("No items found.");return}const i=this.buildFiltersContent(s.results),r=k(t,this.state.totalPages),n=p.contentWrapper(i,r);this.updateContainerWithAnimation(n)}catch{this.showError("Failed to load data.")}}async renderExercisesList(e,t,s="",i=1){this.showSearchAndBreadcrumb(e),s||this.clearSearchInput(),this.prepareContainer();try{const r=await I.fetchExercises(e,t,i);this.updateExercisesState(r,e);const n=this.filterExercises(s);if(n.length===0){this.showNoExercisesFound(s);return}const E=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`,m=s?"":k(i,this.state.totalPages),q=`
        <div class="content-wrapper">
          <div class="content-area">
            <div class="exercises-list-container"></div>
            ${E}
          </div>
          ${m?`<div class="pagination-area">${m}</div>`:""}
        </div>
      `;this.updateContainerWithAnimation(q);const f=this.elements.musclesGrid.querySelector(".exercises-list-container");this.exercisesList=new D({container:f,showRating:!0,showRemoveBtn:!1,onStartClick:b=>{const B=this.state.exercisesMap.get(b);B?this.modal.showModal(B):console.error("Exercise not found in exercisesMap for ID:",b)}}),this.exercisesList.render(n)}catch{this.showError("Failed to load exercises.")}}buildFiltersContent(e){return`<div class="muscles-cards-wrapper">${e.map(s=>p.filterCard(s)).join("")}</div>`}updateFilterState(e,t){this.state.totalPages=e.totalPages,this.state.currentFilter=t}updateExercisesState(e,t){this.state.allExercises=e.results||[],this.state.totalPages=e.totalPages||1,this.state.selectedBodyPart=t,this.state.exercisesMap.clear(),this.state.allExercises.forEach(s=>{this.state.exercisesMap.set(s._id,s)})}filterExercises(e){return e?this.state.filteredExercises=this.state.allExercises.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())):this.state.filteredExercises=[...this.state.allExercises],this.state.filteredExercises}hideSearchAndBreadcrumb(){o.hide(this.elements.searchSection),o.hide(this.elements.breadcrumb)}showSearchAndBreadcrumb(e){o.show(this.elements.searchSection),o.show(this.elements.breadcrumb),this.elements.breadcrumb.textContent=`/ ${e.charAt(0).toUpperCase()+e.slice(1)}`}prepareContainer(){this.state.currentHeight===0&&(this.state.currentHeight=this.elements.musclesGrid.getBoundingClientRect().height||600),this.elements.musclesGrid.style.height=`${this.state.currentHeight}px`,o.setContent(this.elements.musclesGrid,p.loadingTemplate(this.state.currentHeight))}updateContainerWithAnimation(e){const t=o.measureContentHeight(e,this.elements.musclesGrid.offsetWidth);o.setContent(this.elements.musclesGrid,e),o.animateHeight(this.elements.musclesGrid,t),this.state.currentHeight=t}showError(e){o.setContent(this.elements.musclesGrid,p.errorTemplate(e))}showNoExercisesFound(e){const t=`No exercises found${e?` matching "${e}"`:""}.`,s=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;o.setContent(this.elements.musclesGrid,p.errorTemplate(t)+s)}handleTabSwitch(e){this.elements.tabs.forEach(i=>i.classList.remove("active")),e.classList.add("active"),this.state.reset(),this.clearSearchInput();const s={muscles:h.MUSCLES,"body-parts":h.BODY_PARTS,equipment:h.EQUIPMENT}[e.dataset.tab]||c.DEFAULT_FILTER;this.renderFilters(s,1)}handleSearchInput(e){const t=e.target.value.trim();this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.searchTimeout=setTimeout(()=>{this.performSearch(t)},c.SEARCH_DEBOUNCE_DELAY)}handleSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this.state.clearSearchTimeout(),this.performSearch(e.target.value.trim()))}handleSearchClear(e){e.preventDefault(),this.clearSearch()}performSearch(e){this.state.selectedBodyPart&&this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,e,1)}clearSearch(){this.elements.searchInput.value="",this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.selectedBodyPart&&this.performSearch("")}clearSearchInput(){this.elements.searchInput.value="",this.updateSearchClearButton()}updateSearchClearButton(){const e=this.elements.searchInput.value.trim().length>0;this.elements.searchClearBtn.style.display=e?"flex":"none"}handlePagination(e,t){const{page:s}=e.dataset;let i=this.state.currentPage;s==="prev"&&this.state.currentPage>1?i=this.state.currentPage-1:s==="next"&&this.state.currentPage<this.state.totalPages?i=this.state.currentPage+1:s&&!isNaN(s)&&(i=parseInt(s)),i!==this.state.currentPage&&(this.state.currentPage=i,t==="filters"?this.renderFilters(this.state.currentFilter,i):this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,"",i))}init(){this.elements&&this.renderFilters(c.DEFAULT_FILTER,1)}}function P(){new z().init()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",P):P();let w=document.getElementById("scrollTopButton");w&&(w.onclick=function(){X()});window.onscroll=function(){K()};function K(){document.body.scrollTop>20||document.documentElement.scrollTop>20?w.style.display="flex":w.style.display="none"}function X(){document.body.scroll({behavior:"smooth",top:0}),document.documentElement.scroll({behavior:"smooth",top:0})}const l=document.getElementById("mobile-menu-btn"),d=document.getElementById("mobile-menu-backdrop");document.getElementById("mobile-menu");const A=document.getElementById("mobile-menu-close-btn"),H=document.querySelectorAll(".mobile-nav-link"),O=document.body;function V(){d.classList.add("is-open"),l.classList.add("is-active"),l.setAttribute("aria-expanded","true"),l.setAttribute("aria-label","Close mobile menu"),O.style.overflow="hidden"}function v(){d.classList.remove("is-open"),l.classList.remove("is-active"),l.setAttribute("aria-expanded","false"),l.setAttribute("aria-label","Open mobile menu"),O.style.overflow=""}function Z(){d.classList.contains("is-open")?v():V()}l&&l.addEventListener("click",Z);A&&A.addEventListener("click",v);d&&d.addEventListener("click",a=>{a.target===d&&v()});H.forEach(a=>{a.addEventListener("click",v)});document.addEventListener("keydown",a=>{a.key==="Escape"&&d.classList.contains("is-open")&&v()});function ee(){const e=window.location.pathname.includes("favorites")?"favorites":"index.html";document.querySelectorAll(".nav-link").forEach(t=>{t.classList.toggle("selected",t.href.includes(e))}),H.forEach(t=>{t.classList.toggle("active",t.href.includes(e))})}document.addEventListener("DOMContentLoaded",ee);let N="",C=null;window.addEventListener("DOMContentLoaded",async()=>{try{C=await te(),_()}catch(a){console.error("Помилка ініціалізації:",a)}});window.addEventListener("resize",()=>{(window.innerWidth>=1440?"desktop":"mobile")!==N&&_()});async function te(){const a=localStorage.getItem("quoteData"),e=new Date().toISOString().slice(0,10);if(a){const i=JSON.parse(a);if(i.date===e)return i}const t=await x("quote"),s={date:e,author:t.author,quote:t.quote};return localStorage.setItem("quoteData",JSON.stringify(s)),s}function _(){const a=window.innerWidth>=1440;N=a?"desktop":"mobile";const e=document.querySelector(".js-quote-container");e&&e.remove();const t=document.querySelector(".favorites-section"),s=document.createElement("div");if(s.className="js-quote-container",t){s.innerHTML=se(C);const n=document.querySelector(".left-column");n&&n.prepend(s);return}s.innerHTML=ie(C);const i=document.querySelector(".exercises-sidebar"),r=document.querySelector(".exercises-page");a&&i?(i.innerHTML="",i.appendChild(s)):r&&(s.classList.add("container"),r.insertAdjacentElement("afterend",s))}function se(a){return`<div class="Fquote" id="quote">
  <div class="Fquote-cards-wrapper" id="quote-cards-wrapper">
    <div class="Fquote-card" id="quote-card">
      <div class="Fqoute-wrap" id="qoute-wrap">
        <div class="Ficon-wrap" id="icon-wrap">
          <svg class="Fquote-icon-run" width="20" height="20">
            <use href="./img/icons.svg#icon-run"></use>
          </svg>
        </div>
        <div class="Fquote-day-wrap" id="quote-day-wrap">
          <div class="Fquote-title" id="quote-title">
            <p class="Fquote-day-title" id="quote-day-title">Quote of the day</p>
            <svg width="20" height="20">
              <use href="./img/icons.svg#icon-quote"></use>
            </svg>
          </div>
          <p class="Fquote-day js-quote" id="quote-day">${a.quote}</p>
          <p class="Fqoute-author js-author" id="qoute-author">${a.author}</p>
        </div>
      </div>
    </div>
<div class="Fline">
    <div class="Fquote-news" id="quote-news">
      <div class="Fnews-title-wrap" id="news-title-wrap">
        <svg class="Ficon-news" width="32" height="32">
          <use href="./img/icons.svg#icon-dailynorm"></use>
        </svg>
        <div class="Fnews-title" id="news-title">
          <p class="Fnews-title-time" id="news-title-time">110 min</p>
          <p class="Fnews-title-norm" id="news-title-norm">Daily norm of sports</p>

        </div>
      </div>
    </div>

    <div class="Fquote-img-wrap" id="quote-img-wrap">
      <picture>
        <source
          media="(min-width: 1440px)"
          srcset="
            ./img/quote/quote-fav-desk@1x.webp,
            ./img/quote/quote-fav-desk@2x.webp 2x,
            ./img/quote/quote-fav-desk@3x.webp 3x
          "
        />
        <source
          media="(min-width: 768px)"
          srcset="
            ./img/quote/quote-fav-tab@1x.webp,
            ./img/quote/quote-fav-tab@2x.webp 2x,
            ./img/quote/quote-fav-tab@3x.webp 3x
          "
        />
        <img
          class="Fquote-img"
          id="quote-img"
          src="./img/quote/quote-fav-mob@1x.webp"
          srcset="
            ./img/quote/quote-fav-mob@2x.webp 2x,
            ./img/quote/quote-fav-mob@3x.webp 3x
          "
          alt="quote image"
        />
      </picture>
    </div>
    </div>
  </div>
</div>
`}function ie(a){return`
<div class="quote">
  <div class="quote-cards-wrapper">
    <div class="quote-card">
      <div class="qoute-wrap">
        <div class="icon-wrap">
          <svg class="quote-icon-run" width="20" height="20">
            <use href="./img/icons.svg#icon-run"></use>
          </svg>
        </div>
        <div class="quote-day-wrap">
          <div class="quote-title">
            <p class="quote-day-title">Quote of the day</p>
            <svg width="20" height="20">
              <use href="./img/icons.svg#icon-quote"></use>
            </svg>
          </div>
          <p class="quote-day js-quote">${a.quote}</p>
          <p class="qoute-author js-author">${a.author}</p>
        </div>
      </div>
    </div>
    <div class="quote-img-wrap">
      <picture>
        <source media="(min-width: 1440px)" srcset="
            ./img/quote/quote-home-desk.webp,
            ./img/quote/quote-home-desk@2x.webp 2x,
            ./img/quote/quote-home-desk@3x.webp 3x
          " />
        <source media="(min-width: 768px)" srcset="
            ./img/quote/quote-home-tab.webp,
            ./img/quote/quote-home-tab@2x.webp 2x,
            ./img/quote/quote-home-tab@3x.webp 3x
          " />
        <img
          class="quote-img"
          src="./img/quote/quote-home-mob@1x.webp"
          srcset="
            ./img/quote/quote-home-mob@2x.webp 2x,
            ./img/quote/quote-home-mob@3x.webp 3x
          "
          alt="quote image"
        />
      </picture>
    </div>
    <div class="quote-news">
      <div class="news-title-wrap">
        <svg class="icon-news" width="32" height="32">
          <use href="./img/icons.svg#icon-dailynorm"></use>
        </svg>
        <div class="news-title">
          <p class="news-title-time">110 min</p>
          <p class="news-title-norm">Daily norm of sports</p>
          <p class="news-recommends">
            The World Health Organization recommends at least 150 minutes of
            moderate-intensity aerobic physical activity throughout the week for
            adults aged 18-64. However, what happens if we adjust that number to
            110 minutes every day? While it might seem like a high number to
            hit, dedicating 110 minutes daily to sporting activities may offer
            unparalleled benefits to physical health, mental well-being, and
            overall quality of life.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
`}const U=document.getElementById("heroContainer"),g=document.getElementById("heroTags"),S=U?.querySelector(".hero-side"),L=U?.querySelector(".hero-bottom-image");function G(){!g||!S||!L||(window.innerWidth>=1440?S.contains(g)||S.appendChild(g):g.previousElementSibling!==L&&L.insertAdjacentElement("afterend",g))}function ae(a,e){let t=!1;return function(...s){t||(a.apply(this,s),t=!0,setTimeout(()=>{t=!1},e))}}G();window.addEventListener("resize",ae(G,200));document.addEventListener("DOMContentLoaded",()=>{re()});function re(){const a=JSON.parse(localStorage.getItem("favorites"))||[],e=document.getElementById("favoritesList");if(!e)return;const t=new R,s=new D({container:e,showRating:!1,showRemoveBtn:!0,onStartClick:i=>{const r=a.find(n=>(n._id||n.id)===i);r?t.showModal(r):console.error("Exercise not found in favorites for ID:",i)},onRemoveClick:i=>{ne(i,s)}});s.render(a)}function ne(a,e){let t=JSON.parse(localStorage.getItem("favorites"))||[];t=t.filter(s=>(s._id||s.id)!==a),localStorage.setItem("favorites",JSON.stringify(t)),e.removeExercise(a)}
//# sourceMappingURL=index-BP_aS-0_.js.map
