const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=pk.eyJ1IjoiMjViYWhheiIsImEiOiJjbTFhb3J6MGQxdGJtMmtyNHEzaW9jcXcwIn0.9Lm77ojAD8w-jJaX2wKnnQ&limit=1'

    request({ url , json: true} , (error, { body: { features } } ) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].properties.coordinates.latitude,
                longtitude: features[0].properties.coordinates.longitude,
                location: features[0].properties.full_address,
                bbox: features[0].properties.bbox
            })
        }
    })
}

module.exports = geocode