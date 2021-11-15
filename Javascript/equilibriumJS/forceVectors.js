// Elements Highlights on mouse over
for(let i = 1; i < 10; i++)
{
    d3.select("#pe" + i.toString()).on("mouseover",function()
    {
        let svg = new SVG();
        svg.pElement[i-1].style.stroke = "black";
        svg.pElement[i-1].style.strokeWidth = ".3px";
        svg.pElement[i-1].style.strokeOpacity = "70%";
    });
}
// Element Highlight removed on mouse out
for(let i = 1; i < 10; i++)
{
    d3.select("#pe" + i.toString()).on("mouseout",function()
    {
        let svg = new SVG();
        svg.pElement[i-1].style.stroke = "";
    });
}
// Element display on click
for(let i = 1; i < 10; i++)
{
    d3.select("#pe" + i.toString()).on("click",function()
    {
        let svg = new SVG();
        svg.drawPElementSelect(i);
// Take care of table entries(function defined at forceTable.js
        tableValues(i);
    });
}

function getPressureElement()
{
    var pElement = [];
    for(let i = 1; i < 10; i++)
    {
        pElement.push(document.getElementById("pe" + i.toString()));
    }
    return pElement;
}

class SVG
{
    constructor()
    {
    // SVG Elements
        this.svg = document.getElementById("svg");
        this.axis = document.getElementById("axis");
        this.pElement = getPressureElement();
        this.ground = document.getElementById("ground");
        this.circle = document.getElementById("circle");
        this.pElementSelect = document.getElementById("peSelect");
        this.vector01 = document.getElementById("vector01");
        this.vector02 = document.getElementById("vector02");
        this.vector03 = document.getElementById("vector03");
        this.line = document.getElementById("line");
    }
}

SVG.prototype.drawAxis = function()
{
    this.axis.setAttribute('d', "M 10 120 V 10 M 11 10 L 5 15 M 9 10 L 15 15");
}

SVG.prototype.drawGround = function()
{
    let val = 120 - 11;
    this.ground.setAttribute('x',"20");
    this.ground.setAttribute('y',val.toString());
    this.ground.setAttribute('width',"90");
    this.ground.setAttribute('height',"11");
}

SVG.prototype.drawPElement = function()
{
    let val = 0;
    let str = "";
    for(let i = 0; i < 9; i++)
    {
        val = 120 - (i+2)*11;
        str = val.toString();
        this.pElement[i].setAttribute('x',"20");
        this.pElement[i].setAttribute('y',str);
        this.pElement[i].setAttribute('width',"90");
        this.pElement[i].setAttribute('height',"11");
    }
}

SVG.prototype.drawPElementSelect = function(i)
{
    this.setCircle();
    this.setElement(i-1);
    this.drawVectors(i-1);
    this.drawLine();

}

SVG.prototype.drawVectors = function(i)
{
    let dz = .1;
    let vector01Length = 25 * Math.exp(-(i+1) * dz);
    let vector03Length = 25 * Math.exp(-i * dz);
    let vector02Length = vector03Length - vector01Length;
    vector02Length += 5;

    let vector01Pont = "M 85 25 V " + (25 + vector01Length).toString() +
                        " M 85 " + (25 + vector01Length).toString() +
                         " L 90 " + (20 + vector01Length).toString() + " M 85 " + (25 + vector01Length).toString() +
                          " L 80 " + (20 + vector01Length).toString();
    let vector02Pont = "M 105 50 V " + (50 + vector02Length).toString() +
                        " M 105 " + (50 + vector02Length).toString() +
                         " L 110 " + (45 + vector02Length).toString() + " M 105 " + (50 + vector02Length).toString() +
                          " L 100 " + (45 + vector02Length).toString();
    let vector03Pont = "M 125 75 V " + (75 - vector03Length).toString() +
                        " M 125 " + (75 - vector03Length).toString() +
                         " L 130 " + (80 - vector03Length).toString() + " M 125 " + (75 - vector03Length).toString() +
                          " L 120 " + (80 - vector03Length).toString();

    this.vector01.setAttribute('d', vector01Pont);
    this.vector02.setAttribute('d', vector02Pont);
    this.vector03.setAttribute('d', vector03Pont);
}

SVG.prototype.drawLine = function(i)
{
    this.line.setAttribute('x1','148');
    this.line.setAttribute('y1','25');
    this.line.setAttribute('x2','148');
    this.line.setAttribute('y2','75');
}

SVG.prototype.setCircle = function()
{
    this.circle.setAttribute('cx','100');
    this.circle.setAttribute('cy','50');
    this.circle.setAttribute('r','50');
    this.circle.setAttribute('fill','#daeddf');
    this.circle.setAttribute('opacity','70%');
    this.circle.setAttribute('stroke','#c2c200');
}

SVG.prototype.setElement = function(i)
{
    this.pElementSelect.setAttribute('x','65');
    this.pElementSelect.setAttribute('y','25');
    this.pElementSelect.setAttribute('width','75');
    this.pElementSelect.setAttribute('height','50');
    this.pElementSelect.setAttribute('fill',this.pElement[i].getAttribute('fill'));
}

let svg = new SVG();
svg.drawAxis();
svg.drawGround();
svg.drawPElement();

//var svg = document.getElementById("svg");
//var ref1 = vector01.getBoundingClientRect().y;
////var ref2 = vector01.getBoundingClientRect().y + 30*svg.getBoundingClientRect().height/200
//
//d3.select("#vector01").call(d3.drag().on("drag",function(){
//    var vector01 = document.getElementById("vector01");
//    var mousePos = window.event;
//    var svg = document.getElementById("svg");
//
//    vector01.points[0].y = (mousePos.clientY - ref1)*200/svg.getBoundingClientRect().height;
//    if((70 - vector01.points[0].y) > 0)
//    {
//        vector01.points[1].y = vector01.points[0].y + 30;
//        vector01.points[2].y = vector01.points[0].y + 30;
//        vector01.points[5].y = vector01.points[0].y + 30;
//        vector01.points[6].y = vector01.points[0].y + 30;
//    }else{
//        vector01.points[1].y = vector01.points[0].y - 30;
//        vector01.points[2].y = vector01.points[0].y - 30;
//        vector01.points[5].y = vector01.points[0].y - 30;
//        vector01.points[6].y = vector01.points[0].y - 30;
//    }
//}));