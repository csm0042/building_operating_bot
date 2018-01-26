// Plays a sound file 
// ==========================================================
function playSound(sound) {
    var snd = new Audio(sound);
    snd.play();
    return true;
}

// Home screen refresh
// ==========================================================
var refreshTO;
function screenResize() {
    clearTimeout(refreshTO);
    refreshTO = setTimeout(refreshContent, 200);
}

function screenRefresh() {
    refreshContent();
    systemClock('system-clock');
    var autoRefresh = setTimeout(refreshContent, 300000);
}

function refreshContent() {
    updateMap('7857465136eaa7af', '38.6524', '-90.34', '50');
    updateWeather('63122', '7857465136eaa7af');
}
