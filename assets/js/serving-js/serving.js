// Script to create map interactivity for serving opporunities page
window.onload = function(){ 
    // Setup selectors
    let countrySelector = document.getElementById('country-select')
    
    

    //add event listeners
   
    countrySelector.addEventListener('change', function(e){
        let country = e.target.value
              
        let requestOpportunities = new XMLHttpRequest();
        requestOpportunities.open('GET', '/wp-json/wp/v2/serving_opportunity/?per_page=100');
        requestOpportunities.onload = function() {
            let opportunityData = JSON.parse(requestOpportunities.responseText)
            renderHTML(opportunityData, country)
        }

        requestOpportunities.send();
        
    })
}

function renderHTML(data, countryName) {
    let countryContainer = document.getElementById('country-info-container');
    countryContainer.classList.add('full-width')
    let country = countryName
    
    if (country === 'UK' ) {
        country = 'United Kingdom'
    }

    buildCountryContainer(countryContainer, country, data)
}

function buildCountryContainer(container, country, countryData) {
    //prevent body scrolling
    document.getElementsByTagName('body')[0].classList.add('body-fixed')

    //build node to return message if no matches found
    let noMatchContainer = document.createElement('div')
    let noMatchMessage = document.createElement('p')
    noMatchMessage.classList.add('no-match')
    noMatchMessage.innerHTML = "Sorry, we currently have no opportunities in " + (country === "United Kingdom" ? "The " + country : country) + ". Please contact us below and let us know how we can help."

    let noMatchMessageButton = document.createElement('button')
    let noMatchLink = document.createElement('a')
    noMatchLink.setAttribute('href', '/contact-us/?subject=looking-for-new-opportunities')
    noMatchLink.innerHTML = "Contact Us"
    noMatchMessageButton.appendChild(noMatchLink)

    noMatchContainer.appendChild(noMatchMessage)
    noMatchContainer.appendChild(noMatchMessageButton)

    //build individual nodes
    let countryInfo = document.createElement('div')
    countryInfo.classList.add('country-info', 'hidden-div')
    countryInfo.setAttribute('id', 'current-country-info')

    // countryInfo.addEventListener('scroll', function(){
    //     let pageTop = countryInfo.offsetTop
    //     let pageBottom = pageTop + window.innerHeight
    //     let tagsList = document.getElementById('opportunities-grid').querySelectorAll('*')
        
    //     for (let i = 0; i < tagsList.length; i++) {
    //         let tag = tagsList[i]
    //         let tagChildren = tag.children

    //         for (let x = 0; x < tagChildren.length; x++) {
    //             let thisTag = tagChildren[x]
    //             let rect = thisTag.getBoundingClientRect()
                
    //             if (rect.top < (pageTop - 50)) {
    //                 thisTag.classList.add('fade-out')
                    
    //             } else {
    //                 thisTag.classList.remove('fade-out')
    //             }
    //         }
    //     }
    // })

    let closeContainerButton = document.createElement('span')
    let closeContainerDiv = document.createElement('div')
    closeContainerDiv.classList.add('close-container-wrapper')
    closeContainerButton.innerHTML = 'x'
    closeContainerButton.classList.add('close-container')
    closeContainerDiv.appendChild(closeContainerButton)
    countryInfo.appendChild(closeContainerDiv)
    

    closeContainerButton.addEventListener("click", e => {
        let nodeToClose = e.target.parentElement.parentElement
        closeCountryContainer(nodeToClose)
    })

    let countryTitle = document.createElement('h2')
    countryTitle.classList.add('fade-in')
    countryTitle.innerHTML = country

    let opportunitiesGridWrapper = document.createElement('div')
    opportunitiesGridWrapper.classList.add('opportunities-grid-wrapper')


    let opportunitiesGrid = document.createElement('div')
    opportunitiesGrid.classList.add('opportunities-grid')
    opportunitiesGrid.setAttribute('id', "opportunities-grid")
    opportunitiesGridWrapper.appendChild(opportunitiesGrid)
    countryInfo.appendChild(countryTitle)
    countryInfo.appendChild(opportunitiesGridWrapper)

    let gridSpacer = document.createElement('div')
    gridSpacer.classList.add('grid-spacer')
    opportunitiesGridWrapper.appendChild(gridSpacer)

    //add above nodes to the container
    container.appendChild(countryInfo)

    let countryOppsList = countryData.filter(opp => opp.country === country)
    countryOppsList == 0 ? countryInfo.appendChild(noMatchContainer) : buildCountryInfo(countryOppsList)

    function buildCountryInfo(countryList) {
        countryList.map(opportunity => {
            
                let featuredImageUrl = opportunity.uagb_featured_image_src.full[0] ? 'url(' + opportunity.uagb_featured_image_src.medium_large[0] + ')' : 'url(' + '/wp-content/uploads/2019/05/GEM-square-only.png' + ')'

                let oppContainer = document.createElement('div')
                let oppHero = document.createElement('div')
                let fullTitle = document.createElement('h3')
                let location = document.createElement('h4')
                let time = document.createElement('p')
                let description = document.createElement('p')
                let actionButton = document.createElement('button')
                let actionLinkUrl = opportunity.link_external == 1 ? "window.open('" + opportunity.action_link + "')" : "window.open('" + opportunity.link + "')"

                oppHero.classList.add('fade-in')
                fullTitle.classList.add('fade-in')
                location.classList.add('fade-in')
                description.classList.add('fade-in')
                actionButton.classList.add('fade-in')
                
                fullTitle.innerHTML = opportunity.full_title
                location.innerHTML = opportunity.location + ' | ' + opportunity.time
                time.innerHTML = opportunity.time
                description.innerHTML = opportunity.description
                actionButton.setAttribute('onclick', actionLinkUrl)
                actionButton.setAttribute('target', "_blank")
                actionButton.innerHTML = "Learn More"
                // actionButton.appendChild(actionLink)

                oppContainer.classList.add('opportunity-container')
                oppHero.classList.add('opp-hero')

                oppHero.style.backgroundImage = featuredImageUrl

                oppContainer.appendChild(oppHero)
                oppContainer.appendChild(fullTitle)
                oppContainer.appendChild(location)
                // oppContainer.appendChild(time)
                oppContainer.appendChild(description)
                oppContainer.appendChild(actionButton)
                opportunitiesGrid.appendChild(oppContainer)


                
        })
    }
    setTimeout(function(){
        document.getElementById('form-group').classList.add('blur')
        countryInfo.classList.remove('hidden-div')
    }, 50)

    let page = document.getElementById('page')
    page.addEventListener('click', e => {

        if (e.target.id != "current-country-info") {
            let theParent = document.getElementById('current-country-info')
            let theChild = e.target
            
            if (!isDescendant(theParent, theChild)) {
                closeCountryContainer(countryInfo)
            }
        } 
    })
}

function closeCountryContainer (container) {
    let containerToClose = container
    containerToClose.classList.add('hidden-div')
    containerToClose.parentNode.classList.remove('full-width')
    // console.log(containerToClose.parentNode)
    document.getElementById('form-group').classList.remove('blur')
    

    setTimeout(function() {
        containerToClose.remove()
    }, 200)

    document.getElementsByTagName('body')[0].classList.remove('body-fixed')
}

function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

