
let slideIndex = 0;
let infoIsHidden = true;

const mainCaption = document.querySelector('#main__caption')
const informationMenuSlide = document.querySelectorAll('.information-menu__slide');
const informationMenuToggler = document.querySelector('#information-menu__toggler');
const informationMenu = document.querySelector(".information-menu");
document.addEventListener('click',function(e){
    if(e.target.id== "previous-btn"){
        changeSlide(-1);

    }
    if(e.target.id== "next-btn"){
        changeSlide(1);
    }
})
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
informationMenuToggler.addEventListener('click',function(){
    informationMenu.classList.toggle("information-menu--hide");
    if(infoIsHidden){
        informationMenuToggler.innerHTML = "X";
        infoIsHidden = false;
    }
    else{
        informationMenuToggler.innerHTML = "?";
        hideAllSlides();
        informationMenuSlide[0].classList.add("information-menu__slide--show");
        infoIsHidden = true;
        slideIndex = 0;
        document.querySelector("#next-btn").style.opacity  = "1";
        document.querySelector("#previous-btn").style.opacity  = "0.1";
    }

})


