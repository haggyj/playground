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
        
        var initialise = function() {
            $.getJSON("http://127.0.0.1:50000/visits")
                .success(
                    function(visits) {
                        visits.forEach(
                            function(element) {
                                mark(element.latitude, element.longitude)
                            }
                        )
                    }
                )
        }()

        var mark = function(latitude, longitude) {
            var position = new google.maps.LatLng(latitude, longitude)
            
            var config = {
                position: position,
                animation: google.maps.Animation.DROP,
                title: "Home" 
            }
            
            var marker = new google.maps.Marker(config)
            
            marker.setMap(map)
        }
        
        $("#add").click(
            function() {
                var address = $("#address").val()
                var vet = $("#vet").val()

                $.post(
                    "http://localhost:50000/visit",
                    {
                        address: address,
                        vet: vet
                    }
                )
                .success(
                    function(coordinates) {
                        coordinates = JSON.parse(coordinates)

                        mark(coordinates.latitude, coordinates.longitude)
                    }
                )
                .error(
                    function() {
                        console.log("sorry, but couldn't find an address")
                    }
                )  
            }
        )
    }
)       