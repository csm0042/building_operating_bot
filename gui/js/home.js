// Plays a sound file 
// ==========================================================
function playSound(sound) {
    var snd = new Audio(sound);
    snd.play();
    return true;
}

// Home screen refresh
// ==========================================================
function screenRefresh(sound) {
    systemClock('system-clock');
    br1lt1.getState();
    br1lt2.getState();
    br2lt1.getState();
    br2lt2.getState();
    br3lt1.getState();
    br3lt2.getState();

    cclt1.getState();
    ewlt1.getState();
    lrlt1.getState();
    lrlt2.getState();
    drlt1.getState();

    wslt1.getState();

    fylt1.getState();
    fylt1.getState();
    bylt1.getState();

}
