$(document).ready(function() {
 
  var lon;
  var lat;

  navigator.geolocation.getCurrentPosition(function(position) {
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    $(".data").html("latitude: " + lat + "<br>longitude: " + lon);

    var api =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=e68496d6b421f6ab08fd24a1f224d48b";
    console.log(api);

    $.getJSON(api, function(data) {
      var k = data.main.temp;

      var c = k - 273.15;
      c = c.toFixed(0);
      var f = (k - 273.15) * 9 / 5 + 32;
      f = f.toFixed(0);
      var city = data.name;
      var country = data.sys.country;
      var des = data.weather[0].main;
      var toggle = true;

      $("#place").html(city + "," + country);
      $("#des").html(des);
      $("#weather").html(c + "&#8451;");
      $("#weather").click(function() {
        if (toggle === false) {
          $("#weather").html(c + " " + "&#8451;");
          toggle = true;
        } else {
          $("#weather").html(f + " " + "&#8457;");
          toggle = false;
        }
        
      });
      var icon=data.weather[0].description;
      console.log(icon);
      
       if(icon.includes("cloud")) {
      $(".img i").addClass("ion-ios-cloud");
      }
      else if(icon.includes("rain")) {  
   $(".img i").addClass("ion-ios-rainy");
      }
      else if(icon === "sunny" || icon === "clear sky" ){
       $(".img i").addClass("ion-ios-sunny");
      }
      else {
         $(".img i").addClass("ion-ios-snowy");
      }
      
     
      
    });
  });
});
