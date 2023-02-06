function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}



function updateSlider(name) {
    let elem = document.getElementById(name);
    let output = document.getElementById(name + "Output");
    let offset = (name.startsWith('mu')) ? muOffset : sigmaOffset;

    graphVariables.set(name, roundToTwo(elem.value * offset));
    // console.log(name, elem.value, graphVariables.get(name));
    output.value = graphVariables.get(name);
    board.update();
    // if (name == 'mu1') {
    //     mu1 = elem.value * muOffset; board.update(); output.value = roundToTwo(elem.value * muOffset);
    // } else if (name == 'sigma1') {
    //     sigma1 = elem.value * sigmaOffset; board.update(); output.value = roundToTwo(elem.value * sigmaOffset);
    // } else if (name == 'mu2') {
    //     mu2 = elem.value * muOffset; board.update(); output.value = roundToTwo(elem.value * muOffset);
    // } else if (name == 'sigma2') {
    //     sigma2 = elem.value * sigmaOffset; board.update(); output.value = roundToTwo(elem.value * sigmaOffset);
    // } else {
    //     console.log('unknown slider name: ' + name);
    // }
    // board.update();
}

// https://stackoverflow.com/questions/44114317/reset-slider-to-initial-values
document.getElementById('reset').onclick = function () {
    for (let [key, value] of graphVariables) {
        let elem = document.getElementById(key)
        elem.value = elem.getAttribute('data-initial')
        updateSlider(key)
    }
};

// Initialize the board
let graphVariables = new Map();
graphVariables.set('mu1', -10);
graphVariables.set('sigma1', 100);
graphVariables.set('mu2', 10);
graphVariables.set('sigma2', 100);

const muOffset = 0.1;
const sigmaOffset = 0.01;
const posInf = 100000;
const negInf = -100000;

const board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [-5, 1, 5, -1],
    axis: true,
    grid: true,
});

function normalDistribution(x, mu, sigma) {
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
}

console.log(graphVariables.get('mu1'))
console.log(graphVariables)

// var f1 = board.create('functiongraph', [function (x) { return normalDistribution(x, graphVariables.get('mu1'), graphVariables.get('sigma1')); }], {fixed: false, strokeWidth: 3});
// var f2 = board.create('functiongraph', [function (x) { return normalDistribution(x, graphVariables.get('mu2'), graphVariables.get('sigma2')); }], {fixed: false, strokeWidth: 3});
var f1 = board.create('functiongraph', [function (x) { return normalDistribution(x, graphVariables.get('mu1'), graphVariables.get('sigma1')); }], { strokeWidth: 2 });
var f2 = board.create('functiongraph', [function (x) { return normalDistribution(x, graphVariables.get('mu2'), graphVariables.get('sigma2')); }], { strokeWidth: 2 });

var p1 = board.create('point', [-1.0, 0.0], { visible: true }, { slideobject: p1 });
var l1 = board.create('perpendicular', [board.defaultAxes.x, p1], { strokeWidth: 2.5 });
var p2 = board.create('point', [1.0, 0.0], { visible: true }, { slideobject: p2 });
var l2 = board.create('perpendicular', [board.defaultAxes.x, p2], { strokeWidth: 2.5 });

console.log(l1);

var i1 = board.create('integral', [[negInf, function () { return p1.X() }], f1]);
var i2 = board.create('integral', [[function () { return p2.X() }, posInf], f2]);
// var i1 = board.create('integral', [[negInf, -2.0], f1]);
// var i2 = board.create('integral', [[2.0, 3.0], f2]);

console.log("l1" + p1.X());


// var intPos = board.create('intersection', [f1, f2, 1]);
// var intNeg = board.create('otherintersection', [f1, f2, intPos]);

window.onload = function () {
    for (let [key, value] of graphVariables) {
        let elem = document.getElementById(key);
        elem.setAttribute('data-initial', value);
        elem.value = value;
        updateSlider(key);
    }
};

console.log(i1.Value());
console.log(i2.Value());
