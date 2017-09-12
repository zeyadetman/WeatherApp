cede = 0;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        getter(position.coords.latitude, position.coords.longitude);
    });
} else {
    /* geolocation IS NOT available */
}

function getter(lat, lon) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText));
            var res = JSON.parse(this.responseText);
            $(".position").html(`${res['name']}, ${res['sys']['country']}`);
            cede = res['main']['temp'];
            $(".tempdeg").html(`${res['main']['temp']}`);
            $(".tempertext").html(`${res['weather'][0]['main']}, ${res['weather'][0]['description']}`);
            $(".weather-icon").attr("src", res['weather'][0]['icon']);
        }
    });

    xhr.open("GET", `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "9a179417-12a2-e0b5-6a05-6fa048730475");

    xhr.send(data);
    console.log(lat, lon);
}

function change() {
    if ($("#maindeg").html() == 'C') {
        $("#maindeg").html('F');
        cede = ((cede * 9) / 5) + 32;
        cede = cede.toFixed(2);
        $(".tempdeg").html(cede);
    } else if ($("#maindeg").html() == 'F') {
        $("#maindeg").html('C');
        cede = ((cede - 32) * 5) / 9;
        cede = cede.toFixed(2);
        $(".tempdeg").html(cede);
    }
}