const breakTime = 300;
const workTime = 1500;
let slideIndex = 0;
let isWork = true;
let timer;
let infoIsHidden = true;
const btnStart = document.querySelector("#btn-start")
const mainTime = document.querySelector("#main__time")
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
btnStart.addEventListener('click',controller)
mainTime.innerHTML = "25:00"

function controller(){
    if(isWork){
        startTimer(workTime);
        isWork = false;
        btnStart.innerHTML = "Take a Break";
        mainCaption.innerHTML = "Pomodoro";
    }
    else{
        startTimer(breakTime);
        isWork = true;
        btnStart.innerHTML = "Start Task";
        mainCaption.innerHTML = "Short Break";

    }
}


function startTimer(countdown){
    clearInterval(timer)
    const starting =  Math.floor(Date.now() / 1000);
    timer = setInterval(function (){
        const currentTime =  Math.floor(Date.now() / 1000);
        let timeSpent = countdown - (currentTime-starting)
        mainTime.innerHTML = timeFormat(timeSpent);
        if(timeSpent == 0){
            clearInterval(timer);
            if(!isWork){
                const tomato = document.querySelectorAll('.work-count--incomplete');
                if(tomato.length>0){
                    tomato[0].classList.remove('work-count--incomplete');
                }
                showNotification("Take a break","Pomodoro Completed")

            }
            else{
                mainCaption.innerHTML = "Break Completed";
                showNotification("Break Completed","Focus on task")
            }
        }
    },1000);
    function timeFormat(number){
        let minute = makeTwoDigits(Math.floor(number /60));
        let second = makeTwoDigits(number%60);
        return minute+":"+second;
        function makeTwoDigits(n){
            if(n<10){
                n = "0"+ n;
            }
            return n;
        }
    }
}


function showNotification(title, desciption){
     new Notification(title,{
        body: desciption
    })
}
if(Notification.permission !== "denied"){
    Notification.requestPermission()
}
