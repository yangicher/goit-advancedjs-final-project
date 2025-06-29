import{a as M}from"./vendor-DDD7fsZd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const P="https://your-energy.b.goit.study/api/";M.defaults.headers.post["Content-Type"]="application/json";const b=async(r,e)=>{try{return(await M.get(`${P}${r}`,{params:e})).data}catch(t){throw console.error("Error in get:",t),t}},_=async(r,e)=>{try{return(await M.patch(`${P}${r}`,e)).data}catch(t){throw console.error("Error in patch:",t),t}},T=()=>{const r=localStorage.getItem("favorites");try{return r?JSON.parse(r):[]}catch(e){return console.error("Failed to parse favorites:",e),[]}};class U{constructor(e="#modal-root"){this.#a=e}#a;#i="";#t=!1;#s=0;#r="";#l="";get#e(){return document.querySelector(this.#a)}get#u(){return this.#e?.querySelector(".modal-backdrop")}get#m(){return this.#e?.querySelector("#menu-close-button")}get#d(){return this.#e?.querySelectorAll(".star-rating svg")}get#n(){return this.#e?.querySelector(".modal-rating-count")}get#o(){return this.#e?.querySelector("#send-rating-button")}get#c(){return this.#e?.querySelector("#rating-form")}get#p(){return this.#e?.querySelector("#email")}get#g(){return this.#e?.querySelector("#comment")}#v(){this.#i="",this.#s=0,this.#r="",this.#l="",this.#t=!1,this.#c&&this.#c.reset?.(),this.#n&&(this.#n.textContent="0.0"),this.#o&&this.#o.setAttribute("disabled","true")}#h(){return`
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
      </div>`}#y(){this.#e?.dispatchEvent(new CustomEvent("rating-modal:close",{bubbles:!0}))}#S=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#f=e=>{this.#d?.forEach((t,s)=>{t.classList.toggle("hovered",s<e),t.classList.toggle("selected",s<this.#s)})};#E(){if(!this.#o)return;const e=this.#r.trim()&&this.#l.trim()&&this.#s>0;this.#o.disabled=!e}#w=async e=>{e.preventDefault();const t=new FormData(e.target),s=t.get("email")?.trim(),i=t.get("comment")?.trim();try{await _(`exercises/${this.#i}/rating`,{rate:this.#s,email:s,review:i}),this.hideModal()}catch(a){console.error("Rating submit failed:",a),alert("Failed to submit rating. Please try again later.")}};#L(){this.#d?.forEach((e,t)=>{e.addEventListener("mouseover",()=>this.#f(t+1)),e.addEventListener("mouseout",()=>this.#f(this.#s)),e.addEventListener("click",()=>{this.#s=t+1,this.#f(this.#s),this.#n&&(this.#n.textContent=this.#s.toFixed(1)),this.#E()})})}#b=e=>{e.key==="Escape"&&this.hideModal()};showModal(e){e&&(this.#i=e,this.#e.innerHTML=this.#h(),this.#u?.addEventListener("click",this.#S),this.#m?.addEventListener("click",this.hideModal),this.#c?.addEventListener("submit",this.#w),this.#p?.addEventListener("input",t=>{this.#r=t.target.value,this.#E()}),this.#g?.addEventListener("input",t=>{this.#l=t.target.value,this.#E()}),window.addEventListener("keydown",this.#b),document.body.style.overflow="hidden",this.#t=!0,this.#L())}hideModal=()=>{this.#t&&(window.removeEventListener("keydown",this.#b),document.body.style.overflow="visible",this.#e.innerHTML="",this.#y(),this.#v())}}class q{constructor(e="#modal-root"){this.#a=e,this.#s=new U(this.#a),this.#r.addEventListener("rating-modal:close",this.#v)}#a;#i=!1;#t={};#s=null;get#r(){return document.querySelector(this.#a)}get#l(){return document.querySelector(".modal-backdrop")}get#e(){return document.querySelector("#add-to-favorite-button")}get#u(){return document.querySelector("#give-a-rating-button")}get#m(){return document.querySelector("#menu-close-button")}#d(e){this.#t=e;const{target:t="N/A",bodyPart:s="N/A",equipment:i="N/A",gifUrl:a="",name:n="Unknown Exercise",description:S="No description available",rating:m=0,burnedCalories:w=0,time:E=0,popularity:p=0}=this.#t;return`<div class="modal-backdrop">
      <div class="modal-container">
        <svg id="menu-close-button" class="menu-close-button">
          <use href="./img/icons.svg#menu-close"></use>
        </svg>
        <div class="info-container">
          <img src="${a}" alt="exercise" class="modal-image" onerror="this.src='/src/img/no-image.webp'" />
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
                <p>${p}</p>
              </li>
              <li>
                <p>Burned Calories</p>
                <p>${w}${E?` / ${E} min`:""}</p>
              </li>
            </ul>
            <hr />
            <p class="modal-description">${S}</p>
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
    </div>`}#n=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#o=()=>{const e=T(),t=this.#t.name,s=e.findIndex(i=>i.name===t);s!==-1?e.splice(s,1):e.push(this.#t),localStorage.setItem("favorites",JSON.stringify(e)),this.#c()};#c=()=>{const e=this.#e;if(!e)return;const t=T().some(s=>s.name===this.#t.name);e.innerHTML=t?'Remove from favorites <svg><use href="./img/icons.svg#icon-trash"></use></svg>':'Add to favorites <svg><use href="./img/icons.svg#icon-heart"></use></svg>'};#p(e){const t=Math.floor(e),s=5-t;return`
    <ul class="modal-rating-stars">
      ${'<li><svg class="active"><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(t)}
      ${'<li><svg><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(s)}
    </ul>
  `}#g=()=>{this.hideModal(),this.#s.showModal(this.#t._id)};#v=()=>{this.showModal(this.#t)};#h=e=>{e.key==="Escape"&&this.hideModal()};showModal=e=>{if(!this.#i)try{this.#r.innerHTML=this.#d(e),this.#e?.addEventListener("click",this.#o),this.#l?.addEventListener("click",this.#n),this.#m?.addEventListener("click",this.hideModal),this.#u?.addEventListener("click",this.#g),window.addEventListener("keydown",this.#h),document.body.style.overflow="hidden",this.#c(),this.#i=!0}catch{this.#r.innerHTML=""}};hideModal=()=>{this.#i&&(window.removeEventListener("keydown",this.#h),document.body.style.overflow="visible",this.#r.innerHTML="",this.#i=!1)}}class R{constructor(e={}){this.container=e.container,this.showRating=e.showRating??!0,this.showRemoveBtn=e.showRemoveBtn??!1,this.onStartClick=e.onStartClick||(()=>{}),this.onRemoveClick=e.onRemoveClick||(()=>{}),this.customClass=e.customClass||""}generateExerciseCard(e){const t=this.showRating?`
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
            <div class="workout-badge">WORKOUT</div>
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
      </p>`:'<div class="error">No exercises found.</div>'}attachEventListeners(){const e=this.container.querySelectorAll(".start-btn");console.log("Found start buttons:",e.length),e.forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const i=t.dataset.exerciseId;console.log("Start button clicked, exercise ID:",i),this.onStartClick(i)})}),this.showRemoveBtn&&this.container.querySelectorAll(".remove-btn").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();const a=s.dataset.id;this.onRemoveClick(a)})})}removeExercise(e){const t=this.container.querySelector(`[data-exercise-id="${e}"]`);t&&(t.remove(),this.container.querySelectorAll(".exercise-item").length===0&&(this.container.innerHTML=this.getEmptyMessage()))}clear(){this.container&&(this.container.innerHTML="")}}function B(r,e){if(e<=1)return"";const t=[];return t.push(`
    <button class="page-btn nav-btn prev" ${r===1?"disabled":""} data-page="prev">
      <svg width="20" height="20">
        <use href="./img/icons.svg#icon-nav-arrow"></use>
      </svg>
    </button>
  `),t.push(G(r,e)),t.push(`
    <button class="page-btn nav-btn next" ${r===e?"disabled":""} data-page="next">
      <svg width="20" height="20">
        <use href="./img/icons.svg#icon-nav-arrow"></use>
      </svg>
    </button>
  `),`<div class="muscles-pagination">${t.join("")}</div>`}function G(r,e){const t=[];if(e<=5)for(let s=1;s<=e;s++)t.push(`<button class="page-btn ${s===r?"active":""}" data-page="${s}">${s}</button>`);else{t.push(`<button class="page-btn ${r===1?"active":""}" data-page="1">1</button>`),r>3&&t.push('<span class="page-dots">...</span>');const s=Math.max(2,r-1),i=Math.min(e-1,r+1);for(let a=s;a<=i;a++)a!==1&&a!==e&&t.push(`<button class="page-btn ${a===r?"active":""}" data-page="${a}">${a}</button>`);r<e-2&&t.push('<span class="page-dots">...</span>'),e>1&&t.push(`<button class="page-btn ${e===r?"active":""}" data-page="${e}">${e}</button>`)}return t.join("")}const c={FILTERS_PER_PAGE:12,EXERCISES_PER_PAGE:10,SEARCH_DEBOUNCE_DELAY:1e3,ANIMATION_DURATION:0,DEFAULT_FILTER:"Muscles"},h={musclesGrid:"#muscles-grid",tabs:".tab",searchSection:"#search-section",breadcrumb:"#breadcrumb",searchInput:".search-input",searchClearBtn:"#search-clear-btn"},u={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"};class j{constructor(){this.currentPage=1,this.totalPages=1,this.currentFilter=c.DEFAULT_FILTER,this.selectedBodyPart="",this.allExercises=[],this.filteredExercises=[],this.exercisesMap=new Map,this.currentHeight=0,this.searchTimeout=null}reset(){this.currentPage=1,this.totalPages=1,this.allExercises=[],this.filteredExercises=[],this.exercisesMap.clear(),this.selectedBodyPart="",this.clearSearchTimeout()}clearSearchTimeout(){this.searchTimeout&&(clearTimeout(this.searchTimeout),this.searchTimeout=null)}}class o{static getElementById(e){return document.getElementById(e.replace("#",""))}static querySelectorAll(e){return document.querySelectorAll(e)}static show(e){e.style.display="block"}static hide(e){e.style.display="none"}static setContent(e,t){e.innerHTML=t}static measureContentHeight(e,t){const s=document.createElement("div");Object.assign(s.style,{visibility:"hidden",position:"absolute",top:"-9999px",width:`${t}px`}),s.innerHTML=e,document.body.appendChild(s);const i=s.scrollHeight;return document.body.removeChild(s),i}static animateHeight(e,t,s=c.ANIMATION_DURATION){e.style.height=`${t}px`,setTimeout(()=>{e.style.height="auto"},s)}}class I{static async fetchFilters(e,t=1){return await b("filters",{filter:e,page:t,limit:c.FILTERS_PER_PAGE})}static async fetchExercises(e,t,s=1){const i={page:s,limit:c.EXERCISES_PER_PAGE};switch(t){case u.BODY_PARTS:i.bodypart=e;break;case u.MUSCLES:i.muscles=e;break;case u.EQUIPMENT:i.equipment=e;break}return await b("exercises",i)}}class g{static filterCard(e){return`
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
    `}}class J{constructor(){this.state=new j,this.elements=this.initializeElements(),this.modal=new q,this.exercisesList=null,this.elements&&this.setupEventListeners()}initializeElements(){const e={musclesGrid:o.getElementById(h.musclesGrid),tabs:o.querySelectorAll(h.tabs),searchSection:o.getElementById(h.searchSection),breadcrumb:o.getElementById(h.breadcrumb),searchClearBtn:o.getElementById(h.searchClearBtn)};return!e.musclesGrid||!e.searchSection?null:(e.searchInput=e.searchSection.querySelector(h.searchInput),e)}setupEventListeners(){this.setupTabListeners(),this.setupSearchListeners(),this.setupExerciseClickListeners()}setupTabListeners(){this.elements.tabs.forEach(e=>{e.addEventListener("click",()=>this.handleTabSwitch(e))})}setupSearchListeners(){this.elements.searchInput.addEventListener("input",e=>this.handleSearchInput(e)),this.elements.searchInput.addEventListener("keydown",e=>this.handleSearchKeydown(e)),this.elements.searchClearBtn.addEventListener("click",e=>this.handleSearchClear(e))}setupExerciseClickListeners(){this.elements.musclesGrid.addEventListener("click",e=>{const t=e.target.closest(".muscle-card");if(t){const a=t.dataset.filter,n=t.dataset.filterType;this.renderExercisesList(a,n,"",1);return}if(e.target.closest(".back-btn")){this.state.reset(),this.clearSearchInput(),this.renderFilters(this.state.currentFilter,1);return}const i=e.target.closest(".page-btn");if(i){this.handlePagination(i,this.state.selectedBodyPart?"exercises":"filters");return}})}async renderFilters(e=c.DEFAULT_FILTER,t=1){this.hideSearchAndBreadcrumb(),this.state.selectedBodyPart="",this.prepareContainer();try{const s=await I.fetchFilters(e,t);if(this.updateFilterState(s,e),!s.results.length){this.showError("No items found.");return}const i=this.buildFiltersContent(s.results),a=B(t,this.state.totalPages),n=g.contentWrapper(i,a);this.updateContainerWithAnimation(n)}catch{this.showError("Failed to load data.")}}async renderExercisesList(e,t,s="",i=1){this.showSearchAndBreadcrumb(e),s||this.clearSearchInput(),this.prepareContainer();try{const a=await I.fetchExercises(e,t,i);this.updateExercisesState(a,e);const n=this.filterExercises(s);if(n.length===0){this.showNoExercisesFound(s);return}const S=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`,m=s?"":B(i,this.state.totalPages),w=`
        <div class="content-wrapper">
          <div class="content-area">
            <div class="exercises-list-container"></div>
            ${S}
          </div>
          ${m?`<div class="pagination-area">${m}</div>`:""}
        </div>
      `;this.updateContainerWithAnimation(w);const E=this.elements.musclesGrid.querySelector(".exercises-list-container");this.exercisesList=new R({container:E,showRating:!0,showRemoveBtn:!1,onStartClick:p=>{console.log("onStartClick called with ID:",p);const L=this.state.exercisesMap.get(p);console.log("Exercise found:",L),L?this.modal.showModal(L):console.error("Exercise not found in exercisesMap for ID:",p)}}),this.exercisesList.render(n)}catch{this.showError("Failed to load exercises.")}}buildFiltersContent(e){return`<div class="muscles-cards-wrapper">${e.map(s=>g.filterCard(s)).join("")}</div>`}updateFilterState(e,t){this.state.totalPages=e.totalPages,this.state.currentFilter=t}updateExercisesState(e,t){this.state.allExercises=e.results||[],this.state.totalPages=e.totalPages||1,this.state.selectedBodyPart=t,this.state.exercisesMap.clear(),this.state.allExercises.forEach(s=>{this.state.exercisesMap.set(s._id,s)})}filterExercises(e){return e?this.state.filteredExercises=this.state.allExercises.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())):this.state.filteredExercises=[...this.state.allExercises],this.state.filteredExercises}hideSearchAndBreadcrumb(){o.hide(this.elements.searchSection),o.hide(this.elements.breadcrumb)}showSearchAndBreadcrumb(e){o.show(this.elements.searchSection),o.show(this.elements.breadcrumb),this.elements.breadcrumb.textContent=`/ ${e.charAt(0).toUpperCase()+e.slice(1)}`}prepareContainer(){this.state.currentHeight===0&&(this.state.currentHeight=this.elements.musclesGrid.getBoundingClientRect().height||600),this.elements.musclesGrid.style.height=`${this.state.currentHeight}px`,o.setContent(this.elements.musclesGrid,g.loadingTemplate(this.state.currentHeight))}updateContainerWithAnimation(e){const t=o.measureContentHeight(e,this.elements.musclesGrid.offsetWidth);o.setContent(this.elements.musclesGrid,e),o.animateHeight(this.elements.musclesGrid,t),this.state.currentHeight=t}showError(e){o.setContent(this.elements.musclesGrid,g.errorTemplate(e))}showNoExercisesFound(e){const t=`No exercises found${e?` matching "${e}"`:""}.`,s=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;o.setContent(this.elements.musclesGrid,g.errorTemplate(t)+s)}handleTabSwitch(e){this.elements.tabs.forEach(i=>i.classList.remove("active")),e.classList.add("active"),this.state.reset(),this.clearSearchInput();const s={muscles:u.MUSCLES,"body-parts":u.BODY_PARTS,equipment:u.EQUIPMENT}[e.dataset.tab]||c.DEFAULT_FILTER;this.renderFilters(s,1)}handleSearchInput(e){const t=e.target.value.trim();this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.searchTimeout=setTimeout(()=>{this.performSearch(t)},c.SEARCH_DEBOUNCE_DELAY)}handleSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this.state.clearSearchTimeout(),this.performSearch(e.target.value.trim()))}handleSearchClear(e){e.preventDefault(),this.clearSearch()}performSearch(e){this.state.selectedBodyPart&&this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,e,1)}clearSearch(){this.elements.searchInput.value="",this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.selectedBodyPart&&this.performSearch("")}clearSearchInput(){this.elements.searchInput.value="",this.updateSearchClearButton()}updateSearchClearButton(){const e=this.elements.searchInput.value.trim().length>0;this.elements.searchClearBtn.style.display=e?"flex":"none"}handlePagination(e,t){const{page:s}=e.dataset;let i=this.state.currentPage;s==="prev"&&this.state.currentPage>1?i=this.state.currentPage-1:s==="next"&&this.state.currentPage<this.state.totalPages?i=this.state.currentPage+1:s&&!isNaN(s)&&(i=parseInt(s)),i!==this.state.currentPage&&(this.state.currentPage=i,t==="filters"?this.renderFilters(this.state.currentFilter,i):this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,"",i))}init(){this.elements&&this.renderFilters(c.DEFAULT_FILTER,1)}}function $(){new J().init()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$):$();let y=document.getElementById("scrollTopButton");y&&(y.onclick=function(){Y()});window.onscroll=function(){W()};function W(){document.body.scrollTop>20||document.documentElement.scrollTop>20?y.style.display="flex":y.style.display="none"}function Y(){document.body.scroll({behavior:"smooth",top:0}),document.documentElement.scroll({behavior:"smooth",top:0})}const l=document.getElementById("mobile-menu-btn"),d=document.getElementById("mobile-menu-backdrop");document.getElementById("mobile-menu");const k=document.getElementById("mobile-menu-close-btn"),D=document.querySelectorAll(".mobile-nav-link"),H=document.body;function z(){d.classList.add("is-open"),l.classList.add("is-active"),l.setAttribute("aria-expanded","true"),l.setAttribute("aria-label","Close mobile menu"),H.style.overflow="hidden"}function f(){d.classList.remove("is-open"),l.classList.remove("is-active"),l.setAttribute("aria-expanded","false"),l.setAttribute("aria-label","Open mobile menu"),H.style.overflow=""}function K(){d.classList.contains("is-open")?f():z()}l&&l.addEventListener("click",K);k&&k.addEventListener("click",f);d&&d.addEventListener("click",r=>{r.target===d&&f()});D.forEach(r=>{r.addEventListener("click",f)});document.addEventListener("keydown",r=>{r.key==="Escape"&&d.classList.contains("is-open")&&f()});function Q(){const e=window.location.pathname.includes("favorites")?"favorites":"index.html";document.querySelectorAll(".nav-link").forEach(t=>{t.classList.toggle("selected",t.href.includes(e))}),D.forEach(t=>{t.classList.toggle("active",t.href.includes(e))})}document.addEventListener("DOMContentLoaded",Q);document.addEventListener("DOMContentLoaded",async()=>{await X()});async function X(){const r=localStorage.getItem("quoteData"),e=new Date().toISOString().slice(0,10);if(r){const i=JSON.parse(r);if(i.date===e){A(i);return}}const t=await b("quote"),s={date:e,author:t.author,quote:t.quote};localStorage.setItem("quoteData",JSON.stringify(s)),A(s)}function A(r){const e=document.querySelector(".js-quote"),t=document.querySelector(".js-author");!r||!e||!t||(e.textContent=r.quote,t.textContent=r.author)}const O=document.getElementById("heroContainer"),v=document.getElementById("heroTags"),x=O?.querySelector(".hero-side"),C=O?.querySelector(".hero-bottom-image");function N(){!v||!x||!C||(window.innerWidth>=1440?x.contains(v)||x.appendChild(v):v.previousElementSibling!==C&&C.insertAdjacentElement("afterend",v))}function Z(r,e){let t=!1;return function(...s){t||(r.apply(this,s),t=!0,setTimeout(()=>{t=!1},e))}}N();window.addEventListener("resize",Z(N,200));document.addEventListener("DOMContentLoaded",()=>{V(),te()});function V(){const r=JSON.parse(localStorage.getItem("favorites"))||[],e=document.getElementById("favoritesList");if(!e){console.error("Favorites list container not found");return}const t=new q,s=new R({container:e,showRating:!1,showRemoveBtn:!0,onStartClick:i=>{console.log("Favorites onStartClick called with ID:",i);const a=r.find(n=>(n._id||n.id)===i);console.log("Exercise found in favorites:",a),a?t.showModal(a):console.error("Exercise not found in favorites for ID:",i)},onRemoveClick:i=>{ee(i,s)}});s.render(r)}function ee(r,e){let t=JSON.parse(localStorage.getItem("favorites"))||[];t=t.filter(s=>(s._id||s.id)!==r),localStorage.setItem("favorites",JSON.stringify(t)),e.removeExercise(r)}async function te(){const r=localStorage.getItem("quoteData"),e=new Date().toISOString().slice(0,10);if(r){const t=JSON.parse(r);if(t.date===e){F(t);return}}try{const t=await b("quote"),s={date:e,author:t.author,quote:t.quote};localStorage.setItem("quoteData",JSON.stringify(s)),F(s)}catch(t){console.error("Не вдалося отримати цитату:",t)}}function F(r){const e=document.querySelector(".js-quote"),t=document.querySelector(".js-author");if(!r||!e||!t){console.warn("Не знайдено елементи для вставки цитати");return}e.textContent=r.quote,t.textContent=r.author}
//# sourceMappingURL=index-BmKG0AK8.js.map
