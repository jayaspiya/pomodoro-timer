//* Imports
import ringBell from  "./audio.js";
import Notify from "./notification-api.js";
import timeFormat from "./timeFormater.js";
import {changeSlide, hideAllSlides, informationMenu, informationMenuSlide, resetSlideIndex} from "./slider.js";
import hideParent from "./hide-element.js";

//* Time Period Setup | Default break 300, work 1500
const breakTime = 300;
const workTime = 1500;

//* DOM variables
const btnStart = document.querySelector("#btn-start");
const mainTime = document.querySelector("#main__time");
const mainCaption = document.querySelector('#main__caption');
const informationMenuToggler = document.querySelector('#information-menu__toggler');

//* Variables
let infoIsHidden = true;
let isWork = true;
let setIntervalTimer;
let notify = new Notify();

//* Render Element DOM
mainTime.innerHTML = timeFormat(workTime);

//* Event Listeners 
btnStart.addEventListener('click',controller);
informationMenuToggler.addEventListener('click',menuToggler);
document.addEventListener('click',function(e){
    if(e.target.id== "previous-btn"){
        changeSlide(-1);
    }
    if(e.target.id== "next-btn"){
        changeSlide(1);
    }
    if(e.target.id == "btn-hide"){
        hideParent(e);
    }
});

//* Main Functions 
function startTimer(countdown){
    clearInterval(setIntervalTimer);
    const starting =  Math.floor(Date.now() / 1000);
    setIntervalTimer = setInterval(function (){
        const currentTime =  Math.floor(Date.now() / 1000);
        let timeSpent = countdown - (currentTime-starting)
        mainTime.innerHTML = timeFormat(timeSpent);
        if(timeSpent == 0){
            clearInterval(setIntervalTimer);
            if(!isWork){
                const tomato = document.querySelectorAll('.work-count--incomplete');
                if(tomato.length>1){
                    tomato[0].classList.remove('work-count--incomplete');
                    notify.showNotification("Take a break","Pomodoro Completed");
                }
                else if(tomato.length>0){
                    tomato[0].classList.remove('work-count--incomplete');
                    notify.showNotification("Take a break","One more pomodoro remaining");
                }
                else{
                    notify.showNotification("You need to take a break","Four Pomodoro Completed")
                }
            }
            else{
                mainCaption.innerHTML = "Break Completed";
                notify.showNotification("Break Completed","Focus on task")
            }
            ringBell();
        }
    },1000); 
}

function controller(){
    if(isWork){
        startTimer(workTime);
        btnStart.innerHTML = "Take a Break";
        mainCaption.innerHTML = "Pomodoro";
        isWork = false;
    }
    else{
        startTimer(breakTime);
        btnStart.innerHTML = "Start Task";
        mainCaption.innerHTML = "Short Break";
        isWork = true;
    }
}

function menuToggler(){
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
        resetSlideIndex();
        document.querySelector("#next-btn").style.opacity  = "1";
        document.querySelector("#previous-btn").style.opacity  = "0.1";
    }
}