import {
  clickToClose,
  unHide,
  clickOffParameters,
  hideObject
} from "./close-nodes.js";

let body = document.getElementsByTagName("body")[0];

export function buildCountryContainer(
  container,
  countryData,
  country,
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
    (country === "United Kingdom" ? "The " + country : country) +
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
  let countryInfo = document.createElement("div");
  countryInfo.classList.add("country-info", "hidden-div");
  countryInfo.setAttribute("id", "current-country-info");

  //Close button
  let closeContainerButton = document.createElement("span");
  let closeContainerDiv = document.createElement("div");
  closeContainerDiv.classList.add("close-container-wrapper");
  closeContainerButton.innerHTML = "x";
  closeContainerButton.classList.add("close-container");
  closeContainerDiv.appendChild(closeContainerButton);
  countryInfo.appendChild(closeContainerDiv);
  closeContainerButton.addEventListener("click", e => {
    clickToClose(countryInfo);
    unfreezeWindow(body);
    setTimeout(function() {
      unHide(document.getElementById("where-to-container"));
    }, 500);
  });

  //Country Title Node
  let countryTitle = document.createElement("h2");
  countryTitle.classList.add("fade-in");
  countryTitle.innerHTML = country.replace("_", " ");

  //Grid wrapper for individual opportunities
  let opportunitiesGridWrapper = document.createElement("div");
  opportunitiesGridWrapper.classList.add("opportunities-grid-wrapper");

  countryInfo.appendChild(countryTitle);
  countryInfo.appendChild(opportunitiesGridWrapper);

  //add above nodes to the container
  container.appendChild(countryInfo);

  buildCountryOrRegion(
    countryData,
    country,
    opportunitiesGridWrapper,
    searchByRegion
  );

  //Extra space at bottom of grid
  let gridSpacer = document.createElement("div");
  gridSpacer.classList.add("grid-spacer");
  opportunitiesGridWrapper.appendChild(gridSpacer);

  clickOffParameters.parent = countryInfo.id;
  freezeWindow(body);
  hideObject(document.getElementById("where-to-container"));

  setTimeout(() => {
    unHide(countryInfo);
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
        : "window.open('" + opportunity.link.split("https://gemission.org.uk")[1] + "')";
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
    // oppContainer.appendChild(time)
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

function buildCountryOrRegion(data, country, container, searchByRegion) {
  if (searchByRegion) {
    let regionList = setupRegions(data, country);
    regionList.forEach(country => {
      let countryOppsList = data.filter(
        opp => opp.country.toString() === country
      );
      let element = document.createElement("h3");
      element.innerHTML = country;
      element.classList.add('h3-title-large')

      container.append(element);

      //Actual opportunities grid
      let opportunitiesGrid = document.createElement("div");
      opportunitiesGrid.classList.add("opportunities-grid");
      opportunitiesGrid.setAttribute("id", country + "-opportunities-grid");
      container.appendChild(opportunitiesGrid);
      buildCountryInfo(countryOppsList, opportunitiesGrid);
    });
  } else {
    //Actual opportunities grid
    let opportunitiesGrid = document.createElement("div");
    opportunitiesGrid.classList.add("opportunities-grid");
    opportunitiesGrid.setAttribute("id", "opportunities-grid");
    container.appendChild(opportunitiesGrid);

    let countryOppsList = data.filter(
      opp => opp.country.toString() === country
    );

    countryOppsList == 0
      ? container.appendChild(noMatchContainer)
      : buildCountryInfo(countryOppsList, opportunitiesGrid);
  }
}
