var backgrounds = {
    '01d': 'images/clear-sky.jpg',
    '02d': 'images/few-clouds.jpg',
    '03d': 'images/scattered-clouds.jpg',
    '04d': 'images/broken-clouds.jpg',
    '09d': 'images/rain-shower.jpg',
    '10d': 'images/rain.jpg',
    '11d': 'images/storm.png',
    '13d': 'images/snow.jpg',
    '50d': 'images/mist.jpg'
};

$(document).ready(function () {
    var lat, lon;
    /*    $.get('http://www.telize.com/jsonip', function (IPData) { 
            
        });*/

    $.get('http://www.freegeoip.net/json/', function (locationData) {
        console.log(locationData.latitude, locationData.longitude);

        lat = Math.round(locationData.latitude);
        lon = Math.round(locationData.longitude);

        $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat.toString() + '&lon=' + lon.toString(), function (weatherData) {
            var imageKey = weatherData.weather[0].icon;
            $('body').css('background', 'url(' + backgrounds[imageKey] + ') no-repeat center center fixed');
            $('body').css('background-size', 'cover');
            $('.main-info').html('<img src="http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png" alt=""><div id="temp"><h2>16C</h2></div>');
            $('#temp').html('<h3>' + Math.round(weatherData.main.temp - 273) + 'C<h3>');
            $('#city').html('<h3>' + weatherData.name + ' weather station<h3>');
            $('#weather').html('<h3>' + weatherData.weather[0].description + '<h3>');
            $('#wind').html('<h3>' + weatherData.wind.speed + ' knots <h3>');
        });
    });
});