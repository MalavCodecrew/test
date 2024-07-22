
// let container = document.querySelector(".container");
// let maskContainer = document.querySelector(".mask-container");
// let maskImageContainer = document.querySelector(".mask-image-container");

// let border = document.querySelector(".border");
// let circle = document.querySelector(".circle");

// circle.style.draggable = true;


// circle.ondrag = function(event){
// let pagex = event.pageX + "px";
//   // console.log(pagex,"Event")
//     maskContainer.style.width = pagex;
//     border.style.left = pagex;
//     circle.style.left = pagex;
// }

// circle.ondragend = function(event){
//   let pagexy = event.pageX + "px";
//   // console.log(pagexy,"Event")
//     maskContainer.style.width = pagexy;
//     border.style.left = pagexy;
//     circle.style.left = pagexy;
// }


let container = document.querySelector(".container");
let maskContainer = document.querySelector(".mask-container");
let maskImageContainer = document.querySelector(".mask-image-container");

let border = document.querySelector(".border");
let circle = document.querySelector(".circle");

circle.draggable = true;

circle.ondrag = function(event) {
    let containerRect = container.getBoundingClientRect();
    let maxX = containerRect.width;

    let pagex = event.pageX - containerRect.left;
    if (pagex < 0) pagex = 0;
    if (pagex > maxX) pagex = maxX;

    maskContainer.style.width = pagex + "px";
    border.style.left = pagex + "px";
    circle.style.left = pagex + "px";
}

circle.ondragend = function(event) {
    let containerRect = container.getBoundingClientRect();
    let maxX = containerRect.width;

    let pagex = event.pageX - containerRect.left;
    if (pagex < 0) pagex = 0;
    if (pagex > maxX) pagex = maxX;

    maskContainer.style.width = pagex + "px";
    border.style.left = pagex + "px";
    circle.style.left = pagex + "px";
}

