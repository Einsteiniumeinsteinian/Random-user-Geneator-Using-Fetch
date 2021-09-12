console.log('connected successfully');
const userAvatar = document.getElementById('avatar')
const fullName = document.querySelector('#fullname')
const username = document.querySelector('#username')
const userAge = document.querySelector('#age')
const userCity = document.getElementById('city')
const nextUserBtn = document.querySelector('#btn')

const url = 'https://randomuser.me/api/'


dotCaller()
fetchData()

nextUserBtn.addEventListener('click', function () {
    loader()
    dotCaller()
    fetchData()
})




function dotCaller() {
    let $ = (e) => document.querySelector(e);
    // Dots
    let dots = $(".dots");
    // Execution
    animate(dots, "dots--animate");
}

function fetchData() {
    fetch(url)
        .then(errorHandler)
        .then(parseJSON)
        .then(updateProfile)
        .catch(printError)
}


function errorHandler(res) {
    if (!res.ok) {
        throw Error('Something went wrong')
    }
    console.log('sending response')
    return res
}

function parseJSON(res) {
    console.log(res)
    console.log('parsing Response')
    return res.json().then(function(ParsedData){
        return ParsedData.results[0]
    })
}

function updateProfile(data) {
    console.log( data)
    console.log('setting data')
    userAvatar.src = data.picture.medium
    username.textContent = data.login.username
    fullName.textContent = data.name.first + ' ' + data.name.last
    userCity.textContent = data.location.city
    userAge.textContent = data.dob.age
    console.log('data set: DONE')
}
function printError(error) {
    console.log(error)
    fullName.textContent = "Something's wrong!! "
}


function loader() {
    console.log('setting loader')
    userAvatar.src = ''
    username.textContent = ''
    fullName.innerHTML = 'Loading <div class="dots"><span class="dot z"></span><span class="dot f"></span><span class="dot s"></span><span class="dot t" > <span class="dot l"></span></span ></div > <span class="loader"></span></div >'
    userCity.textContent = ''
    userAge.textContent = ''
    console.log('loader set: DONE')
   
}

// Function
// ========
function animate(element, className) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
            animate(element, className);
        }, 500);
    }, 2500);
}