var express = require("express");
var app = express();

const cors = require('cors')

const jsonData = require('./../assets/json/restaurants.json'); 

var restaurants = jsonData.restaurants




function computeDistance(lat1, lon1, lat2, lon2){
    // Computes distance between two earth points using the harvesine formula
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    let a = Math.pow(Math.sin( ( lat2 - lat1 ) / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin( (lon2 - lon1) / 2 ), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers = 6371
    return(c * 6371);
    
}

function sortRestaurants(restaurants, lat, lon){
    for(var i = 0; i < restaurants.length; i++){
        restaurants[i].distance = computeDistance(lat, lon, restaurants[i].lat, restaurants[i].lng)
    }
    restaurants = restaurants.sort(
        (a, b) => (a.distance > b.distance) ? 1 : -1
    )
    return restaurants
}

app.use(cors({origin: 'http://localhost:4200'}))


app.get("/restaurants", (req, res, next) => {

    if(req.query.latitude != null && req.query.longitude != null){

        restaurants = sortRestaurants(restaurants, req.query.latitude, req.query.longitude)

    }
    response = []
    console.log(restaurants)
    for (var i = 0; i < restaurants.length; i++){
        response[i] = {
            id: restaurants[i].id,
            name: restaurants[i].name,
            open: restaurants[i].open,
            image_url: restaurants[i].image_url
        }
    }
    res.json(response)
});

app.get("/restaurant:id/catalog", (req, res, next) => {
    let query = null;
    if(req.query.query != null){
        query = req.query.query.split(',')
    }
    const rest_id = parseInt(req.url.split(':')[1].split('/')[0])
    const catalog = restaurants[rest_id].catalog

    if(query != null){
        response = [{"category": "Starters", products: []}, {"category": "Second Courses", products: []}]
        for (var i = 0; i < catalog.length; i++){
            for (var j = 0; j < catalog[i].products.length; j++){

                if( query.includes(catalog[i].products[j].name) ){

                    response[i].products.push({
                        name: catalog[i].products[j].name,
                        description: catalog[i].products[j].description,
                        image: catalog[i].products[j].image,
                        price: catalog[i].products[j].price
                    })
                }

            }
        }
        res.json(response);

    }
    else{res.json(catalog)}

});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});