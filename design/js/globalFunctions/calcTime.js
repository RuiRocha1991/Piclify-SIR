function calculateTimeOfUpload(uploadDate){
    var uploadDate = new Date(uploadDate);
    var todaysDate = new Date();
    var timeDiff = Math.abs(todaysDate.getTime() - uploadDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var diffHours = Math.ceil(timeDiff / (60*60*1000));
    var diffMinutes = Math.ceil(timeDiff / (60*1000));
    var diffSeconds = Math.ceil(timeDiff / (1000));
    if(diffSeconds < 60){
        return diffSeconds+' seconds'
    }else if(diffSeconds == 60){
        return diffMinutes+' minute'
    }else if(diffMinutes <60){
        return diffMinutes+' minutes'
    }else if(diffMinutes == 60){
        return diffHours+' hour'
    }else if(diffHours <24){
        return diffHours+' hours'
    }else if(diffHours == 24){
        return diffDays+' day'
    }else if(diffHours > 24){
        return diffDays+' days'
    }
}