//actuellement librairie de manipulation des formes-standard qui centralise les opérations sur les shape
//le temps de trouver une meilleure solution et pouvoir exploiter les imports javascript

function getStdShape(family) {
    //définition avec une longueur de 50px et construit à l'origine
    //1: triangle équilatéral
    //2: carré
    //3: cercle
    //Maintenant comment bien exploiter ces définitions et créer les autres 
    //le souci est la gestion de la position lors de la construction
    // => différencier définition et construction ?
    // exemple carré std = construction d'un carré de 50x50  
    let shape = ''
    switch (family) {
        case 1:
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
            shape.setAttribute('points', '25,7.5 50,50 0,50')
            shape.setAttribute('fill', 'yellow')
            // shape = `<polygon points="25,11 45,45 5,45" stroke="black" stroke-width="2" fill="yellow" />`
            break
        case 2:
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            shape.setAttribute('x', 0)
            shape.setAttribute('y', 0)
            shape.setAttribute('width', 50)
            shape.setAttribute('height', 50)
            shape.setAttribute('fill', 'red')
            // shape = `<rect x="5" y="5" width="40" height="40" stroke="black" stroke-width="2" fill="red" />`
            break
        case 3:
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            shape.setAttribute('cx', 25)
            shape.setAttribute('cy', 25)
            shape.setAttribute('r', 25)
            shape.setAttribute('fill', 'green')
            // shape = `<circle cx="25" cy="25" r="20" stroke="black" stroke-width="2" fill="green" />`
            break
    }
    shape.setAttribute('stroke-width', 2)
    shape.setAttribute('stroke', 'black')
    shape.setAttribute('opacity', .75)
    
    return shape
}

function getCGShape(shape) {
    let box = shape.getBoundingClientRect()
    let cx = box.x + box.width / 2
    let cy = box.y + box.height / 2
    return { x: cx, y: cy }
}

function updateTransformShape(shape) { 
    let transforms = []
    shape.removeAttribute('transform')
    if (shape.translate) { transforms.push(`translate(${shape.translate.x},${shape.translate.y})`)}
    if (shape.angle) { 
        let center = getCGShape(shape)
        transforms.push(`rotate(${shape.angle}, ${center.x}, ${center.y})`)
    }
    if (!transforms.length) { return }
    shape.setAttribute('transform', transforms.join(' ') )
}

function selectShape(shape) { shape.setAttribute('stroke', 'magenta') }

function unselectShape(shape) { shape.setAttribute('stroke', 'black') }

function translateShape(shape, position) {
    shape.translate = {x: position.x - 25, y: position.y - 25}
    updateTransformShape(shape)
}

function rotateShape(shape, angle) {
    shape.angle = shape.angle + angle || angle
    updateTransformShape(shape)
}
