export default class Notify{
    constructor(){
        if(Notification.permission !== "denied"){
           Notification.requestPermission()
        }
        if(Notification.permission !== "granted"){
            const div = document.createElement("div");
            div.classList.add("message-box");
            const message = "Enable Notification for Better Experience.";
            const textnode = document.createTextNode(message); 
            div.appendChild(textnode);
            document.body.appendChild(div)
         }
    }
    showNotification(title, desciption){
        new Notification(title,{
           body: desciption
       })
    }

}

{/* <div class="message-box">Notification Disabled\</div> */}
