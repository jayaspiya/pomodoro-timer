export default function timeFormat(number){
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
