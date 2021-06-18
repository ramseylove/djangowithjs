console.log('Main.js loaded')

const mainDiv = document.getElementById('main-div')
const postsDiv = document.getElementById('posts')
const spinnerDiv = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')

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

let visible = 3

const getData = () => {
    $.ajax({
        type: 'GET',
        url: `/json-posts/${visible}/`,
        success: function(response){
            console.log(response)
            // response.posts comes from serialized queryset variable
            // const posts = JSON.parse(response.posts)
            // console.log(posts)

            const posts = response.posts

            setTimeout(() =>{
                spinnerDiv.classList.add('not-visible')
                console.log(posts)
                posts.forEach(post => {
                postsDiv.innerHTML += `
                    <div class="card">
                      <h5 class="card-header">Featured</h5>
                      <div class="card-body">
                        <h5 class="card-title">${ post.title }</h5>
                        <p class="card-text">${ post.body }</p>
                        <a href="#" class="btn btn-primary">Details</a>
                        <button class="btn btn-danger">Like</button>
                      </div>
                    </div>
                `
            })
            }, 100)

        },
        error: function(error){
            console.log(error)
        }
    })
}

loadBtn.addEventListener('click', ()=>{
    spinnerDiv.classList.remove('not-visible')
    visible += 3
    getData()
})

getData()