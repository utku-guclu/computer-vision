// Import Transformers.js
import {pipeline} from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0';
let colors = {};

// Grab image to analyze
const img = document.getElementById('target-img');

// Specify which task to perform model to download
const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');

// Run the model by passing in the image and a config object
const output = await detector(img.scroll, {
    threshold: 0.9,
    percentage: true,
})

// Render the boxes into the DOM
output.forEach(renderBox);

function renderBox({ box, label }) {
    const { xmax, xmin, ymax, ymin } = box;
    if (!colors.hasOwnProperty(label)) {
        colors[label] = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0); 
    }
    
    const boxElement = document.createElement('div');
    boxElement.className = 'bounding-box';
    Object.assign(boxElement.style, {
        borderColor: colors[label],
        left: 100 * xmin + '%',
        top: 100 * ymin + '%',
        width: 100 * (xmax - xmin) + '%',
        height: 100 * (ymax - ymin) + '%',
    })
    document.getElementById('image-container').appendChild(boxElement);
    
    const labelElement = document.createElement('span');
    labelElement.textContent = label;
    labelElement.className = 'bounding-box-label';
    labelElement.style.backgroundColor = colors[label];
    boxElement.appendChild(labelElement);
}

