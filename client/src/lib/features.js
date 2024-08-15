import moment from "moment";

const fileFormat = (url = "") => {
//    url mese last element nikal liya jo ki file ka extension hai
    const fileExtension = url.split(".").pop();
    if(fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg")
        return "video";

    if(fileExtension === "mp3" || fileExtension === "wav")
        return "audio";

    if(fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "gif")
        return "image";

    return "file";
}


const transformImage = (url = "" , width = 100) => {
    return url;
}


const getLast7Days = () => {
    const currentDate = moment(); // ye currentDate ek object hai
    const last7Days = [];
    for(let i=0 ; i<7 ; i++){
        // currentDate ko clone kara taaki original mai kuch gadbad na ho
        const dayDate = currentDate.clone().subtract(i,"Days");
        const dayName = dayDate.format("dddd");
        last7Days.unshift(dayName); // unshift se array ke starting mai element add hota hai
    }
    return last7Days
}


export {fileFormat , transformImage , getLast7Days}