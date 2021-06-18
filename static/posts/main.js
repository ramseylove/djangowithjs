console.log('Main.js loaded')

const mainDiv = document.getElementById('main-div')

// mainDiv.innerHTML = '<h3>hello from main.js</h3>'

$.ajax({
    type: 'GET',
    url: '/hello/',
    success: function(response){
        console.log('success', response.text)
        mainDiv.textContent = response.text
    },
    error: function(error){
        console.log('error', error)
    }
})