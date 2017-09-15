cede = 0;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        getter(position.coords.latitude, position.coords.longitude);
    });
} else {
    /* geolocation IS NOT available */
}

function getter(lat, lon) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "e38a0378-abf7-2842-b83c-942559ffa361"
        }
    }

    $.ajax(settings).done(function(response) {
        console.log(response);
        var res = response;
        $(".position").html(`${res['name']}, ${res['sys']['country']}`);
        cede = res['main']['temp'];
        $(".tempdeg").html(`${res['main']['temp']}`);
        $(".tempertext").html(`${res['weather'][0]['main']}, ${res['weather'][0]['description']}`);
        $(".weather-icon").attr("src", res['weather'][0]['icon']);
    });
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