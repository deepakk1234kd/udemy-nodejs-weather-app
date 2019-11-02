const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    message1.textContent = 'loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location)
    .then(res => res.json())
    .then(({error, location, forecast} = {}) => {
        if(error) {
            return message1.textContent = error
        }

        message1.textContent = location
        message2.textContent = forecast
    })
})