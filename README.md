The wateher Application

The Weather application is a application which is a webservar application that uses two specific API's to get forecast data

The API's:
 
    https://weatherstack.com/ -> Gives the forecast of the given coordinates 

    src/utils/forecast -> https://api.weatherstack.com/current?access_key=[YOUR_API_KEY]&query=' + encodeURI(latitude) + ',' + encodeURI(longitude)

    https://www.mapbox.com/ -> Gives the location of the given coordinates

    src/utils/geocode -> 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=[YOUR_API_KEY]&limit=1'

