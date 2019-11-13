import {
    clickToClose,
    unHide,
    clickOffParameters,
    hideObject
  } from "./close-nodes.js";
  
  let body = document.getElementsByTagName("body")[0];
  
  export function buildSphereContainer(
    container,
    sphereData,
    sphere,
    searchByRegion
  ) {
    //prevent body scrolling
    document.getElementsByTagName("body")[0].classList.add("body-fixed");
  
    //build node to return message if no matches found
    let noMatchContainer = document.createElement("div");
    let noMatchMessage = document.createElement("p");
    noMatchMessage.classList.add("no-match");
    noMatchMessage.innerHTML =
      "Sorry, we currently have no opportunities in " +
      (sphere === "United Kingdom" ? "The " + sphere : sphere) +
      ". Please contact us below and let us know how we can help.";
    let noMatchMessageButton = document.createElement("button");
    let noMatchLink = document.createElement("a");
    noMatchLink.setAttribute(
      "href",
      "/contact-us/?subject=looking-for-new-opportunities"
    );
    noMatchLink.innerHTML = "Contact Us";
    noMatchMessageButton.appendChild(noMatchLink);
    noMatchContainer.appendChild(noMatchMessage);
    noMatchContainer.appendChild(noMatchMessageButton);
  
    //Container Node
    let sphereInfo = document.createElement("div");
    sphereInfo.classList.add("country-info", "hidden-div");
    sphereInfo.setAttribute("id", "current-country-info");
  
    //Close button
    let closeContainerButton = document.createElement("span");
    let closeContainerDiv = document.createElement("div");
    closeContainerDiv.classList.add("close-container-wrapper");
    closeContainerButton.innerHTML = "x";
    closeContainerButton.classList.add("close-container");
    closeContainerDiv.appendChild(closeContainerButton);
    sphereInfo.appendChild(closeContainerDiv);
    closeContainerButton.addEventListener("click", e => {
      clickToClose(sphereInfo);
      unfreezeWindow(body);
      setTimeout(function() {
        unHide(document.getElementById("where-to-container"));
        unHide(document.getElementById('colophon'))
        unHide(document.getElementById('the-spheres'))
        
      }, 500);
    });
  
    //Sphere Title Node
    let sphereTitle = document.createElement("h2");
    sphereTitle.classList.add("fade-in", "container-title");
    if (sphere === "sports-music-art") {
      sphereTitle.innerHTML = "Sports, Music & Art"
    } else {
      sphereTitle.innerHTML = sphere.replace(/-/g, " ");
    }
    

    
  
    //Grid wrapper for individual opportunities
    let opportunitiesGridWrapper = document.createElement("div");
    opportunitiesGridWrapper.classList.add("opportunities-grid-wrapper");
  
    sphereInfo.appendChild(sphereTitle);
    sphereInfo.appendChild(opportunitiesGridWrapper);
  
    //add above nodes to the container
    container.appendChild(sphereInfo);
  
    buildSphereInfo(
      sphereData,
      sphere,
      opportunitiesGridWrapper,
    );
  
    //Extra space at bottom of grid
    let gridSpacer = document.createElement("div");
    gridSpacer.classList.add("grid-spacer");
    opportunitiesGridWrapper.appendChild(gridSpacer);
  
    clickOffParameters.parent = sphereInfo.id;
    freezeWindow(body);
    hideObject(document.getElementById("where-to-container"));
    hideObject(document.getElementById('colophon'))
    hideObject(document.getElementById('the-spheres'))
  
    setTimeout(() => {
      unHide(sphereInfo);
    }, 50);
  }
  
  function buildCountryInfo(countryList, grid) {
    countryList.map(opportunity => {
      let featuredImageUrl = opportunity.uagb_featured_image_src.full[0]
        ? "url(" + opportunity.uagb_featured_image_src.medium_large[0] + ")"
        : "url(" + "/wp-content/uploads/2019/05/GEM-square-only.png" + ")";
  
      let oppContainer = document.createElement("div");
      let oppHero = document.createElement("div");
      let fullTitle = document.createElement("h3");
      let location = document.createElement("h4");
      let time = document.createElement("p");
      let description = document.createElement("p");
      let actionButton = document.createElement("button");
      let actionLinkUrl =
        opportunity.link_external == 1
          ? "window.open('" + opportunity.action_link + "')"
          : "window.open('" + opportunity.link + "')";
  
      oppHero.classList.add("fade-in");
      fullTitle.classList.add("fade-in");
      location.classList.add("fade-in");
      description.classList.add("fade-in");
      actionButton.classList.add("fade-in");
  
      fullTitle.innerHTML = opportunity.full_title;
      location.innerHTML = opportunity.location + " | " + opportunity.time;
      time.innerHTML = opportunity.time;
      description.innerHTML = opportunity.description;
      actionButton.setAttribute("onclick", actionLinkUrl);
      actionButton.setAttribute("target", "_blank");
      actionButton.innerHTML = "Learn More";
      // actionButton.appendChild(actionLink)
  
      oppContainer.classList.add("opportunity-container");
      oppHero.classList.add("opp-hero");
  
      oppHero.style.backgroundImage = featuredImageUrl;
  
      oppContainer.appendChild(oppHero);
      oppContainer.appendChild(fullTitle);
      oppContainer.appendChild(location);
      oppContainer.appendChild(description);
      oppContainer.appendChild(actionButton);
      grid.appendChild(oppContainer);
      return oppContainer;
    });
  }
  
  function setupRegions(data, country) {
    let regionOppsList = data.filter(opp => opp.region.toString() === country);
    let countriesInRegion = [];
  
    regionOppsList.forEach(opp => countriesInRegion.push(opp.country[0]));
  
    let uniqueCountriesInRegion = [...new Set(countriesInRegion)];
  
    return uniqueCountriesInRegion;
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
  
  function freezeWindow(element) {
    element.classList.add("body-fixed");
  }
  
  function unfreezeWindow(element) {
    element.classList.remove("body-fixed");
  }


  
  function buildSphereInfo (data, sphere, container) {
    let listOfCountries = []
    data.forEach(opp => listOfCountries.push(opp.country[0]))
    let uniqueListOfCountries = [... new Set(listOfCountries)]
      
      uniqueListOfCountries.forEach(country => {
        
        
        let countryOppsList = data.filter(opp => country === opp.country[0]);
        if (country != undefined) {        
    
          //Actual opportunities grid
          let opportunitiesGrid = document.createElement("div");
          let countryTitle = document.createElement("h3")
          countryTitle.innerHTML = country.replace('_', ' ')
          countryTitle.classList.add('h3-title-large')
          opportunitiesGrid.classList.add("opportunities-grid");
          opportunitiesGrid.setAttribute("id", country + "-opportunities-grid");
          container.appendChild(countryTitle)
          container.appendChild(opportunitiesGrid);
          buildCountryInfo(countryOppsList, opportunitiesGrid);
        }
      });
    
  }
  