import{a as S}from"./assets/vendor-DDD7fsZd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const T="https://your-energy.b.goit.study/api/";S.defaults.headers.post["Content-Type"]="application/json";const E=async(a,e)=>{try{return(await S.get(`${T}${a}`,{params:e})).data}catch(t){throw console.error("Error in get:",t),t}},F=async(a,e)=>{try{return(await S.patch(`${T}${a}`,e)).data}catch(t){throw console.error("Error in patch:",t),t}},L=()=>{const a=localStorage.getItem("favorites");try{return a?JSON.parse(a):[]}catch(e){return console.error("Failed to parse favorites:",e),[]}};class q{constructor(e="#modal-root"){this.#r=e}#r;#i="";#t=!1;#s=0;#a="";#l="";get#e(){return document.querySelector(this.#r)}get#u(){return this.#e?.querySelector(".modal-backdrop")}get#m(){return this.#e?.querySelector("#menu-close-button")}get#d(){return this.#e?.querySelectorAll(".star-rating svg")}get#n(){return this.#e?.querySelector(".modal-rating-count")}get#o(){return this.#e?.querySelector("#send-rating-button")}get#c(){return this.#e?.querySelector("#rating-form")}get#p(){return this.#e?.querySelector("#email")}get#g(){return this.#e?.querySelector("#comment")}#v(){this.#i="",this.#s=0,this.#a="",this.#l="",this.#t=!1,this.#c&&this.#c.reset?.(),this.#n&&(this.#n.textContent="0.0"),this.#o&&this.#o.setAttribute("disabled","true")}#h(){return`
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
                <input required type="email" name="email" id="email" placeholder="Email" autocomplete="email" pattern="^w+(.w+)?@[a-zA-Z_]+?.[a-zA-Z]{2,3}$)" />
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
      </div>`}#y(){this.#e?.dispatchEvent(new CustomEvent("rating-modal:close",{bubbles:!0}))}#S=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#f=e=>{this.#d?.forEach((t,s)=>{t.classList.toggle("hovered",s<e),t.classList.toggle("selected",s<this.#s)})};#b(){if(!this.#o)return;const e=this.#a.trim()&&this.#l.trim()&&this.#s>0;this.#o.disabled=!e}#L=async e=>{e.preventDefault();const t=new FormData(e.target),s=t.get("email")?.trim(),i=t.get("comment")?.trim();try{await F(`exercises/${this.#i}/rating`,{rate:this.#s,email:s,review:i}),this.hideModal()}catch(r){console.error("Rating submit failed:",r),alert("Failed to submit rating. Please try again later.")}};#w(){this.#d?.forEach((e,t)=>{e.addEventListener("mouseover",()=>this.#f(t+1)),e.addEventListener("mouseout",()=>this.#f(this.#s)),e.addEventListener("click",()=>{this.#s=t+1,this.#f(this.#s),this.#n&&(this.#n.textContent=this.#s.toFixed(1)),this.#b()})})}#E=e=>{e.key==="Escape"&&this.hideModal()};showModal(e){e&&(this.#i=e,this.#e.innerHTML=this.#h(),this.#u?.addEventListener("click",this.#S),this.#m?.addEventListener("click",this.hideModal),this.#c?.addEventListener("submit",this.#L),this.#p?.addEventListener("input",t=>{this.#a=t.target.value,this.#b()}),this.#g?.addEventListener("input",t=>{this.#l=t.target.value,this.#b()}),window.addEventListener("keydown",this.#E),this.#t=!0,this.#w())}hideModal=()=>{this.#t&&(window.removeEventListener("keydown",this.#E),this.#e.innerHTML="",this.#y(),this.#v())}}class R{constructor(e="#modal-root"){this.#r=e,this.#s=new q(this.#r),this.#a.addEventListener("rating-modal:close",this.#v)}#r;#i=!1;#t={};#s=null;get#a(){return document.querySelector(this.#r)}get#l(){return document.querySelector(".modal-backdrop")}get#e(){return document.querySelector("#add-to-favorite-button")}get#u(){return document.querySelector("#give-a-rating-button")}get#m(){return document.querySelector("#menu-close-button")}#d(e){this.#t=e;const{target:t,bodyPart:s,equipment:i,gifUrl:r,name:n,description:l,rating:v,burnedCalories:b,time:A,popularity:P}=this.#t;return`<div class="modal-backdrop">
      <div class="modal-container">
        <svg id="menu-close-button" class="menu-close-button">
          <use href="./img/icons.svg#menu-close"></use>
        </svg>
        <div class="info-container">
          <img src="${r}" alt="exercise" class="modal-image" />
          <div>
            <p class="modal-name">${n}</p>
            <div class="modal-rating-info">
              <p class="modal-rating">${v}</p>
              ${this.#p(v)}
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
                <p>${P}</p>
              </li>
              <li>
                <p>Burned Calories</p>
                <p>${b} / ${A} min</p>
              </li>
            </ul>
            <hr />
            <p class="modal-description">${l}</p>
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
    </div>`}#n=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#o=()=>{const e=L(),t=this.#t.name,s=e.findIndex(i=>i.name===t);s!==-1?e.splice(s,1):e.push(this.#t),localStorage.setItem("favorites",JSON.stringify(e)),this.#c()};#c=()=>{const e=this.#e;if(!e)return;const t=L().some(s=>s.name===this.#t.name);e.innerHTML=t?'Remove from favorites <svg><use href="./img/icons.svg#icon-trash"></use></svg>':'Add to favorites <svg><use href="./img/icons.svg#icon-heart"></use></svg>'};#p(e){const t=Math.floor(e),s=5-t;return`
    <ul class="modal-rating-stars">
      ${'<li><svg class="active"><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(t)}
      ${'<li><svg><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(s)}
    </ul>
  `}#g=()=>{this.hideModal(),this.#s.showModal(this.#t._id)};#v=()=>{this.showModal(this.#t)};#h=e=>{e.key==="Escape"&&this.hideModal()};showModal=e=>{this.#i||(this.#a.innerHTML=this.#d(e),this.#e?.addEventListener("click",this.#o),this.#l?.addEventListener("click",this.#n),this.#m?.addEventListener("click",this.hideModal),this.#u?.addEventListener("click",this.#g),window.addEventListener("keydown",this.#h),this.#c(),this.#i=!0)};hideModal=()=>{this.#i&&(window.removeEventListener("keydown",this.#h),this.#a.innerHTML="",this.#i=!1)}}const d={FILTERS_PER_PAGE:12,EXERCISES_PER_PAGE:10,SEARCH_DEBOUNCE_DELAY:1e3,ANIMATION_DURATION:0,DEFAULT_FILTER:"Muscles"},m={musclesGrid:"#muscles-grid",tabs:".tab",searchSection:"#search-section",breadcrumb:"#breadcrumb",searchInput:".search-input",searchClearBtn:"#search-clear-btn"},p={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"};class D{constructor(){this.currentPage=1,this.totalPages=1,this.currentFilter=d.DEFAULT_FILTER,this.selectedBodyPart="",this.allExercises=[],this.filteredExercises=[],this.exercisesMap=new Map,this.currentHeight=0,this.searchTimeout=null}reset(){this.currentPage=1,this.totalPages=1,this.allExercises=[],this.filteredExercises=[],this.exercisesMap.clear(),this.selectedBodyPart="",this.clearSearchTimeout()}clearSearchTimeout(){this.searchTimeout&&(clearTimeout(this.searchTimeout),this.searchTimeout=null)}}class o{static getElementById(e){return document.getElementById(e.replace("#",""))}static querySelectorAll(e){return document.querySelectorAll(e)}static show(e){e.style.display="block"}static hide(e){e.style.display="none"}static setContent(e,t){e.innerHTML=t}static measureContentHeight(e,t){const s=document.createElement("div");Object.assign(s.style,{visibility:"hidden",position:"absolute",top:"-9999px",width:`${t}px`}),s.innerHTML=e,document.body.appendChild(s);const i=s.scrollHeight;return document.body.removeChild(s),i}static animateHeight(e,t,s=d.ANIMATION_DURATION){e.style.height=`${t}px`,setTimeout(()=>{e.style.height="auto"},s)}}class w{static async fetchFilters(e,t=1){return await E("filters",{filter:e,page:t,limit:d.FILTERS_PER_PAGE})}static async fetchExercises(e,t,s=1){const i={page:s,limit:d.EXERCISES_PER_PAGE};switch(t){case p.BODY_PARTS:i.bodypart=e;break;case p.MUSCLES:i.muscles=e;break;case p.EQUIPMENT:i.equipment=e;break}return await E("exercises",i)}}class c{static filterCard(e){return`
      <div class="muscle-card" data-filter="${e.name}" data-filter-type="${e.filter}">
        <img src="${e.imgURL}" alt="${e.name}" class="muscle-card-img" />
        <div class="muscle-card-label">
          <span class="muscle-card-title">${e.name}</span>
          <span class="muscle-card-subtitle">${e.filter}</span>
        </div>
      </div>
    `}static exerciseCard(e){return`
      <div class="exercise-item">
        <div class="exercise-top-row">
          <div class="workout-rating-left">
            <div class="workout-badge">WORKOUT</div>
            <div class="rating">
              ${e.rating} <span class="star">
                <svg width="14" height="14">
                  <use href="./img/icons.svg#icon-star-full"></use>
                </svg>
              </span>
            </div>
          </div>
          <button class="start-btn" data-exercise-id="${e._id}">Start <span class="arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" style="stroke: #242424;">
              <use href="./img/icons.svg#icon-arrow-start"></use>
            </svg>
          </span></button>
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
    `}static pagination(e,t){if(t<=1)return"";const s=[];return s.push(`
      <button class="page-btn nav-btn prev" ${e===1?"disabled":""} data-page="prev">
        <svg width="20" height="20">
          <use href="./img/icons.svg#icon-nav-arrow"></use>
        </svg>
      </button>
    `),s.push(c.generatePageNumbers(e,t)),s.push(`
      <button class="page-btn nav-btn next" ${e===t?"disabled":""} data-page="next">
        <svg width="20" height="20">
          <use href="./img/icons.svg#icon-nav-arrow"></use>
        </svg>
      </button>
    `),`<div class="muscles-pagination">${s.join("")}</div>`}static generatePageNumbers(e,t){const s=[];if(t<=5)for(let i=1;i<=t;i++)s.push(`<button class="page-btn ${i===e?"active":""}" data-page="${i}">${i}</button>`);else{s.push(`<button class="page-btn ${e===1?"active":""}" data-page="1">1</button>`),e>3&&s.push('<span class="page-dots">...</span>');const i=Math.max(2,e-1),r=Math.min(t-1,e+1);for(let n=i;n<=r;n++)n!==1&&n!==t&&s.push(`<button class="page-btn ${n===e?"active":""}" data-page="${n}">${n}</button>`);e<t-2&&s.push('<span class="page-dots">...</span>'),t>1&&s.push(`<button class="page-btn ${t===e?"active":""}" data-page="${t}">${t}</button>`)}return s.join("")}static loadingTemplate(e){return`<div class="loading" style="height: ${e-80}px;">Loading...</div>`}static errorTemplate(e){return`<div class="error">${e}</div>`}static contentWrapper(e,t=""){return`
      <div class="content-wrapper">
        <div class="content-area">${e}</div>
        ${t?`<div class="pagination-area">${t}</div>`:""}
      </div>
    `}}class H{constructor(){if(this.state=new D,this.elements=this.initializeElements(),this.modal=new R,!this.elements){console.error("Failed to initialize ExercisesManager: required DOM elements not found");return}this.setupEventListeners()}initializeElements(){const e={musclesGrid:o.getElementById(m.musclesGrid),tabs:o.querySelectorAll(m.tabs),searchSection:o.getElementById(m.searchSection),breadcrumb:o.getElementById(m.breadcrumb),searchClearBtn:o.getElementById(m.searchClearBtn)};return!e.musclesGrid||!e.searchSection?(console.error("Essential DOM elements not found for exercises functionality"),null):(e.searchInput=e.searchSection.querySelector(m.searchInput),e)}setupEventListeners(){this.setupTabListeners(),this.setupSearchListeners(),this.setupExerciseClickListeners()}setupTabListeners(){this.elements.tabs.forEach(e=>{e.addEventListener("click",()=>this.handleTabSwitch(e))})}setupSearchListeners(){this.elements.searchInput.addEventListener("input",e=>this.handleSearchInput(e)),this.elements.searchInput.addEventListener("keydown",e=>this.handleSearchKeydown(e)),this.elements.searchClearBtn.addEventListener("click",e=>this.handleSearchClear(e))}setupExerciseClickListeners(){this.elements.musclesGrid.addEventListener("click",e=>{const t=e.target.closest(".start-btn");if(t){const n=t.dataset.exerciseId,l=this.state.exercisesMap.get(n);l?this.modal.showModal(l):console.error(`Exercise with ID ${n} not found`);return}const s=e.target.closest(".muscle-card");if(s){const n=s.dataset.filter,l=s.dataset.filterType;this.renderExercisesList(n,l,"",1);return}if(e.target.closest(".back-btn")){this.state.reset(),this.clearSearchInput(),this.renderFilters(this.state.currentFilter,1);return}const r=e.target.closest(".page-btn");if(r){this.handlePagination(r,this.state.selectedBodyPart?"exercises":"filters");return}})}async renderFilters(e=d.DEFAULT_FILTER,t=1){this.hideSearchAndBreadcrumb(),this.state.selectedBodyPart="",this.prepareContainer();try{const s=await w.fetchFilters(e,t);if(this.updateFilterState(s,e),!s.results.length){this.showError("No items found.");return}const i=this.buildFiltersContent(s.results),r=c.pagination(t,this.state.totalPages),n=c.contentWrapper(i,r);this.updateContainerWithAnimation(n)}catch{this.showError("Failed to load data.")}}async renderExercisesList(e,t,s="",i=1){this.showSearchAndBreadcrumb(e),s||this.clearSearchInput(),this.prepareContainer();try{const r=await w.fetchExercises(e,t,i);this.updateExercisesState(r,e);const n=this.filterExercises(s);if(n.length===0){this.showNoExercisesFound(s);return}const l=this.buildExercisesContent(n,e),v=s?"":c.pagination(i,this.state.totalPages),b=c.contentWrapper(l,v);this.updateContainerWithAnimation(b)}catch{this.showError("Failed to load exercises.")}}buildFiltersContent(e){return`<div class="muscles-cards-wrapper">${e.map(s=>c.filterCard(s)).join("")}</div>`}buildExercisesContent(e,t){const s=e.map(r=>c.exerciseCard(r)).join(""),i=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;return`<div class="exercises-list">${s}</div>${i}`}updateFilterState(e,t){this.state.totalPages=e.totalPages,this.state.currentFilter=t}updateExercisesState(e,t){this.state.allExercises=e.results||[],this.state.totalPages=e.totalPages||1,this.state.selectedBodyPart=t,this.state.exercisesMap.clear(),this.state.allExercises.forEach(s=>{this.state.exercisesMap.set(s._id,s)})}filterExercises(e){return e?this.state.filteredExercises=this.state.allExercises.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())):this.state.filteredExercises=[...this.state.allExercises],this.state.filteredExercises}hideSearchAndBreadcrumb(){o.hide(this.elements.searchSection),o.hide(this.elements.breadcrumb)}showSearchAndBreadcrumb(e){o.show(this.elements.searchSection),o.show(this.elements.breadcrumb),this.elements.breadcrumb.textContent=`/ ${e.charAt(0).toUpperCase()+e.slice(1)}`}prepareContainer(){this.state.currentHeight===0&&(this.state.currentHeight=this.elements.musclesGrid.getBoundingClientRect().height||600),this.elements.musclesGrid.style.height=`${this.state.currentHeight}px`,o.setContent(this.elements.musclesGrid,c.loadingTemplate(this.state.currentHeight))}updateContainerWithAnimation(e){const t=o.measureContentHeight(e,this.elements.musclesGrid.offsetWidth);o.setContent(this.elements.musclesGrid,e),o.animateHeight(this.elements.musclesGrid,t),this.state.currentHeight=t}showError(e){o.setContent(this.elements.musclesGrid,c.errorTemplate(e))}showNoExercisesFound(e){const t=`No exercises found${e?` matching "${e}"`:""}.`,s=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;o.setContent(this.elements.musclesGrid,c.errorTemplate(t)+s)}handleTabSwitch(e){this.elements.tabs.forEach(i=>i.classList.remove("active")),e.classList.add("active"),this.state.reset(),this.clearSearchInput();const s={muscles:p.MUSCLES,"body-parts":p.BODY_PARTS,equipment:p.EQUIPMENT}[e.dataset.tab]||d.DEFAULT_FILTER;this.renderFilters(s,1)}handleSearchInput(e){const t=e.target.value.trim();this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.searchTimeout=setTimeout(()=>{this.performSearch(t)},d.SEARCH_DEBOUNCE_DELAY)}handleSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this.state.clearSearchTimeout(),this.performSearch(e.target.value.trim()))}handleSearchClear(e){e.preventDefault(),this.clearSearch()}performSearch(e){this.state.selectedBodyPart&&this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,e,1)}clearSearch(){this.elements.searchInput.value="",this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.selectedBodyPart&&this.performSearch("")}clearSearchInput(){this.elements.searchInput.value="",this.updateSearchClearButton()}updateSearchClearButton(){const e=this.elements.searchInput.value.trim().length>0;this.elements.searchClearBtn.style.display=e?"flex":"none"}handlePagination(e,t){const{page:s}=e.dataset;let i=this.state.currentPage;s==="prev"&&this.state.currentPage>1?i=this.state.currentPage-1:s==="next"&&this.state.currentPage<this.state.totalPages?i=this.state.currentPage+1:s&&!isNaN(s)&&(i=parseInt(s)),i!==this.state.currentPage&&(this.state.currentPage=i,t==="filters"?this.renderFilters(this.state.currentFilter,i):this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,"",i))}init(){this.elements&&this.renderFilters(d.DEFAULT_FILTER,1)}}function x(){new H().init()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",x):x();let f=document.getElementById("scrollTopButton");f&&(f.onclick=function(){N()});window.onscroll=function(){O()};function O(){document.body.scrollTop>20||document.documentElement.scrollTop>20?f.style.display="flex":f.style.display="none"}function N(){document.body.scroll({behavior:"smooth",top:0}),document.documentElement.scroll({behavior:"smooth",top:0})}const _=document.querySelector(".nav-items"),B=document.querySelectorAll(".nav-link");var y=sessionStorage.getItem("childSelected");y===null&&(y=0);B[y].classList.add("selected");_.addEventListener("click",function(a){const e=a.target;e.classList.contains("selected")||e.localName!="a"||(B.forEach(t=>{t.classList.remove("selected")}),e.classList.add("selected"),sessionStorage.setItem("childSelected",Array.from(e.parentNode.parentNode.children).indexOf(e.parentNode)))});const h=document.getElementById("mobile-menu-btn"),u=document.getElementById("mobile-menu-backdrop");document.getElementById("mobile-menu");const M=document.getElementById("mobile-menu-close-btn"),I=document.querySelectorAll(".mobile-nav-link"),$=document.body;function U(){u.classList.add("is-open"),h.classList.add("is-active"),h.setAttribute("aria-expanded","true"),h.setAttribute("aria-label","Close mobile menu"),$.style.overflow="hidden"}function g(){u.classList.remove("is-open"),h.classList.remove("is-active"),h.setAttribute("aria-expanded","false"),h.setAttribute("aria-label","Open mobile menu"),$.style.overflow=""}function G(){u.classList.contains("is-open")?g():U()}h&&h.addEventListener("click",G);M&&M.addEventListener("click",g);u&&u.addEventListener("click",a=>{a.target===u&&g()});I.forEach(a=>{a.addEventListener("click",g)});document.addEventListener("keydown",a=>{a.key==="Escape"&&u.classList.contains("is-open")&&g()});function k(){const a=window.location.hash||"#";document.querySelectorAll(".nav-link").forEach(t=>{const s=t.getAttribute("href"),i=t.closest(".nav-item");i&&(s===a||a==="#"&&s==="./#"?i.classList.add("selected"):i.classList.remove("selected"))}),I.forEach(t=>{const s=t.getAttribute("href");s===a||a==="#"&&s==="./#"?t.classList.add("active"):t.classList.remove("active")})}window.addEventListener("load",k);window.addEventListener("hashchange",k);document.addEventListener("DOMContentLoaded",async()=>{await j()});async function j(){const a=localStorage.getItem("quoteData"),e=new Date().toISOString().slice(0,10);if(a){const i=JSON.parse(a);if(i.date===e){C(i);return}}const t=await E("quote"),s={date:e,author:t.author,quote:t.quote};localStorage.setItem("quoteData",JSON.stringify(s)),C(s)}function C(a){const e=document.querySelector(".js-quote"),t=document.querySelector(".js-author");!a||!e||!t||(e.textContent=a.quote,t.textContent=a.author)}
//# sourceMappingURL=commonHelpers.js.map
