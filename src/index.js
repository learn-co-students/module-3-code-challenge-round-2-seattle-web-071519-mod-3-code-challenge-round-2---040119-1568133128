document.addEventListener("DOMContentLoaded", main)

function main(){
    fetchData()
}


function fetchData(){
    fetch("http://localhost:3000/beers")
    .then(response => response.json())
    // .then(beers=> console.log(beers))
    .then(beers => sideBar(beers))
}

function sideBar(beers){
    let div1 = document.getElementById("col-md-4")
    let ul = document.getElementById("list-group")
    ul.setAttribute("class", "list-group")
    beers.forEach(beer => {
        let li= document.createElement("li")
        li.setAttribute("class", "list-group-item")
        li.textContent= beer.name
        ul.appendChild(li)
        li.onclick= e=>{
            displaySingle(e, beer)
        }
    })
    div.appendChild(ul)}


function displaySingle(e, beer){

    // console.log("hey")
    let div = document.getElementById("beer-detail")
    let h1 = document.createElement("h1")
    h1.textContent= beer.name
    h1.setAttribute("class", 'col-md-8')
    let img = document.createElement("img")
    img.src= beer.image_url
    let h3=document.createElement('h3')
    h3.textContent= beer.tagline
    let textarea= document.createElement("textarea")
    textarea.textContent=beer.description
    // console.log(beer.description)
    // textarea.addEventListener("click", e=> {
    //     editText(e, beer)
    // })
    while (div.hasChildNodes()){
        div.removeChild(div.lastChild)
    }
    let btnBreak = document.createElement("br")
    let button = document.createElement("button")
    button.setAttribute("class", "btn btn-info")
    button.textContent="Save"
    button.onclick= e => {
        editText(e, beer, textarea)
        console.log(e.target)
    }

    div.appendChild(h1)
    div.appendChild(img)
    div.appendChild(textarea)
    div.appendChild(btnBreak)
    div.appendChild(button)
}


//fix the patch to backend
function editText(e, beer, textarea){
    // console.log("target")
    // console.log(textarea.value)
    // console.log(e.target)
    // console.log("beer")
    // console.log(beer.id)
    fetch(`http://localhost:3000/beers/${beer.id}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            description: textarea.value
        }),
        }
    )
    //  textarea.value= beer.description
    
    fetchData()
}



