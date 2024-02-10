
//  1 create variable named accesskey, to store our api key
const accessKey = "ZmWaSH9HP0CrFwgEcex3OOA51VWbzSjLu882hYL-yAg"

// 2 importing elements from index.html amd creating elements to store value
const formEl = document.querySelector ("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData = ""    // 3 creating input data to store all the inside data and hold the keyword
let page  = 1;          //by default page = 1

async function searchImages (){   // 4 to use response and fetch we have to use async funtion
    inputData = inputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${
        inputData}&client_id=${accessKey}`   // 5 dynamic url

const response = await fetch (url)
const data = await response.json()    //6 converting data to json format

const results = data.results;

if (page===1){
    searchResults.innerHTML = ""
}

results.map((result)=>{   //7 duplicate template for others
    const imageWrapper = document.createElement('div') //creating div
    imageWrapper.classList.add("search-result")        //adding class search result

   //image tag = src and alt
    const image = document.createElement('img')
    image.src = result.urls.small
    image.alt = result.alt_description

   //anchor tag = href target textcontent
    const imageLink = document.createElement('a')
    imageLink.href = result.links.html
    imageLink.target = "_blank"
    imageLink.textContent = result.alt_description

    // 8 appending elements inside html page

    imageWrapper.appendChild(image)
    imageWrapper.appendChild(imageLink)
    searchResults.appendChild(imageWrapper)
})
page++

if (page>1) {
    showMore.style.display = "block"  // displaying show button

}
}
   
// 9 now calling these functions 
formEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1;
    searchImages()
})

//10  if someone click show buttuon calling this funtion
showMore.addEventListener("click",()=>{
   searchImages()
})
