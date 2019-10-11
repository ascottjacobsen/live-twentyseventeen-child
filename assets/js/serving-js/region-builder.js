export function buildRegionInfo(countryList, grid) {

    let countryDiv = document.createElement('div')
    let countryTitle = document.createElement('h3')
    countryTitle.innerHTML('test')
    countryDiv.appendChild('test')
    
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
            grid.appendChild(oppContainer)


            
    })
}