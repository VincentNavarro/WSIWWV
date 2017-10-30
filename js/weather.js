$(document).ready(function(){
   var tempType;                                                          // stores C or F
   var dataStore;                                                         // stores the json object
   var $tempDisplay = $("#tempDisplay");    // get tempDisplay innerhtml
   var $reccDisplay = $("#reccDisplay");    // get reccomended display
   var headHidden = false;
   var jacket = "";
   var mittens = "";
   var regWear = "";
   var zipCode;

   // When either C or F buttons are clicked
   $(".temp").click(function(){

   // Get zipcode
      zipCode = $(".zipCode").val();

      if(headHidden == false){
         //Hide headWrap, and slide up everytying below it smoothly
         $("#headWrap").fadeOut(1000,function(e){
            $("#headWrap").css({"visibility":"hidden",display:'block'}).fadeOut();
         });
         headHidden = true;
      }


      // the id of the button that was clicked
      var id = this.id;

      // If the id of the button clicked is fah or cel
      // Stores the tempType based on that
      if(id == "fah"){
         tempType = "F";
      }else if(id == "cel"){
         tempType = "C"
      }

      $.ajax({
          url: "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + zipCode + "') and u='" + tempType +"'&format=json",
          dataType: 'json',
          success: function (data){
            // Stores the json object for later use
            dataStore = data;

            // store the results in results variable
            var results = data.query.results;
            var city = results.channel.location.city;             // Gets city
            var currTemp = results.channel.item.condition.temp;
            var thetemp;        //Always compare by F

            if(tempType == "F"){
               theTemp = currTemp;
            }else{
               theTemp = ((currTemp * 9) / 5) + 32;
            }

            if(theTemp <= 68 ){
               if(theTemp < 32){
                  jacket += "need a super heavy jacket";
                  mittens += "some mittens";
                  regWear += "a longsleeve shirt";
               }else if(theTemp >= 32 && theTemp < 45){
                  jacket += "need a heavy jacket"
                  mittens += "some mittens";
                  regWear += "a longsleeve shirt";
               }else{
                  jacket += 'want a light jacket';
                  mittens += 'no mittens';
                  regWear += 'a shirt';
               }
            }else{
               if(theTemp > 110){
                  jacket += "don't want a jacket";
                  mittens += "no mittens at all";
                  regWear += "a tank top";
               }else if(theTemp <= 110 && theTemp > 90){
                  jacket += "don't want a jacket";
                  mittens += "no mittens at all";
                  regWear += "a tank top";
               }else if(theTemp <= 90 && theTemp > 79){
                  jacket += "don't want a jacket";
                  mittens += "no mittens at all";
                  regWear += "a tank top";
               }else{
                  jacket += "don't want a jacket";
                  mittens += "no mittens at all";
                  regWear += "a tank top";
               }
            }

            //

            // If theres nothing in results, the zip code was entered incorrectly
            // Else theres an object within results
            if(results == null){
               $tempDisplay.hide().html("You've entered an invalid zip code, please try again");
            }
            else{
               // $tempDisplay.innerHTML  = "Well, IN THIS " + results.channel.item.condition.temp + "°" + tempType + " IN ";
               $tempDisplay.hide().html('In this <span class="clotheText"><i>' + currTemp + "°" + tempType + '</i></span> weather in <span class="clotheText"><i>'+ city +'</i></span>').fadeIn(4000);

               $reccDisplay.hide().html(
                  'I would definitely have <span class="clotheText"><i>'+ regWear +'</i></span> handy. ' +
                  'You probably <span class="clotheText"><i>'+ jacket +'</i></span>. ' +
                  'I would also recccomend <span class="clotheText"><i>'+ mittens +'</i></span>. '
               ).fadeIn(6000);
            }

            // tempDisplay.addClass('show');

          },
          error: function (data){
             $tempDisplay.hide().html("This application isn't working right now, try again later");
          }
       });
   });


});
