const breakTime = 300;
const workTime = 1500;
let isWork = true;
let timer;
const btnStart = document.querySelector("#btn-start")
const mainTime = document.querySelector("#main__time")
const mainCaption = document.querySelector('#main__caption')

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
