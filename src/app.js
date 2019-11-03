const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Deepak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Deepak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page',
        name: 'Deepak'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide a location'
        })
        return
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error }) 
        }

        forecast(latitude, longitude, (error, response) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                location: location,
                forecast: response
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMessage: 'Help Article Not Found',
        name: 'Deepak'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error', 
        errorMessage: 'Page not found',
        name: 'Deepak'
    })
})

app.listen(port, () => {
    console.log('Server is up on port', port)
})