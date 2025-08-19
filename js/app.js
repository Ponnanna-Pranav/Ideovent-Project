// Utilities
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const state = {
  blogs: [],
  filtered: [],
};

const ui = {
  grid: $("#blogGrid"),
  empty: $("#emptyState"),
  search: $("#searchInput"),
  cat: $("#categoryFilter"),
  tag: $("#tagFilter"),
};

function setYear(){ $("#year").textContent = new Date().getFullYear(); }

async function loadBlogs(){
  const res = await fetch('data/blogs.json');
  const data = await res.json();
  state.blogs = data.blogs;
  state.filtered = [...state.blogs];
  hydrateFilters();
  render();
}

function hydrateFilters(){
  const cats = [...new Set(state.blogs.flatMap(b => b.categories || []))].sort();
  const tags = [...new Set(state.blogs.flatMap(b => b.tags || []))].sort();

  for(const c of cats){
    const opt = document.createElement('option'); opt.value=c; opt.textContent=c; ui.cat.appendChild(opt);
  }
  for(const t of tags){
    const opt = document.createElement('option'); opt.value=t; opt.textContent=t; ui.tag.appendChild(opt);
  }
}

function applyFilters(){
  const q = ui.search.value.trim().toLowerCase();
  const cat = ui.cat.value;
  const tag = ui.tag.value;

  state.filtered = state.blogs.filter(b => {
    const text = (b.title + " " + b.description + " " + (b.content || "") + " " + (b.tags||[]).join(" ")).toLowerCase();
    const qOk = !q || text.includes(q);
    const cOk = !cat || (b.categories||[]).includes(cat);
    const tOk = !tag || (b.tags||[]).includes(tag);
    return qOk && cOk && tOk;
  });
  render();
}

function render(){
  ui.grid.innerHTML = "";
  if(state.filtered.length === 0){
    ui.empty.hidden = false;
    return;
  }
  ui.empty.hidden = true;

  const frag = document.createDocumentFragment();
  state.filtered.forEach(b => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${b.thumbnail}" alt="${b.title} thumbnail">
      <div class="card-body">
        <h3 class="card-title">${b.title}</h3>
        <p class="card-desc">${b.description}</p>
        <div class="pill-row">${(b.categories||[]).map(c => `<span class="pill">${c}</span>`).join("")}</div>
        <div class="card-actions">
          <a class="btn" href="blog.html?id=${encodeURIComponent(b.id)}">Read More</a>
          <span class="btn ghost">${new Date(b.date).toLocaleDateString()}</span>
        </div>
      </div>
    `;
    frag.appendChild(card);
  });
  ui.grid.appendChild(frag);
}

function initEvents(){
  ui.search.addEventListener('input', applyFilters);
  ui.cat.addEventListener('change', applyFilters);
  ui.tag.addEventListener('change', applyFilters);
}

setYear();
initEvents();
loadBlogs().catch(console.error);
