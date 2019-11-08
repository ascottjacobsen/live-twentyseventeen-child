export function showFocusCities () {
    document.getElementById('focus-cities-group').classList.add('show-focus-cities')
}

//loop through api data and push all countries to an array
export function findCountries(data) {
let countriesArray = []
let newCountriesArray= []
let regionsArray =[]
data.forEach(opportunity => {
    if (opportunity.search_by_region == "1") {
        countriesArray.push(opportunity.region[0])
        regionsArray.push(opportunity.region[0])
    } else if (opportunity.country[0] != null){
        countriesArray.push(opportunity.country[0])
    }
});

//clear old system spaces from country names
countriesArray.forEach (country => {
    let newCountry = country.replace(' ', '_')
    newCountriesArray.push(newCountry)
})

//Uniqify country list
let uniqueCountriesArray = [...new Set(newCountriesArray)]

//Uniqify region list
let uniqueRegionsArray = [... new Set(regionsArray)]

addSearchByRegion(uniqueRegionsArray)

return uniqueCountriesArray
}

//add available has-opportunities CSS class to matching ids. Also add mouseEnter and Exit listners
export function addCountryHovers (data) {

data.forEach(country => {
    document.getElementById(country).classList.add('has-opportunities')
    removeCountryDims(country)
    document.getElementById(country).addEventListener("mouseenter", function(e) {
        buildCountryHoverTitle(e, country)
    })
    document.getElementById(country).addEventListener( "mouseleave", function() {
        removeCountryHoverTitle('country-hover-title')
    })
})
}

export function addCountryClicks(data, clickAction, containerArg1, containerArg2){
data.forEach(country => {
    document.getElementById(country).addEventListener('click', function(e){
        
        clickAction(containerArg1, containerArg2, country, e.target.getAttribute('search-by-region') ? true : false)

    })
})
}

//Build hovering title on countries or regions with opportunities
function buildCountryHoverTitle(e, countryName) {

let left = e.pageX + 20
let top = e.pageY  - 100
let countryHoverTitle = document.createElement('h3')
countryHoverTitle.setAttribute('id', 'country-hover-title')
countryHoverTitle.classList.add('hide-country-hover-title')
countryHoverTitle.innerHTML = countryName.replace('_', ' ')
countryHoverTitle.style.left = left.toString() + "px";
countryHoverTitle.style.top = top.toString() + "px";
countryHoverTitle.style.position = "absolute"
countryHoverTitle.style.margin = "0"
document.getElementById("the-big-map-container").appendChild(countryHoverTitle)

setTimeout(
    function(){
        countryHoverTitle.classList.remove('hide-country-hover-title')
}, 10
)
}

//Remove hovering country/region title on mouse exit
function removeCountryHoverTitle(elementID) {
document.getElementById(elementID).classList.add('hide')

setTimeout(
    function () {
        document.getElementById(elementID).remove();
    },20
)
}

function addSearchByRegion(array) {
array.forEach(region => {
    let parent = document.getElementById(region.toString())
    let children = parent.querySelectorAll('*')
    children.forEach(child => {
        child.setAttribute('search-by-region', true)
        removeCountryDims(child.id)
    })
})
}

export function dimAllCountries () {
let countries = document.getElementById('Map').querySelectorAll('*')
countries.forEach (country => country.classList.add('low-opacity'))
}

function removeCountryDims(elementID) {
document.getElementById(elementID).classList.remove('low-opacity')
}







