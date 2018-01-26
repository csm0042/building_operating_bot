function updateWeather(zip, apiKey) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);

            // Text weather summary
            var summary = ("Today: " + 
                response.forecast.txt_forecast.forecastday[0].fcttext + 
                "<br>Tonight: " +
                response.forecast.txt_forecast.forecastday[1].fcttext);
            document.getElementById("current-summary").innerHTML = summary;

            // Current temp, hi, and low
            var current_cond = ("Currently: " +
                response.current_observation.temp_f +
                "&#8457;<br>Hi: " +
                response.forecast.simpleforecast.forecastday[0].high.fahrenheit + 
                "&#8457; / Lo: " +
                response.forecast.simpleforecast.forecastday[0].low.fahrenheit +
                "&#8457;");
            document.getElementById("current-conditions").innerHTML = current_cond;
            if (response.current_observation.temp_f <= 32) {
                document.getElementById("current-summary-box").style.background = "#00FFFF";
                document.getElementById("current-summary").style.color = "#000000";
                document.getElementById("current-conditions-box").style.background = "#00FFFF";
                document.getElementById("current-conditions").style.color = "#000000";
            } else if (response.current_observation.temp_f > 32 && response.current_observation.temp_f <= 60) {
                document.getElementById("current-summary-box").style.background = "#7FFFD4";
                document.getElementById("current-summary").style.color = "#000000";
                document.getElementById("current-conditions-box").style.background = "#7FFFD4";
                document.getElementById("current-conditions").style.color = "#000000";
            } else if (response.current_observation.temp_f > 60 && response.current_observation.temp_f <= 80) {
                document.getElementById("current-summary-box").style.background = "#7FFF00";
                document.getElementById("current-summary").style.color = "#000000";
                document.getElementById("current-conditions-box").style.background = "#7FFF00";
                document.getElementById("current-conditions").style.color = "#000000";
            } else if (response.current_observation.temp_f > 80 && response.current_observation.temp_f <= 95) {
                document.getElementById("current-summary-box").style.background = "#FFD700";
                document.getElementById("current-summary").style.color = "#000000";
                document.getElementById("current-conditions-box").style.background = "#FFD700";
                document.getElementById("current-conditions").style.color = "#000000";                
            } else if (response.current_observation.temp_f > 95) {
                document.getElementById("current-summary-box").style.background = "#FF0000";
                document.getElementById("current-summary").style.color = "#FFFFFF";
                document.getElementById("current-conditions-box").style.background = "#FF0000";
                document.getElementById("current-conditions").style.color = "#FFFFFF";
            } 
        }
    }
    var url = "http://api.wunderground.com/api/" + apiKey + "/conditions/forecast/q/" + zip + ".json";
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}


function updateMap(apiKey, centerLat, centerLon, radius) {
    var height = window.innerHeight - 60 - 90;
    var width = window.innerWidth - 40;
    var url = "http://api.wunderground.com/api/" +
        apiKey +
        "/animatedradar/image.gif?" +
        "centerlat=" + centerLat +
        "&centerlon=" + centerLon +
        "&radius=" + radius +
        "&width=" + width +
        "&height=" + height +
        "&newmaps=1&rainsnow=1&smooth=1&noclutter=1&timelabel=1&num=15&delay=100&timelabel.y=20";
    document.getElementById('radarImage').src = url;
}