$(document).ready(function(){
    $("#locationForm").submit(function(e){
        e.preventDefault();
        var data = $(this).serialize();
        document.getElementById('locationForm').reset()
        $.post('/places_search', data, function(data, status, xhr){
            data.results.forEach(function(place){
                console.log(place)
                $('.results').append("<p><a href='/locations/"+place.place_id+"'>"+place.name+"</a> - "+place.rating+"</p>");
            })
            
        })
    });
});