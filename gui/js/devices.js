// DEVICE PROTOTYPE CLASS
//===========================================================================
function Device(id, addr) {
    this.id = id;
    this.addr = addr;
    this.state = 'off';

    var ditto = this

    this.updateDisplay = function(newstate) {
        ditto.state = newstate;
        if (ditto.state == 'on') {
            ditto.display = document.getElementById(ditto.id).className = "fa fa-toggle-on fa-3x fg-green";
        } else if (ditto.state == "off") {
            ditto.display = document.getElementById(ditto.id).className = "fa fa-toggle-off fa-3x fg-white";
        } else {
            ditto.display = document.getElementById(ditto.id).className = "fa fa-exclamation-circle fa-3x fg-red";
        }
    };

    this.changeState = function(newstate) {
        if (this.state != newstate) {
            sendCmd(this.id, this.addr, newstate, this.updateDisplay);
        }
    };

    this.getState = function() {
        sendCmd(this.id, this.addr, 'ask', this.updateDisplay);
    };

    this.toggleState = function() {
        if (this.state == 'off') {
            sendCmd(this.id, this.addr, 'on', this.updateDisplay);
        } else {
            sendCmd(this.id, this.addr, 'off', this.updateDisplay); 
        }
    };
}


// DEFINE DEVICES
//===========================================================================
// Outside devices
var fylt1 = new Device('fylt1', '192.168.86.21');
var fylt2 = new Device('fylt2', '192.168.86.22');
var bylt1 = new Device('bylt1', '192.168.86.24');
// Basement devices
var bmlt1 = new Device('bmlt1', '192.168.86.25');
var wslt1 = new Device('wslt1', '192.168.86.26');
// First floor devices
var cclt1 = new Device('cclt1', '192.168.86.28');
var ewlt1 = new Device('ewlt1', '192.168.86.27');
var lrlt1 = new Device('lrlt1', '192.168.86.29');
var lrlt2 = new Device('lrlt2', '192.168.86.30');
var drlt1 = new Device('drlt1', '192.168.86.31');
// Second floor devices
var br1lt1 = new Device('br1lt1', '192.168.86.35');
var br1lt2 = new Device('br1lt2', '192.168.86.36');
var br2lt1 = new Device('br2lt1', '192.168.86.37');
var br2lt2 = new Device('br2lt2', '192.168.86.38');
var br3lt1 = new Device('br3lt1', '192.168.86.39');
var br3lt2 = new Device('br3lt2', '192.168.86.40');
// Flex devices
var insight1 = new Device('insight1', '192.168.86.44');
var insight2 = new Device('insight2', '192.168.86.45');


// AJAX Call for command state changes
//===========================================================================
function sendCmd(id, addr, cmd, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (xhttp.responseText.search(/state=on/i) != -1 || xhttp.responseText.search(/state=1/i) != -1) {
                cFunction('on');
            }
            if ((xhttp.responseText.search(/state=off/i) != -1 && xhttp.responseText.search(/state=offline/i) == -1) || xhttp.responseText.search(/state=0/i) != -1) {
                cFunction('off');
            }
            if (xhttp.responseText.search(/state=offline/i) != -1 || http.responseText.search(/error/i) != -1) {
                cFunction('offline');
            }
        }
    };
    // Set URL and header info, then send request
    var url = "192.168.86.12:8000/?t=" + Math.random() + "&name=" + id + "&addr=" + addr + "&cmd=" + cmd;
    xhttp.open("GET", url, true);
    xhttp.send(null);
}
