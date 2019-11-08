import {buildSphereContainer} from "./sphere-builder.js"

import {
    clickToClose,
    unHide,
    clickOffParameters,
    hideObject
  } from "./close-nodes.js";
  
  let body = document.getElementsByTagName("body")[0];

export function findSpheres (data) {
    let sphereList = data
    let spheresArray = [];
    let uniqueSpheresArray = [];
    data.forEach ( opp => {
        if (opp.sphere != "") {
            spheresArray.push(opp.sphere[0])
        }
    })

    uniqueSpheresArray = [...new Set(spheresArray)]
    addClickListeners(uniqueSpheresArray, sphereList)
}

function addClickListeners (array, data) {
    array.forEach(sphere => {
        document.getElementById(sphere).classList.remove('sphere-without-opportunities')
        document.getElementById(sphere).classList.add('sphere-with-opportunities')
        document.getElementById(sphere).addEventListener('click', function (){
            let thisSphereData = data.filter(opp => sphere === opp.sphere[0])
            buildSphereContainer(document.getElementById('country-info-container'), thisSphereData, sphere, true)
        })
    })
}


