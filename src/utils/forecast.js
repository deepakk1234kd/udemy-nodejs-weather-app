const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b9edd3398228e1befdae2091de3f4876/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service')
        } else if(body.error) {
            callback('error returned by weather service: ', body.error)
        } else {
            const { temperature, precipProbability } = body.currently
            callback(undefined, 'Temperature is ' + temperature + ' and rain probability is ' + precipProbability + ' and summary is ' + body.daily.data[0].summary)
        }
    })
}

module.exports = forecast
