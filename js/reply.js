
function reply(transcript) {
    responsiveVoice.setDefaultVoice("UK English Female");
     
      if (transcript.includes('how are you') || transcript.includes('are you fine') || transcript.includes('how are you doing today')) {
        var finalText = greeting[Math.floor(Math.random()*greeting.length)];
         responsiveVoice.speak(finalText);
         replymsg = document.createElement('div');
    replymsg.setAttribute('id', 'recieved');
    replymsg.textContent= finalText;
    messages.appendChild(replymsg);
        }
     else if(timeQ.includes(transcript)){
        var time = now.getHours() + " hours " + now.getMinutes() + " minutes. ";
        var finalText = "The time is "+time;
        responsiveVoice.speak(finalText);
        replymsg = document.createElement('div');
    replymsg.setAttribute('id', 'recieved');
    replymsg.textContent= finalText;
    messages.appendChild(replymsg);
    }
    else if(dateQ.includes(transcript)){
        var date = now.getDate() + " " + month[now.getMonth()] + " " + now.getFullYear();
        var finalText = "The date is "+date;
        responsiveVoice.speak(finalText);
    replymsg = document.createElement('div');
    replymsg.setAttribute('id', 'recieved');
    replymsg.textContent= finalText;
    messages.appendChild(replymsg);

    }
    else if(dayQ.includes(transcript)){
        var day = weekday[now.getDay()];
        var finalText = "Today is "+day;
        responsiveVoice.speak(finalText);
    replymsg = document.createElement('div');
    replymsg.setAttribute('id', 'recieved');
    replymsg.textContent= finalText;
    messages.appendChild(replymsg);
    }
    else if(whoQ.includes(transcript)){
        var finalText = "I am a personal assistant that is useful but \n unnamed because my dev went mad making me.";
        responsiveVoice.speak(finalText);
    replymsg = document.createElement('div');
    replymsg.setAttribute('id', 'recieved');
    replymsg.textContent= finalText;
    messages.appendChild(replymsg);
    }
    else if(transcript.endsWith('weather')){
        var city = transcript.split("weather").shift();
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+appkey;
        httpRequest(searchLink, parseIt);
    }

    else if(transcript.includes('weather please')){
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let GeoWurl = "api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+appkey;
                console.log(GeoWurl);
                httpRequest(GeoWurl, parseIt);
              });
          } else {
              var finalText =  "Couldn't acquire your location.";
            replymsg = document.createElement('div');
    replymsg.setAttribute('id', 'recieved');
    replymsg.textContent= finalText;
    messages.appendChild(replymsg);
          }
    }

        else if(transcript.endsWith('gif')){
            var tag = transcript.split("gif").shift();
            const giphy = {
                baseURL: "https://api.giphy.com/v1/gifs/",
                apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
                tag: tag,
                type: "random",
                rating: "pg-13"
            };
            let giphyURL = encodeURI(
                giphy.baseURL +
                    giphy.type +
                    "?api_key=" +
                    giphy.apiKey +
                    "&tag=" +
                    giphy.tag +
                    "&rating=" +
                    giphy.rating
            );
            console.log(giphyURL);
            $('document').ready(function(){
                
                var newGif = () => $.getJSON(giphyURL, json => renderGif(json.data));

	// Display Gif in gif wrap container
	var renderGif = _giphy => {
        console.log(_giphy);
        const gif = document.createElement('img');
        gif.setAttribute('src', _giphy.image_original_url);
        gif.setAttribute('style', 'height : 30vh; width : 30vh; ');
		replymsg = document.createElement('div');
    replymsg.setAttribute('id', 'recieved');
    replymsg.appendChild(gif);
    messages.appendChild(replymsg);
            };
            newGif();
        });
    }
     else{
         var finalText = "Couldn't get that."
         responsiveVoice.speak(finalText);
        replymsg = document.createElement('div');
    replymsg.setAttribute('id', 'recieved');
    replymsg.textContent= finalText;
    messages.appendChild(replymsg);
     }
 }