const $ = (sel, root=document) => root.querySelector(sel);

function setYear(){ $("#year").textContent = new Date().getFullYear(); }

function getId(){
  const params = new URLSearchParams(location.search);
  return params.get('id');
}

async function loadBlog(id){
  const res = await fetch('data/blogs.json');
  const data = await res.json();
  const posts = data.blogs;
  const post = posts.find(p => String(p.id) === String(id));
  return { post, posts };
}

function renderPost(post){
  $("#postTitle").textContent = post.title;
  $("#postMeta").textContent = `${post.author} • ${new Date(post.date).toLocaleDateString()}`;
  $("#postContent").innerHTML = post.content;
  const cats = (post.categories||[]).map(c => `<span class="pill">#${c}</span>`).join("");
  const tags = (post.tags||[]).map(t => `<span class="pill">#${t}</span>`).join("");
  $("#postCategories").innerHTML = cats;
  $("#postTags").innerHTML = tags;
}

function renderMore(posts, currentId){
  const more = posts.filter(p => String(p.id)!==String(currentId)).slice(0,4);
  const grid = $("#moreGrid");
  grid.innerHTML = "";
  for(const b of more){
    const el = document.createElement('a');
    el.href = `blog.html?id=${encodeURIComponent(b.id)}`;
    el.className = 'card';
    el.innerHTML = `
      <img src="${b.thumbnail}" alt="${b.title} thumbnail">
      <div class="card-body">
        <h4 class="card-title">${b.title}</h4>
        <p class="card-desc">${b.description}</p>
      </div>
    `;
    grid.appendChild(el);
  }
}

(async function main(){
  setYear();
  const id = getId();
  const { post, posts } = await loadBlog(id);
  if(!post){
    $("#postTitle").textContent = "Post not found";
    $("#postContent").innerHTML = "<p>We couldn't find this post. Try going back to the listing.</p>";
    return;
  }
  renderPost(post);
  renderMore(posts, id);
})().catch(console.error);
