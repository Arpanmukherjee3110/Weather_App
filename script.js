// APIs used in this project:
// unsplash --> 'https://source.unsplash.com/1600x900/?india';
// openweather --> https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=66334f31881496924b80ada017081aa2
// opencage --> https://api.opencagedata.com/geocode/v1/json?q={lat},{lon}&key=9902d233542845949faf72a3f296187a
//reverse geocoding --> https://api.opencagedata.com/geocode/v1/json?q=23.5045,87.3423&key=9902d233542845949faf72a3f296187a&pretty=1&no_annotations=1


//Positioning The Search Label
function search(){
  setTimeout(function(){document.getElementById("txt").addEventListener("focusout",function(){
    if(document.getElementById("txt").value.length==0){
      document.getElementById("search").style.top="16.6vh";
    }
    else{
      document.getElementById("search").style.top="13.6vh";
    }
  })
   document.getElementById("txt").addEventListener("focusin",function(){
    document.getElementById("search").style.top="13.6vh";
   })
},0)
  setTimeout(()=>{search()},50)
}
search();


function success(data) {
    var api_key = '9902d233542845949faf72a3f296187a';
    var latitude = data.coords.latitude;
    var longitude = data.coords.longitude;
    var query = latitude + ',' + longitude;
    var api_url = 'https://api.opencagedata.com/geocode/v1/json'
  
    var request_url = api_url+ '?'+ 'key=' + api_key+ '&q=' + encodeURIComponent(query) + '&pretty=1'+ '&no_annotations=1';
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
    request.send(); 
    request.onload = function() {
  
      if (request.status === 200){
        var data = JSON.parse(request.responseText);
        try{
          document.getElementById("location").innerHTML = "Your Location: "+data.results[0].components.city;
        }
        catch{
        document.getElementById("location").innerHTML = "Your Location: "+data.results[0].components.county;
      };
        document.getElementById("licon").src="licon-removebg-preview.png";
        try{
          document.getElementById("slocate").innerHTML = "Your Location: "+data.results[0].components.city.toUpperCase();
        }
        catch{
        document.getElementById("slocate").innerHTML = "Your Location: "+data.results[0].components.county.toUpperCase();
      };
        var req = new XMLHttpRequest();
        var st="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=66334f31881496924b80ada017081aa2";
           req.open("GET", st)
           req.send();
           req.onreadystatechange = function(){
             if(req.readyState===4 && req.status===200){
                var wet=JSON.parse(req.responseText);
                var tmp=Number(wet.main.temp);
                tmp=Math.round(tmp);
                tmp=tmp-273;
                document.getElementById("tvalue").innerHTML= String(tmp)+" \xB0 C";
                document.getElementById("data").innerHTML= wet.weather[0].main;
                var maindata=wet.weather[0].main;
                document.getElementById("hum").innerHTML=wet.main.humidity;
                var time=wet.sys.sunset+19800;
                time=time%31536000;
                time=time%86400;
                var hr=time/3600;
                hr=Math.floor(hr);
                time=time%3600;
                var min=time/60;
                min=Math.floor(min);
                if(hr<10){hr="0"+hr;}
                if(min<10){min="0"+min;}
                document.getElementById("precip").innerHTML=hr+":"+min+" IST";
                time=wet.sys.sunrise+19800;
                time=time%31536000;
                time=time%86400;
                hr=time/3600;
                hr=Math.floor(hr);
                time=time%3600;
                min=time/60;
                min=Math.floor(min);
                if(hr<10){hr="0"+hr;}
                if(min<10){min="0"+min;}
                document.getElementById("sr").innerHTML=" Sunrise: "+hr+":"+min+" IST";
                document.getElementById("srise").src="sunrise2-removebg-preview.png";
                document.getElementById("prs").innerHTML=wet.main.pressure;
                document.getElementById("win").innerHTML=wet.wind.speed;
                if(maindata.toLowerCase()=="haze"){
                  document.getElementById("wicon").src="haze-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7vh";
                }
                else if(maindata.toLowerCase() =="mist"){
                  document.getElementById("wicon").src="fog-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7vh";
                }
                else if(maindata.toLowerCase() =="fog"){
                  document.getElementById("wicon").src="fog-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7vh";
                }
                else if(maindata.toLowerCase() =="drizzle"){
                  document.getElementById("wicon").src="umb-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7.3vh";
                }
                else if(maindata.toLowerCase() =="thunderstorm"){
                  document.getElementById("wicon").src="storm-removebg-preview.png";
                  document.getElementById("wicon").style.height="11vh";
                  document.getElementById("wicon").style.marginLeft="6.4vh";
                }
                else if(maindata.toLowerCase() =="clear"){
                  document.getElementById("wicon").src="sun-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7.3vh";
                }
                else if(maindata.toLowerCase() =="clouds"){
                  document.getElementById("wicon").src="cloud-removebg-preview.png";
                  document.getElementById("wicon").style.height="7vh";
                  document.getElementById("wicon").style.marginLeft="6vh";
                }
                else if(maindata.toLowerCase() =="rain"){
                  document.getElementById("wicon").src="precip-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7.3vh";
                }
                else{
                  document.getElementById("wicon").src="suncloud-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7.3vh";
                }}}
        
      } else if (request.status <= 500){
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      }
       else {
        console.log("server error");
      }
    };
    request.onerror = function() {
      console.log("unable to connect to server");
    };
    
} 

document.getElementById("search-button").addEventListener("click",function(){
    var loc="https://api.opencagedata.com/geocode/v1/json?q="+encodeURIComponent(document.getElementById("txt").value)+"&key=9902d233542845949faf72a3f296187a";
    var lochttp = new XMLHttpRequest();
    lochttp.open("GET",loc,true);
    lochttp.send();
    lochttp.onreadystatechange = function(){
        if(lochttp.readyState==4 && lochttp.status==200){
           var d=JSON.parse(lochttp.responseText);
           var lati=d.results[0].geometry.lat;
           var lon=d.results[0].geometry.lng;
           var req = new XMLHttpRequest();
           var st="https://api.openweathermap.org/data/2.5/weather?lat="+lati+"&lon="+lon+"&appid=66334f31881496924b80ada017081aa2";
           req.open("GET", st)
           req.send();
           req.onreadystatechange = function(){
             if(this.readyState==4 && this.status==200){
                var place=document.getElementById("txt").value.toUpperCase();
                document.getElementById("slocate").innerHTML=place;
                var wet=JSON.parse(this.responseText);
                var tmp=Number(wet.main.temp);
                tmp=Math.round(tmp);
                tmp=tmp-273;
                document.getElementById("tvalue").innerHTML= String(tmp)+" \xB0 C";
                document.getElementById("data").innerHTML= wet.weather[0].main;
                document.getElementById("hum").innerHTML=wet.main.humidity;
                var maindata=wet.weather[0].main;
                var time=wet.sys.sunset+19800;
                time=time%31536000;
                time=time%86400;
                var hr=time/3600;
                hr=Math.floor(hr);
                time=time%3600;
                var min=time/60;
                min=Math.floor(min);
                if(hr<10){hr="0"+hr;}
                if(min<10){min="0"+min;}
                document.getElementById("precip").innerHTML=hr+":"+min+" IST";
                time=wet.sys.sunrise+19800;
                time=time%31536000;
                time=time%86400;
                hr=time/3600;
                hr=Math.floor(hr);
                time=time%3600;
                min=time/60;
                min=Math.floor(min);
                if(hr<10){hr="0"+hr;}
                if(min<10){min="0"+min;}
                document.getElementById("sr").innerHTML=" Sunrise: "+hr+":"+min+" IST";
                document.getElementById("srise").src="sunrise2-removebg-preview.png";
                document.getElementById("prs").innerHTML=wet.main.pressure;
                document.getElementById("win").innerHTML=wet.wind.speed;
                if(maindata.toLowerCase()=="haze"){
                  document.getElementById("wicon").src="haze-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7vh";
                }
                else if(maindata.toLowerCase() =="mist"){
                  document.getElementById("wicon").src="fog-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7vh";
                }
                else if(maindata.toLowerCase() =="fog"){
                  document.getElementById("wicon").src="fog-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7vh";
                }
                else if(maindata.toLowerCase() =="drizzle"){
                  document.getElementById("wicon").src="umb-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7.3vh";
                }
                else if(maindata.toLowerCase() =="thunderstorm"){
                  document.getElementById("wicon").src="storm-removebg-preview.png";
                  document.getElementById("wicon").style.height="11vh";
                  document.getElementById("wicon").style.marginLeft="6.4vh";
                }
                else if(maindata.toLowerCase() =="clear"){
                  document.getElementById("wicon").src="sun-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7.3vh";
                }
                else if(maindata.toLowerCase() =="clouds"){
                  document.getElementById("wicon").src="cloud-removebg-preview.png";
                   document.getElementById("wicon").style.height="7vh";
                  document.getElementById("wicon").style.marginLeft="6vh";
                }
                else if(maindata.toLowerCase() =="rain"){
                  document.getElementById("wicon").src="precip-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7.3vh";
                }
                else{
                  document.getElementById("wicon").src="suncloud-removebg-preview.png";
                  document.getElementById("wicon").style.marginLeft="7.3vh";
                }
             }
           }
      }  
    }
})

window.onload = function(){
  navigator.geolocation.getCurrentPosition(success,console.error);
}
