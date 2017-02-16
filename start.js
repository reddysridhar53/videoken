$(document).ready(function(){
      
  var videoIDs = ["M7lc1UVf-VE","M7lc1UVf-VE","M7lc1UVf-VE","M7lc1UVf-VE","M7lc1UVf-VE"];
  var videoCount = 0;
  
  getContent(videoIDs[videoCount]).then(function(response){

    showVideo(response)
  }, function(error){

    console.log("Error :"+error)
  })

  var interval = setInterval(function(){

    if( videoCount == videoIDs.length-1) {

      clearInterval(interval)

    }else{

      videoCount = videoCount+1;
      getContent(videoIDs[videoCount]).then(function(response){

        showVideo(response)
      }, function(error){

        console.log("Error :"+error)
      })
    }

  }, 10000)

  function getContent(vID){

    var defer = $.Deferred();
    $.ajax({
      method : "GET",
      url : "https://www.googleapis.com/youtube/v3/videos?id="+vID+"&part=snippet%2CcontentDetails%2Cstatistics&key=AIzaSyD_dJGd6fHmpMJ4oAf2hxFNBpNMoZwEYBs"
    }).done(function(response){

      defer.resolve(response)
    }).fail(function(error){

      defer.reject(error)
    })
    return defer.promise()
  }

  function showVideo(data){

    var video = data.items[0];
    var vId = video.id;
    var viewCount = video.statistics.viewCount;
    var title = video.snippet.title;

    var temp = '<iframe id="vk-video" src="https://www.youtube.com/embed/'+vId+'?start='+videoCount*10+'&end='+((videoCount*10)+10)+'enablejsapi=1&amp;version=3&amp;playerapiid=ytplayer&amp;autoplay=1"></iframe>'

    $(".youtube-content").html(temp);
    $(".title").html(title)
    $(".viewCount").html(viewCount)
  }

});
