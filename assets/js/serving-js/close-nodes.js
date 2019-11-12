export let clickOffParameters = {
    parent: '',
    child: '',
    addedListenerFunction: '',
    consoleLoggy: function () {
        console.log(this)
    }
}


export function clickToClose (element) {
    hideObject(element)
    removeNode(element)
}

export function blurObject(element) {
    document.getElementById(element.id).classList.add('blur')
}

export function hideObject(element) {
    document.getElementById(element.id).classList.add('hide')
}

export function removeNode (element) {
    setTimeout(function() {
        document.getElementById(element.id).remove()
    }, 200)
}

export function unBlur (element) {
    document.getElementById(element.id).classList.remove('blur')
}

export function unHide (element) {
    document.getElementById(element.id).classList.remove('hidden-div')
    document.getElementById(element.id).classList.remove('hide')

}

