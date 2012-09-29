define(
    [ 
      "libs/shim"
    , "libs/domReady"
    , "libs/jquery"
    ], 
    function(shim, document, $) {
        var options = {
            center: new google.maps.LatLng(51.129519, 0.908453),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        var map = new google.maps.Map($("#map").get(0), options)
        
        var mark = function(address) {
            $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + address)
                .success(
                    function(result) {
                        var location = result.results[0].geometry.location
                        
                        var position = new google.maps.LatLng(location.lat, location.lng)
                        
                        var config = {
                            position: position,
                            animation: google.maps.Animation.DROP,
                            title: "Home" 
                        }
                        
                        var marker = new google.maps.Marker(config)
                        
                        marker.setMap(map)
                    }
                )
                .error(
                    function() {
                        console.log("Failed, god knows why, to get a geocode!")
                    }    
                )
        }
        
        $("#add").click(
            function() {
                mark($("#address").val())    
            }
        )
    }
)       