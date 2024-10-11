const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

hbs.registerHelper('getIndex', function(array, index) {
    return array[index];
  });

// Define paths for express config 
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // pug
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static dir to serve
app.use(express.static(publicDir))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: '25bahaz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: '25bahaz',
        title: 'About ME'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        list: [
            'What is long',
            'What is lat',
            'What is percip'
        ],
        name: '25bahaz',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
        if (!req.query.address) {
            return res.status(400).send({
                error: 'You must provide a address!'
            })
        }

        geocode(req.query.address, (error, { latitude, longtitude, location, bbox} = {}) => {
            if (error) {
                return res.status(400).send({
                    error
                })
            } 
            forecast(latitude, longtitude, (error, forecastData) => {
                if (error) {
                    return res.status(400).send({
                        error
                    })
                }
                res.send({
                    temperature: forecastData.temperature,
                    feelslike: forecastData.feelslike,
                    time: forecastData.time,
                    description: forecastData.description,
                    address: req.query.address,
                    location,
                    latitude: latitude,
                    longtitude: longtitude,
                    bbox: bbox,
                    attributes: {
                        wind: forecastData.attributes.wind,
                        humidity: forecastData.attributes.humidity,
                        precip: forecastData.attributes.precip
                    },
                    is_day: forecastData.is_day
                }) 
            })
        })
})

app.get('/help/long', (req, res) => {
    res.send('Long is a short version of longtitude. On coordinate system')
})

app.get('/help/lat', (req, res) => {
    res.send('Lat is a short version of lattitude. On coordinate system')
})

app.get('/help/percip', (req, res) => {
    res.send('Percip is the percantage of the rain per meter square')
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article Not Found',
        name: '25bahaz',
        title: '404!'
    })
})

app.get('*' , (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        name: '25bahaz',
        title: '404!'
    })
})

app.listen(3000, async () => {
    console.log('Server is up on 3000.')

})