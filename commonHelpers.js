import{a as L}from"./assets/vendor-DDD7fsZd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const T="https://your-energy.b.goit.study/api/";L.defaults.headers.post["Content-Type"]="application/json";const E=async(a,e)=>{try{return(await L.get(`${T}${a}`,{params:e})).data}catch(t){throw console.error("Error in get:",t),t}},F=async(a,e)=>{try{return(await L.patch(`${T}${a}`,e)).data}catch(t){throw console.error("Error in patch:",t),t}},l={FILTERS_PER_PAGE:12,EXERCISES_PER_PAGE:10,SEARCH_DEBOUNCE_DELAY:1e3,ANIMATION_DURATION:0,DEFAULT_FILTER:"Muscles"},u={musclesGrid:"#muscles-grid",tabs:".tab",searchSection:"#search-section",breadcrumb:"#breadcrumb",searchInput:".search-input",searchClearBtn:"#search-clear-btn"},m={MUSCLES:"Muscles",BODY_PARTS:"Body parts",EQUIPMENT:"Equipment"};class q{constructor(){this.currentPage=1,this.totalPages=1,this.currentFilter=l.DEFAULT_FILTER,this.selectedBodyPart="",this.allExercises=[],this.filteredExercises=[],this.currentHeight=0,this.searchTimeout=null}reset(){this.currentPage=1,this.totalPages=1,this.allExercises=[],this.filteredExercises=[],this.selectedBodyPart="",this.clearSearchTimeout()}clearSearchTimeout(){this.searchTimeout&&(clearTimeout(this.searchTimeout),this.searchTimeout=null)}}class o{static getElementById(e){return document.getElementById(e.replace("#",""))}static querySelectorAll(e){return document.querySelectorAll(e)}static show(e){e.style.display="block"}static hide(e){e.style.display="none"}static setContent(e,t){e.innerHTML=t}static measureContentHeight(e,t){const s=document.createElement("div");Object.assign(s.style,{visibility:"hidden",position:"absolute",top:"-9999px",width:`${t}px`}),s.innerHTML=e,document.body.appendChild(s);const i=s.scrollHeight;return document.body.removeChild(s),i}static animateHeight(e,t,s=l.ANIMATION_DURATION){e.style.height=`${t}px`,setTimeout(()=>{e.style.height="auto"},s)}}class S{static async fetchFilters(e,t=1){return await E("filters",{filter:e,page:t,limit:l.FILTERS_PER_PAGE})}static async fetchExercises(e,t,s=1){const i={page:s,limit:l.EXERCISES_PER_PAGE};switch(t){case m.BODY_PARTS:i.bodypart=e;break;case m.MUSCLES:i.muscles=e;break;case m.EQUIPMENT:i.equipment=e;break}return await E("exercises",i)}}class c{static filterCard(e){return`
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
          <button class="start-btn">Start <span class="arrow">
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
    `}}class R{constructor(){if(this.state=new q,this.elements=this.initializeElements(),!this.elements){console.error("Failed to initialize ExercisesManager: required DOM elements not found");return}this.setupEventListeners()}initializeElements(){const e={musclesGrid:o.getElementById(u.musclesGrid),tabs:o.querySelectorAll(u.tabs),searchSection:o.getElementById(u.searchSection),breadcrumb:o.getElementById(u.breadcrumb),searchClearBtn:o.getElementById(u.searchClearBtn)};return!e.musclesGrid||!e.searchSection?(console.error("Essential DOM elements not found for exercises functionality"),null):(e.searchInput=e.searchSection.querySelector(u.searchInput),e)}setupEventListeners(){this.setupTabListeners(),this.setupSearchListeners()}setupTabListeners(){this.elements.tabs.forEach(e=>{e.addEventListener("click",()=>this.handleTabSwitch(e))})}setupSearchListeners(){this.elements.searchInput.addEventListener("input",e=>this.handleSearchInput(e)),this.elements.searchInput.addEventListener("keydown",e=>this.handleSearchKeydown(e)),this.elements.searchClearBtn.addEventListener("click",e=>this.handleSearchClear(e))}async renderFilters(e=l.DEFAULT_FILTER,t=1){this.hideSearchAndBreadcrumb(),this.state.selectedBodyPart="",this.prepareContainer();try{const s=await S.fetchFilters(e,t);if(this.updateFilterState(s,e),!s.results.length){this.showError("No items found.");return}const i=this.buildFiltersContent(s.results),r=c.pagination(t,this.state.totalPages),n=c.contentWrapper(i,r);this.updateContainerWithAnimation(n),this.attachFilterEventListeners()}catch{this.showError("Failed to load data.")}}async renderExercisesList(e,t,s="",i=1){this.showSearchAndBreadcrumb(e),s||this.clearSearchInput(),this.prepareContainer();try{const r=await S.fetchExercises(e,t,i);this.updateExercisesState(r,e);const n=this.filterExercises(s);if(n.length===0){this.showNoExercisesFound(s);return}const f=this.buildExercisesContent(n,e),g=s?"":c.pagination(i,this.state.totalPages),b=c.contentWrapper(f,g);this.updateContainerWithAnimation(b),this.attachExercisesEventListeners(s)}catch{this.showError("Failed to load exercises.")}}buildFiltersContent(e){return`<div class="muscles-cards-wrapper">${e.map(s=>c.filterCard(s)).join("")}</div>`}buildExercisesContent(e,t){const s=e.map(r=>c.exerciseCard(r)).join(""),i=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;return`<div class="exercises-list">${s}</div>${i}`}updateFilterState(e,t){this.state.totalPages=e.totalPages,this.state.currentFilter=t}updateExercisesState(e,t){this.state.allExercises=e.results||[],this.state.totalPages=e.totalPages||1,this.state.selectedBodyPart=t}filterExercises(e){return e?this.state.filteredExercises=this.state.allExercises.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())):this.state.filteredExercises=[...this.state.allExercises],this.state.filteredExercises}hideSearchAndBreadcrumb(){o.hide(this.elements.searchSection),o.hide(this.elements.breadcrumb)}showSearchAndBreadcrumb(e){o.show(this.elements.searchSection),o.show(this.elements.breadcrumb),this.elements.breadcrumb.textContent=`/ ${e.charAt(0).toUpperCase()+e.slice(1)}`}prepareContainer(){this.state.currentHeight===0&&(this.state.currentHeight=this.elements.musclesGrid.getBoundingClientRect().height||600),this.elements.musclesGrid.style.height=`${this.state.currentHeight}px`,o.setContent(this.elements.musclesGrid,c.loadingTemplate(this.state.currentHeight))}updateContainerWithAnimation(e){const t=o.measureContentHeight(e,this.elements.musclesGrid.offsetWidth);o.setContent(this.elements.musclesGrid,e),o.animateHeight(this.elements.musclesGrid,t),this.state.currentHeight=t}showError(e){o.setContent(this.elements.musclesGrid,c.errorTemplate(e))}showNoExercisesFound(e){const t=`No exercises found${e?` matching "${e}"`:""}.`,s=`<button class="back-btn"><span class="arrow">←</span> Back to ${this.state.currentFilter}</button>`;o.setContent(this.elements.musclesGrid,c.errorTemplate(t)+s),this.attachBackButtonListener()}handleTabSwitch(e){this.elements.tabs.forEach(i=>i.classList.remove("active")),e.classList.add("active"),this.state.reset(),this.clearSearchInput();const s={muscles:m.MUSCLES,"body-parts":m.BODY_PARTS,equipment:m.EQUIPMENT}[e.dataset.tab]||l.DEFAULT_FILTER;this.renderFilters(s,1)}handleSearchInput(e){const t=e.target.value.trim();this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.searchTimeout=setTimeout(()=>{this.performSearch(t)},l.SEARCH_DEBOUNCE_DELAY)}handleSearchKeydown(e){e.key==="Enter"&&(e.preventDefault(),this.state.clearSearchTimeout(),this.performSearch(e.target.value.trim()))}handleSearchClear(e){e.preventDefault(),this.clearSearch()}performSearch(e){this.state.selectedBodyPart&&this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,e,1)}clearSearch(){this.elements.searchInput.value="",this.updateSearchClearButton(),this.state.clearSearchTimeout(),this.state.selectedBodyPart&&this.performSearch("")}clearSearchInput(){this.elements.searchInput.value="",this.updateSearchClearButton()}updateSearchClearButton(){const e=this.elements.searchInput.value.trim().length>0;this.elements.searchClearBtn.style.display=e?"flex":"none"}attachFilterEventListeners(){this.attachFilterCardListeners(),this.attachPaginationListeners("filters")}attachExercisesEventListeners(e){this.attachBackButtonListener(),e||this.attachPaginationListeners("exercises")}attachFilterCardListeners(){this.elements.musclesGrid.querySelectorAll(".muscle-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.filter,s=e.dataset.filterType;this.renderExercisesList(t,s,"",1)})})}attachBackButtonListener(){const e=this.elements.musclesGrid.querySelector(".back-btn");e&&e.addEventListener("click",()=>{this.state.reset(),this.clearSearchInput(),this.renderFilters(this.state.currentFilter,1)})}attachPaginationListeners(e){this.elements.musclesGrid.querySelectorAll(".page-btn").forEach(t=>{t.addEventListener("click",()=>this.handlePagination(t,e))})}handlePagination(e,t){const{page:s}=e.dataset;let i=this.state.currentPage;s==="prev"&&this.state.currentPage>1?i=this.state.currentPage-1:s==="next"&&this.state.currentPage<this.state.totalPages?i=this.state.currentPage+1:s&&!isNaN(s)&&(i=parseInt(s)),i!==this.state.currentPage&&(this.state.currentPage=i,t==="filters"?this.renderFilters(this.state.currentFilter,i):this.renderExercisesList(this.state.selectedBodyPart,this.state.currentFilter,"",i))}init(){this.elements&&this.renderFilters(l.DEFAULT_FILTER,1)}}function w(){new R().init()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",w):w();let v=document.getElementById("scrollTopButton");v&&(v.onclick=function(){D()});window.onscroll=function(){H()};function H(){document.body.scrollTop>20||document.documentElement.scrollTop>20?v.style.display="block":v.style.display="none"}function D(){document.body.scrollTop=0,document.documentElement.scrollTop=0}const O=document.querySelector(".nav-items"),B=document.querySelectorAll(".nav-link");var y=sessionStorage.getItem("childSelected");y===null&&(y=0);B[y].classList.add("selected");O.addEventListener("click",function(a){const e=a.target;e.classList.contains("selected")||e.localName!="a"||(B.forEach(t=>{t.classList.remove("selected")}),e.classList.add("selected"),sessionStorage.setItem("childSelected",Array.from(e.parentNode.parentNode.children).indexOf(e.parentNode)))});const d=document.getElementById("mobile-menu-btn"),h=document.getElementById("mobile-menu-backdrop");document.getElementById("mobile-menu");const x=document.getElementById("mobile-menu-close-btn"),k=document.querySelectorAll(".mobile-nav-link"),I=document.body;function N(){h.classList.add("is-open"),d.classList.add("is-active"),d.setAttribute("aria-expanded","true"),d.setAttribute("aria-label","Close mobile menu"),I.style.overflow="hidden"}function p(){h.classList.remove("is-open"),d.classList.remove("is-active"),d.setAttribute("aria-expanded","false"),d.setAttribute("aria-label","Open mobile menu"),I.style.overflow=""}function _(){h.classList.contains("is-open")?p():N()}d&&d.addEventListener("click",_);x&&x.addEventListener("click",p);h&&h.addEventListener("click",a=>{a.target===h&&p()});k.forEach(a=>{a.addEventListener("click",p)});document.addEventListener("keydown",a=>{a.key==="Escape"&&h.classList.contains("is-open")&&p()});function $(){const a=window.location.hash||"#";document.querySelectorAll(".nav-link").forEach(t=>{const s=t.getAttribute("href"),i=t.closest(".nav-item");i&&(s===a||a==="#"&&s==="./#"?i.classList.add("selected"):i.classList.remove("selected"))}),k.forEach(t=>{const s=t.getAttribute("href");s===a||a==="#"&&s==="./#"?t.classList.add("active"):t.classList.remove("active")})}window.addEventListener("load",$);window.addEventListener("hashchange",$);document.addEventListener("DOMContentLoaded",async()=>{await U()});async function U(){const a=localStorage.getItem("quoteData"),e=new Date().toISOString().slice(0,10);if(a){const i=JSON.parse(a);if(i.date===e){C(i);return}}const t=await E("quote"),s={date:e,author:t.author,quote:t.quote};localStorage.setItem("quoteData",JSON.stringify(s)),C(s)}function C(a){const e=document.querySelector(".js-quote"),t=document.querySelector(".js-author");!a||!e||!t||(e.textContent=a.quote,t.textContent=a.author)}const M=()=>{const a=localStorage.getItem("favorites");try{return a?JSON.parse(a):[]}catch(e){return console.error("Failed to parse favorites:",e),[]}};class G{constructor(e="#modal-root"){this.#r=e}#r;#i="";#t=!1;#s=0;#a="";#l="";get#e(){return document.querySelector(this.#r)}get#u(){return this.#e?.querySelector(".modal-backdrop")}get#m(){return this.#e?.querySelector("#menu-close-button")}get#d(){return this.#e?.querySelectorAll(".star-rating svg")}get#n(){return this.#e?.querySelector(".modal-rating-count")}get#o(){return this.#e?.querySelector("#send-rating-button")}get#c(){return this.#e?.querySelector("#rating-form")}get#p(){return this.#e?.querySelector("#email")}get#g(){return this.#e?.querySelector("#comment")}#v(){this.#i="",this.#s=0,this.#a="",this.#l="",this.#t=!1,this.#c&&this.#c.reset?.(),this.#n&&(this.#n.textContent="0.0"),this.#o&&this.#o.setAttribute("disabled","true")}#h(){return`
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
      </div>`}#y(){this.#e?.dispatchEvent(new CustomEvent("rating-modal:close",{bubbles:!0}))}#L=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#f=e=>{this.#d?.forEach((t,s)=>{t.classList.toggle("hovered",s<e),t.classList.toggle("selected",s<this.#s)})};#b(){if(!this.#o)return;const e=this.#a.trim()&&this.#l.trim()&&this.#s>0;this.#o.disabled=!e}#S=async e=>{e.preventDefault();const t=new FormData(e.target),s=t.get("email")?.trim(),i=t.get("comment")?.trim();try{await F(`exercises/${this.#i}/rating`,{rate:this.#s,email:s,review:i}),this.hideModal()}catch(r){console.error("Rating submit failed:",r),alert("Failed to submit rating. Please try again later.")}};#w(){this.#d?.forEach((e,t)=>{e.addEventListener("mouseover",()=>this.#f(t+1)),e.addEventListener("mouseout",()=>this.#f(this.#s)),e.addEventListener("click",()=>{this.#s=t+1,this.#f(this.#s),this.#n&&(this.#n.textContent=this.#s.toFixed(1)),this.#b()})})}#E=e=>{e.key==="Escape"&&this.hideModal()};showModal(e){e&&(this.#i=e,this.#e.innerHTML=this.#h(),this.#u?.addEventListener("click",this.#L),this.#m?.addEventListener("click",this.hideModal),this.#c?.addEventListener("submit",this.#S),this.#p?.addEventListener("input",t=>{this.#a=t.target.value,this.#b()}),this.#g?.addEventListener("input",t=>{this.#l=t.target.value,this.#b()}),window.addEventListener("keydown",this.#E),this.#t=!0,this.#w())}hideModal=()=>{this.#t&&(window.removeEventListener("keydown",this.#E),this.#e.innerHTML="",this.#y(),this.#v())}}class j{constructor(e="#modal-root"){this.#r=e,this.#s=new G(this.#r),this.#a.addEventListener("rating-modal:close",this.#v)}#r;#i=!1;#t={};#s=null;get#a(){return document.querySelector(this.#r)}get#l(){return document.querySelector(".modal-backdrop")}get#e(){return document.querySelector("#add-to-favorite-button")}get#u(){return document.querySelector("#give-a-rating-button")}get#m(){return document.querySelector("#menu-close-button")}#d(e){this.#t=e;const{target:t,bodyPart:s,equipment:i,gifUrl:r,name:n,description:f,rating:g,burnedCalories:b,time:P,popularity:A}=this.#t;return`<div class="modal-backdrop">
      <div class="modal-container">
        <svg id="menu-close-button" class="menu-close-button">
          <use href="./img/icons.svg#menu-close"></use>
        </svg>
        <div class="info-container">
          <img src="${r}" alt="exercise" class="modal-image" />
          <div>
            <p class="modal-name">${n}</p>
            <div class="modal-rating-info">
              <p class="modal-rating">${g}</p>
              ${this.#p(g)}
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
                <p>${A}</p>
              </li>
              <li>
                <p>Burned Calories</p>
                <p>${b} / ${P} min</p>
              </li>
            </ul>
            <hr />
            <p class="modal-description">${f}</p>
          </div>
        </div>
        <div class="modal-controls">
          <button id="add-to-favorite-button" class="btn primary">
            Add to favorites
          </button>
          <button id="give-a-rating-button" class="btn">
            Give rating
          </button>
        </div>
      </div>
    </div>`}#n=e=>{e.target.classList.contains("modal-backdrop")&&this.hideModal()};#o=()=>{const e=M(),t=this.#t.name,s=e.findIndex(i=>i.name===t);s!==-1?e.splice(s,1):e.push(this.#t),localStorage.setItem("favorites",JSON.stringify(e)),this.#c()};#c=()=>{const e=this.#e;if(!e)return;const t=M().some(s=>s.name===this.#t.name);e.innerHTML=t?'Remove from favorites <svg><use href="./img/icons.svg#icon-trash"></use></svg>':'Add to favorites <svg><use href="./img/icons.svg#icon-heart"></use></svg>'};#p(e){const t=Math.floor(e),s=5-t;return`
    <ul class="modal-rating-stars">
      ${'<li><svg class="active"><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(t)}
      ${'<li><svg><use href="./img/icons.svg#icon-star"></use></svg></li>'.repeat(s)}
    </ul>
  `}#g=()=>{this.hideModal(),this.#s.showModal(this.#t._id)};#v=()=>{this.showModal(this.#t)};#h=e=>{e.key==="Escape"&&this.hideModal()};showModal=e=>{this.#i||(this.#a.innerHTML=this.#d(e),this.#e?.addEventListener("click",this.#o),this.#l?.addEventListener("click",this.#n),this.#m?.addEventListener("click",this.hideModal),this.#u?.addEventListener("click",this.#g),window.addEventListener("keydown",this.#h),this.#c(),this.#i=!0)};hideModal=()=>{this.#i&&(window.removeEventListener("keydown",this.#h),this.#a.innerHTML="",this.#i=!1)}}const W=new j,Y={_id:"64f389465ae26083f39b1ab2",bodyPart:"back",equipment:"barbell",gifUrl:"https://ftp.goit.study/img/power-pulse/gifs/1316.gif",name:"barbell bent arm pullover",target:"lats",description:"These large back muscles are responsible for shoulder adduction and horizontal extension. Pull-ups and lat pulldowns are common exercises targeting the lats.",rating:3.13,burnedCalories:324,time:3,popularity:5314};W.showModal(Y);
//# sourceMappingURL=commonHelpers.js.map
