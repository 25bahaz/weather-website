const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=20f2f0a12806590ca897cbe6e5b1eee2&query=' + encodeURI(latitude) + ',' + encodeURI(longitude)

    request( {url , json: true} , (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.error) {
            callback('Unable to find coordinate. Try another search!', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                time: body.location.localtime,
                attributes: {
                    wind: body.current.wind_speed,
                    humidity: body.current.humidity,
                    precip: body.current.precip
                },
                is_day: body.current.is_day
            })
        }
    })
}

module.exports = forecast