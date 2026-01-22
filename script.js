/* ======================================================
   ISO SENTINEL – NEXT GEN JAVASCRIPT ENGINE
   ====================================================== */

document.addEventListener("DOMContentLoaded",()=>{

/* ---------------------------
   CYBER PAGE TRANSITION
----------------------------*/
const transition = document.createElement("div");
transition.id = "page-transition";
transition.innerHTML = "LOADING...";
document.body.appendChild(transition);

window.addEventListener("load",()=>{
  transition.classList.add("hide");
});

/* ---------------------------
   EXPLORER OVERLAY
----------------------------*/
const explorer = document.createElement("div");
explorer.id = "explorer";
explorer.innerHTML = `
<div class="explorer-box">
  <span class="close">✖</span>
  <h2 id="exp-title"></h2>

  <input type="text" id="search" placeholder="Search content...">

  <div class="filters">
    <button data-filter="all">All</button>
    <button data-filter="pdf">PDF</button>
    <button data-filter="video">Video</button>
    <button data-filter="image">Image</button>
  </div>

  <div id="exp-body"></div>

  <div class="upload-ui">
    <p>Upload area (future backend)</p>
    <input type="file" disabled>
  </div>
</div>`;
document.body.appendChild(explorer);

/* ---------------------------
   CONTENT DATABASE
----------------------------*/
const contentDB = {
  "Introduction to Cyber Security":[
    {type:"pdf",title:"Cyber Notes",src:"docs/cyber.pdf"},
    {type:"video",title:"Intro Video",src:"https://www.youtube.com/embed/1D6xTfud7T4"},
    {type:"image",title:"Cyber Diagram",src:"images/cyber.png"}
  ],
  "Encryption":[
    {type:"pdf",title:"Encryption Guide",src:"docs/encryption.pdf"},
    {type:"video",title:"Encryption Explained",src:"https://www.youtube.com/embed/jhXCTbFnK8o"}
  ]
};

/* ---------------------------
   OPEN EXPLORER
----------------------------*/
document.querySelectorAll("button").forEach(btn=>{
  if(btn.textContent.includes("Explore")){
    btn.onclick=()=>{
      const title=btn.parentElement.textContent.replace("Explore","").trim();
      openExplorer(title);
    }
  }
});

function openExplorer(title){
  document.getElementById("exp-title").innerText=title;
  explorer.style.display="flex";
  renderItems(contentDB[title]||[]);
}

/* ---------------------------
   RENDER CONTENT
----------------------------*/
function renderItems(items){
  const body=document.getElementById("exp-body");
  body.innerHTML="";
  items.forEach(item=>{
    const div=document.createElement("div");
    div.className="exp-item";
    if(item.type==="pdf"){
      div.innerHTML=`<h4>${item.title}</h4><a href="${item.src}" target="_blank">View PDF</a>`;
    }
    if(item.type==="video"){
      div.innerHTML=`<h4>${item.title}</h4><iframe src="${item.src}" allowfullscreen></iframe>`;
    }
    if(item.type==="image"){
      div.innerHTML=`<h4>${item.title}</h4><img src="${item.src}">`;
    }
    body.appendChild(div);
  });
}

/* ---------------------------
   SEARCH & FILTER
----------------------------*/
document.getElementById("search").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  document.querySelectorAll(".exp-item").forEach(item=>{
    item.style.display=item.innerText.toLowerCase().includes(q)?"block":"none";
  });
});

document.querySelectorAll(".filters button").forEach(btn=>{
  btn.onclick=()=>{
    const f=btn.dataset.filter;
    document.querySelectorAll(".exp-item").forEach(item=>{
      item.style.display=(f==="all"||item.innerHTML.includes(f))?"block":"none";
    });
  }
});

/* ---------------------------
   CLOSE
----------------------------*/
document.querySelector(".close").onclick=()=>explorer.style.display="none";

});
