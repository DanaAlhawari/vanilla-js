// Menu
const navShow = document.querySelector(".menu");
const icon = document.querySelector("#js-hamburger");
function toggleMenu(){
    navShow.classList.toggle("menu--show");
    icon.classList.toggle("fa-times-circle");
}
//function för att visa tidigare program och loading.gif
let isLoading = false;
let showPreviousData = false;
let loadedData = [];
function showPreviousProgram() {
    showPreviousData = true;
    render(loadedData);
}
    
// Visa upp "loading.gif" om ingen data har laddats
let img = document.querySelector("#js-loading");
 window.addEventListener("load", () => {
     img.style.display = "none";
   });

 
 
function setChannel(channel) {
    document.getElementById("js-title").innerHTML = channel;
    if (channel == "SVT 1") {
    //    isLoading = true;
       svt1();
   } else if (channel == "SVT 2"  ) {
       svt2();
  }else if (channel == "SVT Barn"  ) {
       svt3();
  }else if (channel == "Kunskapskanalen"  ) {
       svt4();
  }else if (channel == "SVT 24"  ) {
       svt5();
  }
};
//Hämta data med fetch

function svt1() {  

    fetch("https://tv-api-kn3ny.ondigitalocean.app/SVT%201.json")
        .then((res) => res.json())
         .then((data) =>{
             loadedData = data;
             showPreviousData = false;
             console.log(data);
             render(data);     
    });
}
function svt2() {
        
    fetch("https://tv-api-kn3ny.ondigitalocean.app/SVT%202.json")
        .then((res) => res.json())
        .then((data) => {
            loadedData = data;
            showPreviousData = false;
               console.log(data);
              render(data);
    });
};
function svt3() {
        
    fetch("https://tv-api-kn3ny.ondigitalocean.app/SVT%20Barn.json")
        .then((res) => res.json())
        .then((data) => {
            loadedData = data;
            showPreviousData = false;
               console.log(data);
              render(data);
    });
};
function svt4() {
        
    fetch("https://tv-api-kn3ny.ondigitalocean.app/Kunskapskanalen.json")
        .then((res) => res.json())
        .then((data) => {
            loadedData = data;
            showPreviousData = false;
               console.log(data);
              render(data);
    });
};
function svt5() {
        
    fetch("https://tv-api-kn3ny.ondigitalocean.app/SVT%2024.json")
        .then((res) => res.json())
        .then((data) => {
            loadedData = data;
            showPreviousData = false;
              console.log(data);
              render(data);
    });
};
   

//render funktion som kombinerar ihop html+data, skriv ut med innerHTML
function render(data) {
    data.sort((a, b) => {
          let dataA = new Date(a.start)
          let dataB = new Date(b.start)
            if (dataA  > dataB ) { return 1;}
            if (dataA < dataB) { return -1;}
            return 0;      
    });
    if (!showPreviousData) {
        data = filterData(data);
    }
    if (!showPreviousData) {
       document.querySelector(".show-previous").addEventListener("click", showPreviousProgram);
    }
 let html = data
        .map((channels) => {
            const time = new Date(channels.start)
            return `<li class="list-group-item">
                <strong>${time.toLocaleTimeString('sv', { hour: '2-digit', minute: '2-digit' })}</strong>
           
            <div>${channels.name}</div>
           </li>`;
        })
        .join('');
    document.querySelector(".list-group-item").nextElementSibling.innerHTML = html;  
    
       }
     
//Filtera så att bara program i framtiden visas

function filterData(data){
    return data.filter(function (program) {
        const startTime = new Date(program.start);
        const currentTime = new Date();
        return startTime.getHours() > currentTime.getHours();
   }) 
};





 
 
  

    


    
 


