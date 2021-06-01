    // setTimeout(function(){
    //     location.reload();
    //     console.log("reload");
    // },1000);
    let fvImgPc = document.querySelector(".fv-img-pc");
    let fvImgSp = document.querySelector(".fv-img-sp");

    let contactImg = document.querySelector(".contact-img");

    addEventListener("load",changeImg);
    addEventListener("resize", changeImg);
    
    function changeImg(){
        if(window.matchMedia("(max-width: 1024px)").matches){
            fvImgPc.classList.add("displayNone");
            fvImgSp.classList.remove("displayNone");

        }else{
            fvImgPc.classList.remove("displayNone");
            fvImgSp.classList.add("displayNone");
        }
    }

let headerHumberger = document.querySelector(".header-humberger");
let navItem = document.querySelectorAll(".nav-item");
let topBar = document.querySelector(".top-bar");
let middleBar = document.querySelector(".middle-bar");
let bottomBar = document.querySelector(".bottom-bar");
let navTag = document.querySelector("nav");
let bodyTag = document.querySelector("body");

headerHumberger.addEventListener("click",toggle);

for(let i=0;i<navItem.length;i++){
    navItem[i].addEventListener("click",toggle);
}


function toggle(){
    topBar.classList.toggle("top-bar-click");
    middleBar.classList.toggle("middle-bar-click");
    bottomBar.classList.toggle("bottom-bar-click");
    navTag.classList.toggle("displayNone");
    navTag.classList.toggle("nav-fadeIn");
    bodyTag.classList.toggle("noScroll");
}
