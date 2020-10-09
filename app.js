// global variable to store the data
let zodiacData;

// global variable to store the specific data
let zodiacName;
let zodiacYear;
let zodiacTrait;
let zodiacIdiom;

// global boolean values to help manage timing of p5 code
// let dataIsReady = false;
// let animationIsReady = false;

window.addEventListener('load', function() {
    console.log('page loaded');

    let button = document.getElementById('button');
    button.addEventListener('click', function() {

        powenArray = [];

        let inputText = document.getElementById('input').value;

        let API_SRC = "chinese_zodiac.json";

        fetch(API_SRC)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                zodiacData = data;

                // originally Craig was suggesting "include", however madulo was what I first tried(learnt from Ellen in CC) to work with my data, the startyear idea is perticular smart_MG's suggestion
                for (let i = 0; i < data.zodiac.length; i++) {
                    console.log(data.zodiac[i].startyear);

                    let rem = (inputText - data.zodiac[i].startyear) % 12;
                    console.log(rem);

                    // my original solution for 12 zodiacs
                    // for (let i = 0; i < data.zodiac.length; i++) {
                    //     console.log(data.zodiac[i].startyear);

                    // if (rem = data.zodiac.length - 6) {
                    //     let headingElement = document.getElementById('astrology_p_name');
                    //     headingElement.innerHTML = data.zodiac[0].name;
                    // }

                    // if (rem = data.zodiac.length - 5) {
                    //     let headingElement = document.getElementById('astrology_p_name');
                    //     headingElement.innerHTML = data.zodiac[1].name;
                    // }

                    // recognize object to be push_MG's great suggestion //
                    if (rem == 0) {
                        let headingElement = document.getElementById('name');
                        headingElement.innerHTML = data.zodiac[i].name;

                        // show the years of perticular zodiac
                        // let paraElement = document.getElementById('year');
                        // paraElement.innerHTML = data.zodiac[i].year;

                        //store the value for name, year and trait
                        zodiacName = data.zodiac[i].name;
                        zodiacYear = data.zodiac[i].year;
                        zodiacTrait = data.zodiac[i].trait;
                        zodiacIdiom = data.zodiac[i].idiom;

                    }
                }
            })

        .catch(error => {
            console.log("Error!!! :" + error)

        })
    })
});



/*===== p5 Code =====*/

// TCT 10.2 to preload data to make sure we have it before the data being called
// function preload() {
//     zodiacData = loadJSON("chinese_zodiac.json");
// }

// create an extra array to "push" data to the canvas_Aidon's great support
let powenArray = [];
console.log(powenArray);

function setup() {

    console.log("p5 setup!!!");
    createCanvas(1500, 600);
    // noLoop();
    // frameRate(10);

}

function draw() {
    background(200);

    // data is ready
    if (zodiacData) {

        // an attempt to use data in p5 - CL 5.5, draw circles with the number of zoodiacs in the json file
        // for (let i = 0; i < zodiacData.zodiac.length; i++) {

        // 12 dots by the number of zodiacs - class example
        // noStroke();
        // ellipse(100 + (i * 100), mouseX, 30);

        // this is an atampt to list all the zodiacs - TCT 10.3  
        // createElement('h1', zodiacYear)

        // }

        console.log(powenArray);

        // Push text in the for loop
        for (let j = 0; j < powenArray.length; j++) {
            fill(29, 161, 242);
            textSize(50);
            text(powenArray[j].text, powenArray[j].x + random(-5.5), powenArray[j].y + random(-5.5))
        }

        // change the line spacing of the poping zodiac trait
        fill(29, 161, 242);
        textSize(70);
        textLeading((mouseY / width) * 300);
        text(zodiacTrait, 50, 100, 500, 500);

    } else {
        console.log("not ready yet");

    }
}

function mouseClicked() {

    // push info - random idom as text, mouseX as X, mouseY as Y_Aidon's great support
    powenArray.push({ text: random(zodiacIdiom), x: mouseX, y: mouseY });

    // my original attempt to click and populate random data to canvas, it conflict with textleading which the background needs to draw all the time
    // fill(255);
    // textSize(32);
    // text(random(zodiacTrait_s), mouseX, mouseY);
}