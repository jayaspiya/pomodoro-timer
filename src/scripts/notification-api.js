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
            const btn = document.createElement("button");
            const btnLabel = "X";
            const btnNode = document.createTextNode(btnLabel);
            btn.classList.add("btn");
            btn.classList.add("btn--circle");
            btn.setAttribute("id", "btn-hide");
            btn.appendChild(btnNode);
            div.appendChild(btn);
            document.body.appendChild(div)
         }
    }
    showNotification(title, desciption){
        new Notification(title,{
           body: desciption
       })
    }

}

