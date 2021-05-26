
const container = document.querySelector('.container');
const navLink = document.querySelectorAll('.nav-link');
const newsContainer = document.querySelector('.newsContainer');
const spinner = document.querySelector('.spinner-border');
const title = document.querySelector('.title');
const headerDate = document.querySelector('.headerDate');
const currentDate = new Date;
headerDate.innerHTML =`${currentDate.toDateString()}`;

const headerTime = document.querySelector('.headerTime');

setInterval(function(){
  const currentTimes = new Date;
  const currentTime = currentTimes.toLocaleTimeString();
    headerTime.innerHTML = currentTime;
},1000)
//!navlink clicked after color change
// navItem.forEach((item,i)=>{
  
//     item.addEventListener('click',function(){
//      navItem.forEach((value)=>{
//        value.classList.remove('active');
//      })
//        item.classList.add('active');
//     })
  
// })

//!after clicked data change
navLink.forEach((value,i)=>{
  value.addEventListener('click',function(){
    title.innerHTML='';
    const d = newsContainer.children;
   const arr = Array.from(d); 
arr.forEach(function (element) {
  element.remove();
});
        
   const url = `https://api.nytimes.com/svc/topstories/v2/${value.id}.json?api-key=MzsiUFtHzeZjDMqyFmnZElo3bJQv2kAF`;
   (async ()=>{
    try{
      spinner.style.display ='block';
      const data = await fetch(url);
      const result = await data.json();
      const finalResult = result.results;
      finalResult.forEach((item)=>{

        newsFunction(url,item,value.innerHTML);
        spinner.style.display ='none';
          
      })
    }
      catch(err){
        console.log("error");
      }
  })();


  })
})


//!default first/home page fetch

const aFunction = async ()=>{
  try{
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=MzsiUFtHzeZjDMqyFmnZElo3bJQv2kAF`;
  
    spinner.style.display = 'block';
    const data = await fetch(url);
    const result = await data.json();
    const finalResult = result.results;
    finalResult.forEach((item)=>{
    
      newsFunction(url,item,"Home");
       spinner.style.display="none";
    })
  }
    catch(err){
      console.log("error");
    }
}
aFunction();


const newsFunction = (url,item,value)=>{
  title.innerHTML =value;
  const date = new Date(item.published_date);
    const finalDate = date.toDateString();

 const card = document.createElement("div");
 card.setAttribute('class','card');
 const row = document.createElement("div");
 row.setAttribute('class','row');
 card.appendChild(row);
 const content = document.createElement("div");
 content.setAttribute('class','col-sm-7');
 row.appendChild(content);
 const cardBody = document.createElement("div");
 cardBody.setAttribute('class','card-body');
 content.appendChild(cardBody);
 const h5 = document.createElement("h5");
 h5.setAttribute('class','card-title');
 h5.innerHTML=item.title;
 cardBody.appendChild(h5);
 const para = document.createElement("p");
 para.setAttribute('class','card-text');
 para.innerHTML=item.abstract;
 cardBody.appendChild(para);
 const lastUpdate = document.createElement('p');
 lastUpdate.setAttribute('class','lastUpdate');
 lastUpdate.innerHTML=`Last Updated, ${finalDate}`;
 cardBody.appendChild(lastUpdate);
 const anchor = document.createElement('a');
 anchor.setAttribute('class','stretched-link');
 anchor.innerHTML="Continue Reading...";
 anchor.setAttribute('href',item.url);
anchor.setAttribute('target','_blank')
 cardBody.appendChild(anchor);
 const imageContent = document.createElement("div");
 imageContent.setAttribute('class','sol-sm-5');
 row.appendChild(imageContent);

 const anc = document.createElement('a');
 anc.setAttribute('href',item.multimedia[0].url);
 anc.setAttribute('target','_blank');
imageContent.appendChild(anc);


 const cardImage = document.createElement("img");
 cardImage.setAttribute('class','img-thumbnail');
 cardImage.setAttribute('src',item.multimedia[4].url);
 anc.appendChild(cardImage);

 

 newsContainer.appendChild(card);
}


// const navItem = document.querySelectorAll('.nav-item');


// var display = window.matchMedia('(max-width:992px)');

// display.addListener(myFunction);



// function myFunction(display){
// if (display.matches) { 
//  navItem.forEach((item)=>{
//      item.setAttribute('data-toggle','collapse');
//      item.setAttribute('data-target','#navbarSupportedContent');

//  })
// } else{
//   navItem.forEach((item)=>{
//     item.setAttribute('data-toggle','none');
//     item.setAttribute('data-target','none');
// })
// }}
