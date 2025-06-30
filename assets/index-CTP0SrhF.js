import{a as A,i as R}from"./vendor-2fZl6onH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();const W="https://your-energy.b.goit.study/api/";A.defaults.headers.post["Content-Type"]="application/json";function Q(i){R.show({title:"Error:",message:i||"Something went wrong",color:"red",position:"topRight"})}async function C(i,e,t){try{const s=`${W}${e}`,a=["get","delete"].includes(i)?{params:t}:t;return(await A[i](s,a)).data}catch(s){throw Q(s?.response?.data?.message||s.message),s}}const L=(i,e)=>C("get",i,e),Y=(i,e)=>C("post",i,e),z=(i,e)=>C("patch",i,e),x=document.getElementById("subscribe-form"),B=x?.querySelector(".form_input");x&&B&&x.addEventListener("submit",async function(i){i.preventDefault();const e=B.value.trim();await Y("subscription",{email:e})});const F=()=>{const i=localStorage.getItem("favorites");try{return i?JSON.parse(i):[]}catch(e){return console.error("Failed to parse favorites:",e),[]}};class J{constructor(e="#modal-root"){this.#n=e}#n;#i="";#s=!1;#t=0;#a="";#l="";get#e(){return document.querySelector(this.#n)}get#h(){return this.#e?.querySelector(".modal-backdrop")}get#m(){return this.#e?.querySelector("#menu-close-button")}get#d(){return this.#e?.querySelectorAll(".star-rating svg")}get#r(){return this.#e?.querySelector(".modal-rating-count")}get#o(){return this.#e?.querySelector("#send-rating-button")}get#c(){return this.#e?.querySelector("#rating-form")}get#p(){return this.#e?.querySelector("#email")}get#g(){return this.#e?.querySelector("#comment")}#v(){this.#i="",this.#t=0,this.#a="",this.#l="",this.#s=!1,this.#c&&this.#c.reset?.(),this.#r&&(this.#r.textContent="0.0"),this.#o&&this.#o.setAttribute("disabled","true")}#u(){return`
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
      </div>`}#y(){this.#e?.dispatchEvent(new CustomEvent("rating-modal:close",{bubbles:!0}))}#E=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#f=e=>{this.#d?.forEach((t,s)=>{t.classList.toggle("hovered",s<e),t.classList.toggle("selected",s<this.#t)})};#b(){if(!this.#o)return;const e=this.#a.trim()&&this.#l.trim()&&this.#t>0;this.#o.disabled=!e}#q=async e=>{e.preventDefault();const t=new FormData(e.target),s=t.get("email")?.trim(),a=t.get("comment")?.trim();try{await z(`exercises/${this.#i}/rating`,{rate:this.#t,email:s,review:a}),R.show({title:"Rating:",color:"green",position:"topRight",message:`You've given ${this.#t} stars!`}),this.hideModal()}catch{}};#S(){this.#d?.forEach((e,t)=>{e.addEventListener("mouseover",()=>this.#f(t+1)),e.addEventListener("mouseout",()=>this.#f(this.#t)),e.addEventListener("click",()=>{this.#t=t+1,this.#f(this.#t),this.#r&&(this.#r.textContent=this.#t.toFixed(1)),this.#b()})})}#w=e=>{e.key==="Escape"&&this.hideModal()};showModal(e){e&&(this.#i=e,this.#e.innerHTML=this.#u(),this.#h?.addEventListener("click",this.#E),this.#m?.addEventListener("click",this.hideModal),this.#c?.addEventListener("submit",this.#q),this.#p?.addEventListener("input",t=>{this.#a=t.target.value,this.#b()}),this.#g?.addEventListener("input",t=>{this.#l=t.target.value,this.#b()}),window.addEventListener("keydown",this.#w),document.body.style.overflow="hidden",this.#s=!0,this.#S())}hideModal=()=>{this.#s&&(window.removeEventListener("keydown",this.#w),document.body.style.overflow="visible",this.#e.innerHTML="",this.#y(),this.#v())}}class D{constructor(e="#modal-root"){this.#n=e,this.#t=new J(this.#n),this.#a.addEventListener("rating-modal:close",this.#v)}#n;#i=!1;#s={};#t=null;get#a(){return document.querySelector(this.#n)}get#l(){return document.querySelector(".modal-backdrop")}get#e(){return document.querySelector("#add-to-favorite-button")}get#h(){return document.querySelector("#give-a-rating-button")}get#m(){return document.querySelector("#menu-close-button")}#d(e){this.#s=e;const{target:t="N/A",bodyPart:s="N/A",equipment:a="N/A",gifUrl:n="",name:r="Unknown Exercise",description:y="No description available",rating:m=0,burnedCalories:E=0,time:f=0,popularity:b=0}=this.#s;return`<div class="modal-backdrop">
      <div class="modal-container">
        <svg id="menu-close-button" class="menu-close-button">
          <use href="./img/icons.svg#menu-close"></use>
        </svg>
        <div class="info-container">
          <img src="${n}" alt="exercise" class="modal-image" onerror="this.src='/src/img/no-image.webp'" />
          <div>
            <p class="modal-name">${r}</p>
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
                <p>${a}</p>
              </li>
              <li>
                <p>Popular</p>
                <p>${b}</p>
              </li>
              <li>
                <p>Burned Calories</p>
                <p>${E}${f?` / ${f} min`:""}</p>
              </li>
            </ul>
            <hr />
            <p class="modal-description">${y}</p>
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
    </div>`}#r=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#o=()=>{const e=F(),t=this.#s.name,s=e.findIndex(a=>a.name===t);s!==-1?e.splice(s,1):e.push(this.#s),localStorage.setItem("favorites",JSON.stringify(e)),this.#c()};#c=()=>{const e=this.#e;if(!e)return;const t=F().some(s=>s.name===this.#s.name);e.innerHTML=t?'Remove from favorites <svg><use href="./img/icons.svg#icon-trash"></use></svg>':'Add to favorites <svg><use href="./img/icons.svg#icon-heart"></use></svg>'};#p(e){const t=Math.floor(e),s=5-t;return`
    <ul class="modal-rating-stars">
      ${'<li><svg class="active"><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(t)}
      ${'<li><svg><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(s)}
    </ul>
  `}#g=()=>{this.hideModal(),this.#t.showModal(this.#s._id)};#v=()=>{this.showModal(this.#s)};#u=e=>{e.key==="Escape"&&this.hideModal()};showModal=e=>{if(!this.#i)try{this.#a.innerHTML=this.#d(e),this.#e?.addEventListener("click",this.#o),this.#l?.addEventListener("click",this.#r),this.#m?.addEventListener("click",this.hideModal),this.#h?.addEventListener("click",this.#g),window.addEventListener("keydown",this.#u),document.body.style.overflow="hidden",this.#c(),this.#i=!0}catch{this.#a.innerHTML=""}};hideModal=()=>{this.#i&&(window.removeEventListener("keydown",this.#u),document.body.style.overflow="visible",this.#a.innerHTML="",this.#i=!1)}}class H{constructor(e={}){this.container=e.container,this.showRating=e.showRating??!0,this.showRemoveBtn=e.showRemoveBtn??!1,this.onStartClick=e.onStartClick||(()=>{}),this.onRemoveClick=e.onRemoveClick||(()=>{}),this.customClass=e.customClass||""}generateExerciseCard(e){const t=this.showRating?`
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
      </p>`:'<div class="error">No exercises found.</div>'}attachEventListeners(){this.container.querySelectorAll(".start-btn").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const a=t.dataset.exerciseId;this.onStartClick(a)})}),this.showRemoveBtn&&this.container.querySelectorAll(".remove-btn").forEach(s=>{s.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=s.dataset.id;this.onRemoveClick(n)})})}removeExercise(e){const t=this.container.querySelector(`[data-exercise-id="${e}"]`);t&&(t.remove(),this.container.querySelectorAll(".exercise-item").length===0&&(this.container.innerHTML=this.getEmptyMessage()))}clear(){this.container&&(this.container.innerHTML="")}}function k(i,e){if(e<=1)return"";const t=[];return t.push(`
    <button class="page-btn nav-btn prev" ${i===1?"disabled":""} data-page="prev">
      <svg width="20" height="20">
        <use href="./img/icons.svg#icon-nav-arrow"></use>
      </svg>
    </button>
  `),t.push(K(i,e)),t.push(`
    <button class="page-btn nav-btn next" ${i===e?"disabled":""} data-page="next">
      <svg width="20" height="20">
        <use href="./img/icons.svg#icon-nav-arrow"></use>
      </svg>
    </button>
  `),`<div class="muscles-pagination">${t.join("")}</div>`}function K(i,e){const t=[];if(e<=5)for(let s=1;s<=e;s++)t.push(`<button class="page-btn ${s===i?"active":""}" data-page="${s}">${s}</button>`);else{t.push(`<button class="page-btn ${i===1?"active":""}" data-page="1">1</button>`),i>3&&t.push('<span class="page-dots">...</span>');const s=Math.max(2,i-1),a=Math.min(e-1,i+1);for(let n=s;n<=a;n++)n!==1&&n!==e&&t.push(`<button class="page-btn ${n===i?"active":""}" data-page="${n}">${n}</button>`);i<e-2&&t.push('<span class="page-dots">...</span>'),e>1&&t.push(`<button class="page-btn ${e===i?"active":""}" data-page="${e}">${e}</button>`)}return t.join("")}const c={FILTERS_PER_PAGE:12,EXERCISES_PER_PAGE:10,SEARCH_DEBOUNCE_DELAY:1e3,ANIMATION_DURATION:0,DEFAULT_FILTER:"Muscles"},u={musclesGrid:"#muscles-grid",tabs:".tab",searchSection:"#search-section",breadcrumb:"#breadcrumb",searchInput:".search-input",searchClearBtn:"#search-clear-btn"},h={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"};class X{constructor(){this.currentPage=1,this.totalPages=1,this.currentFilter=c.DEFAULT_FILTER,this.selectedBodyPart="",this.allExercises=[],this.filteredExercises=[],this.exercisesMap=new Map,this.currentHeight=0,this.searchTimeout=null}reset(){this.currentPage=1,this.totalPages=1,this.allExercises=[],this.filteredExercises=[],this.exercisesMap.clear(),this.selectedBodyPart="",this.clearSearchTimeout()}clearSearchTimeout(){this.searchTimeout&&(clearTimeout(this.searchTimeout),this.searchTimeout=null)}}class o{static getElementById(e){return document.getElementById(e.replace("#",""))}static querySelectorAll(e){return document.querySelectorAll(e)}static show(e){e.style.display="block"}static hide(e){e.style.display="none"}static setContent(e,t){e.innerHTML=t}static measureContentHeight(e,t){const s=document.createElement("div");Object.assign(s.style,{visibility:"hidden",position:"absolute",top:"-9999px",width:`${t}px`}),s.innerHTML=e,document.body.appendChild(s);const a=s.scrollHeight;return document.body.removeChild(s),a}static animateHeight(e,t,s=c.ANIMATION_DURATION){e.style.height=`${t}px`,setTimeout(()=>{e.style.height="auto"},s)}}class ${static async fetchFilters(e,t=1){return await L("filters",{filter:e,page:t,limit:c.FILTERS_PER_PAGE})}static async fetchExercises(e,t,s=1){const a={page:s,limit:c.EXERCISES_PER_PAGE};switch(t){case h.BODY_PARTS:a.bodypart=e;break;case h.MUSCLES:a.muscles=e;break;case h.EQUIPMENT:a.equipment=e;break}return await L("exercises",a)}}class p{static filterCard(e){return`
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
    `}}class V{constructor(){this.state=new X,this.elements=this.initializeElements(),this.modal=new D,this.exercisesList=null,this.elements&&this.setupEventListeners()}initializeElements(){const e={musclesGrid:o.getElementById(u.musclesGrid),tabs:o.querySelectorAll(u.tabs),searchSection:o.getElementById(u.searchSection),breadcrumb:o.getElementById(u.breadcrumb),searchClearBtn:o.getElementById(u.searchClearBtn)};return!e.musclesGrid||!e.searchSection?null:(e.searchInput=e.searchSection.querySelector(u.searchInput),e)}setupEventListeners(){this.setupTabListeners(),this.setupSearchListeners(),this.setupExerciseClickListeners()}setupTabListeners(){this.elements.tabs.forEach(e=>{e.addEventListener("click",()=>this.handleTabSwitch(e))})}setupSearchListeners(){this.elements.searchInput.addEventListener("input",e=>this.handleSearchInput(e)),this.elements.searchInput.addEventListener("keydown",e=>this.handleSearchKeydown(e)),this.elements.searchClearBtn.addEventListener("click",e=>this.handleSearchClear(e))}setupExerciseClickListeners(){this.elements.musclesGrid.addEventListener("click",e=>{const t=e.target.closest(".muscle-card");if(t){const n=t.dataset.filter,r=t.dataset.filterType;this.renderExercisesList(n,r,"",1);return}if(e.target.closest(".back-btn")){this.state.reset(),this.clearSearchInput(),this.renderFilters(this.state.currentFilter,1);return}const a=e.target.closest(".page-btn");if(a){this.handlePagination(a,this.state.selectedBodyPart?"exercises":"filters");return}})}async renderFilters(e=c.DEFAULT_FILTER,t=1){this.hideSearchAndBreadcrumb(),this.state.selectedBodyPart="",this.prepareContainer();try{const s=await $.fetchFilters(e,t);if(this.updateFilterState(s,e),!s.results.length){this.showError("No items found.");return}const a=this.buildFiltersContent(s.results),n=k(t,this.state.totalPages),r=p.contentWrapper(a,n);this.updateContainerWithAnimation(r)}catch{this.showError("Failed to load data.")}}async renderExercisesList(e,t,s="",a=1){this.showSearchAndBreadcrumb(e),s||this.clearSearchInput(),this.prepareContainer();try{const n=await $.fetchExercises(e,t,a);this.updateExercisesState(n,e);const r=this.filterExercises(s);if(r.length===0){this.showNoExercisesFound(s);return}const y=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`,m=s?"":k(a,this.state.totalPages),E=`
        <div class="content-wrapper">
          <div class="content-area">
            <div class="exercises-list-container"></div>
            ${y}
          </div>
          ${m?`<div class="pagination-area">${m}</div>`:""}
        </div>
      `;this.updateContainerWithAnimation(E);const f=this.elements.musclesGrid.querySelector(".exercises-list-container");this.exercisesList=new H({container:f,showRating:!0,showRemoveBtn:!1,onStartClick:b=>{const T=this.state.exercisesMap.get(b);T?this.modal.showModal(T):console.error("Exercise not found in exercisesMap for ID:",b)}}),this.exercisesList.render(r)}catch{this.showError("Failed to load exercises.")}}buildFiltersContent(e){return`<div class="muscles-cards-wrapper">${e.map(s=>p.filterCard(s)).join("")}</div>`}updateFilterState(e,t){this.state.totalPages=e.totalPages,this.state.currentFilter=t}updateExercisesState(e,t){this.state.allExercises=e.results||[],this.state.totalPages=e.totalPages||1,this.state.selectedBodyPart=t,this.state.exercisesMap.clear(),this.state.allExercises.forEach(s=>{this.state.exercisesMap.set(s._id,s)})}filterExercises(e){return e?this.state.filteredExercises=this.state.allExercises.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())):this.state.filteredExercises=[...this.state.allExercises],this.state.filteredExercises}hideSearchAndBreadcrumb(){o.hide(this.elements.searchSection),o.hide(this.elements.breadcrumb)}showSearchAndBreadcrumb(e){o.show(this.elements.searchSection),o.show(this.elements.breadcrumb),this.elements.breadcrumb.textContent=`/ ${e.charAt(0).toUpperCase()+e.slice(1)}`}prepareContainer(){this.state.currentHeight===0&&(this.state.currentHeight=this.elements.musclesGrid.getBoundingClientRect().height||600),this.elements.musclesGrid.style.height=`${this.state.currentHeight}px`,o.setContent(this.elements.musclesGrid,p.loadingTemplate(this.state.currentHeight))}updateContainerWithAnimation(e){const t=o.measureContentHeight(e,this.elements.musclesGrid.offsetWidth);o.setContent(this.elements.musclesGrid,e),o.animateHeight(this.elements.musclesGrid,t),this.state.currentHeight=t}showError(e){o.setContent(this.elements.musclesGrid,p.errorTemplate(e))}showNoExercisesFound(e){const t=`No exercises found${e?` matching "${e}"`:""}.`,s=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;o.setContent(this.elements.musclesGrid,p.errorTemplate(t)+s)}handleTabSwitch(e){this.elements.tabs.forEach(a=>a.classList.remove("active")),e.classList.add("active"),this.state.reset(),this.clearSearchInput();const s={muscles:h.MUSCLES,"body-parts":h.BODY_PARTS,equipment:h.EQUIPMENT}[e.dataset.tab]||c.DEFAULT_FILTER;this.renderFilters(s,1)}handleSearchInput(e){const t=e.target.value.trim();this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.searchTimeout=setTimeout(()=>{this.performSearch(t)},c.SEARCH_DEBOUNCE_DELAY)}handleSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this.state.clearSearchTimeout(),this.performSearch(e.target.value.trim()))}handleSearchClear(e){e.preventDefault(),this.clearSearch()}performSearch(e){this.state.selectedBodyPart&&this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,e,1)}clearSearch(){this.elements.searchInput.value="",this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.selectedBodyPart&&this.performSearch("")}clearSearchInput(){this.elements.searchInput.value="",this.updateSearchClearButton()}updateSearchClearButton(){const e=this.elements.searchInput.value.trim().length>0;this.elements.searchClearBtn.style.display=e?"flex":"none"}handlePagination(e,t){const{page:s}=e.dataset;let a=this.state.currentPage;s==="prev"&&this.state.currentPage>1?a=this.state.currentPage-1:s==="next"&&this.state.currentPage<this.state.totalPages?a=this.state.currentPage+1:s&&!isNaN(s)&&(a=parseInt(s)),a!==this.state.currentPage&&(this.state.currentPage=a,t==="filters"?this.renderFilters(this.state.currentFilter,a):this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,"",a))}init(){this.elements&&this.renderFilters(c.DEFAULT_FILTER,1)}}function I(){new V().init()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",I):I();let w=document.getElementById("scrollTopButton");w&&(w.onclick=function(){ee()});window.onscroll=function(){Z()};function Z(){document.body.scrollTop>20||document.documentElement.scrollTop>20?w.style.display="flex":w.style.display="none"}function ee(){document.body.scroll({behavior:"smooth",top:0}),document.documentElement.scroll({behavior:"smooth",top:0})}const l=document.getElementById("mobile-menu-btn"),d=document.getElementById("mobile-menu-backdrop");document.getElementById("mobile-menu");const P=document.getElementById("mobile-menu-close-btn"),O=document.querySelectorAll(".mobile-nav-link"),N=document.body;function te(){d.classList.add("is-open"),l.classList.add("is-active"),l.setAttribute("aria-expanded","true"),l.setAttribute("aria-label","Close mobile menu"),N.style.overflow="hidden"}function v(){d.classList.remove("is-open"),l.classList.remove("is-active"),l.setAttribute("aria-expanded","false"),l.setAttribute("aria-label","Open mobile menu"),N.style.overflow=""}function se(){d.classList.contains("is-open")?v():te()}l&&l.addEventListener("click",se);P&&P.addEventListener("click",v);d&&d.addEventListener("click",i=>{i.target===d&&v()});O.forEach(i=>{i.addEventListener("click",v)});document.addEventListener("keydown",i=>{i.key==="Escape"&&d.classList.contains("is-open")&&v()});function ie(){const e=window.location.pathname.includes("favorites")?"favorites":"index.html";document.querySelectorAll(".nav-link").forEach(t=>{t.classList.toggle("selected",t.href.includes(e))}),O.forEach(t=>{t.classList.toggle("active",t.href.includes(e))})}document.addEventListener("DOMContentLoaded",ie);let _="",M=null;window.addEventListener("DOMContentLoaded",async()=>{try{M=await ae(),U()}catch(i){console.error("Помилка ініціалізації:",i)}});window.addEventListener("resize",()=>{(window.innerWidth>=1440?"desktop":"mobile")!==_&&U()});async function ae(){const i=localStorage.getItem("quoteData"),e=new Date().toISOString().slice(0,10);if(i){const a=JSON.parse(i);if(a.date===e)return a}const t=await L("quote"),s={date:e,author:t.author,quote:t.quote};return localStorage.setItem("quoteData",JSON.stringify(s)),s}function U(){const i=window.innerWidth>=1440;_=i?"desktop":"mobile";const e=document.querySelector(".js-quote-container");e&&e.remove();const t=document.querySelector(".favorites-section"),s=document.createElement("div");if(s.className="js-quote-container",t){s.innerHTML=ne(M);const r=document.querySelector(".left-column");r&&r.prepend(s);return}s.innerHTML=re(M);const a=document.querySelector(".exercises-sidebar"),n=document.querySelector(".exercises-page");i&&a?(a.innerHTML="",a.appendChild(s)):n&&(s.classList.add("container"),n.insertAdjacentElement("afterend",s))}function ne(i){return`<div class="Fquote" id="quote">
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
          <p class="Fquote-day js-quote" id="quote-day">${i.quote}</p>
          <p class="Fqoute-author js-author" id="qoute-author">${i.author}</p>
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
`}function re(i){return`
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
          <p class="quote-day js-quote">${i.quote}</p>
          <p class="qoute-author js-author">${i.author}</p>
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
`}const G=document.getElementById("heroContainer"),g=document.getElementById("heroTags"),q=G?.querySelector(".hero-side"),S=G?.querySelector(".hero-bottom-image");function j(){!g||!q||!S||(window.innerWidth>=1440?q.contains(g)||q.appendChild(g):g.previousElementSibling!==S&&S.insertAdjacentElement("afterend",g))}function oe(i,e){let t=!1;return function(...s){t||(i.apply(this,s),t=!0,setTimeout(()=>{t=!1},e))}}j();window.addEventListener("resize",oe(j,200));document.addEventListener("DOMContentLoaded",()=>{ce()});function ce(){const i=JSON.parse(localStorage.getItem("favorites"))||[],e=document.getElementById("favoritesList");if(!e)return;const t=new D,s=new H({container:e,showRating:!1,showRemoveBtn:!0,onStartClick:a=>{const n=i.find(r=>(r._id||r.id)===a);n?t.showModal(n):console.error("Exercise not found in favorites for ID:",a)},onRemoveClick:a=>{le(a,s)}});s.render(i)}function le(i,e){let t=JSON.parse(localStorage.getItem("favorites"))||[];t=t.filter(s=>(s._id||s.id)!==i),localStorage.setItem("favorites",JSON.stringify(t)),e.removeExercise(i)}
//# sourceMappingURL=index-CTP0SrhF.js.map
