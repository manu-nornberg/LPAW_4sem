let key;

function keypress(element){
    element.addEventListener('keydown', event => {
        key = event.key
    })
}

export {keypress, key}