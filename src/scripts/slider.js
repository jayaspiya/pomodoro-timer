let slideIndex = 0;

const informationMenuSlide = document.querySelectorAll('.information-menu__slide');
const informationMenu = document.querySelector(".information-menu");

function resetSlideIndex(){
    slideIndex = 0;
}

function changeSlide(value){
    const slideSize = informationMenuSlide.length-1;
    hideAllSlides();
    slideIndex += value;
    if(slideIndex < 0){
        slideIndex = 0;
        document.querySelector("#previous-btn").style.opacity  = "0.1";
    }
    else if(slideIndex >= slideSize){
        slideIndex = slideSize;
        document.querySelector("#next-btn").style.opacity  = "0.1";
    }
    else{
        document.querySelector("#next-btn").style.opacity  = "1";
        document.querySelector("#previous-btn").style.opacity  = "1";

    }
    informationMenuSlide[slideIndex].classList.add("information-menu__slide--show");
}

function hideAllSlides(){
    informationMenuSlide.forEach(slide => {
        if(slide.classList.contains("information-menu__slide--show")){
           slide.classList.remove("information-menu__slide--show");
        }
    });
}

export {changeSlide, hideAllSlides, informationMenu, informationMenuSlide, resetSlideIndex}