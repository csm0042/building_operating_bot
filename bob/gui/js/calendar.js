// Plays a sound file 
// ==========================================================
function playSound(sound) {
    var snd = new Audio(sound);
    snd.play();
    return true;
}


// Home screen refresh
// ==========================================================
function screenRefresh(id) {
    systemClock('system-clock');
    updateCal(id);
}


// Updates calendar format based on window size
// ==========================================================
function updateCal(id) {
    if (window.innerWidth < 1000) {
        document.getElementById(id).src = "https://calendar.google.com/calendar/embed?showTitle=0&mode=AGENDA&height=600&wkst=2&bgcolor=%23FFFFFF&src=csmaue%40gmail.com&color=%231badf8&src=aidenmaue%40gmail.com&color=%23ffcc00&src=2dttuudaemv60luom6fgfmnf4s%40group.calendar.google.com&color=%23691426&src=sarahemaue%40gmail.com&color=%23cc73e1&src=o1h5ka6ugqn30jehb3ei7pbo2k%40group.calendar.google.com&color=%23711616&ctz=America%2FChicago";
    } else {
        document.getElementById(id).src = "https://calendar.google.com/calendar/embed?showTitle=0&mode=WEEK&height=600&wkst=2&bgcolor=%23FFFFFF&src=csmaue%40gmail.com&color=%231badf8&src=aidenmaue%40gmail.com&color=%23ffcc00&src=2dttuudaemv60luom6fgfmnf4s%40group.calendar.google.com&color=%23691426&src=sarahemaue%40gmail.com&color=%23cc73e1&src=o1h5ka6ugqn30jehb3ei7pbo2k%40group.calendar.google.com&color=%23711616&ctz=America%2FChicago";
    }    
}
