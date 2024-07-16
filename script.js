
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(7, window.innerWidth / window.innerHeight, 0.6, 1000);

camera.position.set(20, 1, 10);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;

let controls;

let objToRender = 'scuderia_ferrari_f1_sf23_2023';

const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender === "scuderia_ferrari_f1_sf23_2023" ? 25 : 500;

const topLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "scuderia_ferrari_f1_sf23_2023" ? 5 : 1);
scene.add(ambientLight);

if (objToRender === "scuderia_ferrari_f1_sf23_2023") {
  controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  if (object && objToRender === "scuderia_ferrari_f1_sf23_2023") {
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//uncomment to move with the cursor
// document.onmousemove = (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
// }

animate();


const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
        else{
            entry.target.classList.remove("show");
        }
    });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el)=> observer.observe(el));

// script.js
const selectedDrivers = [];
const maxDrivers = 20;

document.addEventListener('DOMContentLoaded', (event) => {
  const yourButtonElement = document.getElementById('addbtn');
  if (yourButtonElement) {
    yourButtonElement.addEventListener('click', addDriver);
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  const yourButtonElement = document.getElementById('displaybtn');
  if (yourButtonElement) {
    yourButtonElement.addEventListener('click', displayDrivers);
  }
});
document.addEventListener('DOMContentLoaded', (event) => {
  const form_submit = document.getElementById('prediction-form');
  if (form_submit) {
    form_submit.addEventListener('submit', sendtoapi);
  }
});

function addDriver() {
    const selectElement = document.getElementById('f1-racers');
    const selectedDriver = selectElement.options[selectElement.selectedIndex].text;

    if (selectedDrivers.length < maxDrivers) {
        selectedDrivers.push(selectedDriver);
        alert(`${selectedDriver} added to the list.`);
    } else {
        alert('Maximum number of drivers selected.');
    }
}

function displayDrivers() {
    const driversListElement = document.getElementById('drivers-list');
    const circuitElement = document.getElementById('selected-circuit');
    const circuitInput = document.getElementById('circuit').value;

    driversListElement.innerHTML = '';

    selectedDrivers.forEach((driver, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `POS ${index + 1}: ${driver}`;
        driversListElement.appendChild(listItem);
    });

    circuitElement.textContent = `Selected Circuit: ${circuitInput}`;
    console.log(selectedDrivers);
}

function sendtoapi(event) {
    event.preventDefault();
    const circuitInput = document.getElementById('circuit').value;
    document.getElementById('selected-drivers-input').value = JSON.stringify(selectedDrivers);
    const selectedDriversInput = selectedDrivers;

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedDrivers: selectedDriversInput, circuit: circuitInput }),
    })
    .then((response) => response.json())
    .then((data) => {
        displayResults(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// function displayResults(results) {
//   const resultsListElement = document.getElementById('results-list');
//   resultsListElement.innerHTML = '';

//   const card1 = document.getElementById('card1');
// if (card1 && results[2]) {
// card1.querySelector('p').textContent = results[2];
// }

// // Update the content of the second card
// const card2 = document.getElementById('card2');
// if (card2 && results[1]) {
// card2.querySelector('p').textContent = results[1];
// }

// // Update the content of the third card
// const card3 = document.getElementById('card3');
// if (card3 && results[0]) {
// card3.querySelector('p').textContent = results[0];
// }
// }

function displayResults(results) {
  const resultsListElement = document.getElementById('results-list');
  resultsListElement.innerHTML = '';

  const card1 = document.getElementById('card1');
  const card2 = document.getElementById('card2');
  const card3 = document.getElementById('card3');
  const cardContainer = document.querySelector('.cards-container');

  results.forEach(result => {
      const parts = result.split(', ');
      const namePart = parts[0].split(': ')[1];
      const gridPart = parts[1].split(': ')[1];
      const predictionPart = parts[2].split(': ')[1].match(/\d+/)[0];
      const probabilityPart = parts[3].split(': ')[1];

      let predictionPosition;
      switch (predictionPart) {
          case '1':
              predictionPosition = '1st';
              break;
          case '2':
              predictionPosition = '2nd';
              break;
          case '3':
              predictionPosition = '3rd';
              break;
          default:
              predictionPosition = `${predictionPart}th`;
      }

      const formattedText = `
          ${namePart}<br>
          Grid: ${gridPart}<br>
          Predicted pos: ${predictionPosition}<br>
          Probability: ${probabilityPart}
      `;

      const lastName = namePart.split(' ').pop().toLowerCase();
      const last3letters = lastName.substring(0, 3).toUpperCase();
      const prediction = parseInt(predictionPart);

      if (prediction === 1) {
          card1.querySelector('p').innerHTML = formattedText;
          card1.querySelector("h3").textContent = last3letters;
          card1.style.backgroundImage = `url('f1_photos/driver photos/${lastName}.jpg')`;
      } else if (prediction === 2) {
          card2.querySelector('p').innerHTML = formattedText;
          card2.querySelector("h3").textContent = last3letters;
          card2.style.backgroundImage = `url('f1_photos/driver photos/${lastName}.jpg')`;
      } else if (prediction === 3) {
          card3.querySelector('p').innerHTML = formattedText;
          card3.querySelector("h3").textContent = last3letters;
          card3.style.backgroundImage = `url('f1_photos/driver photos/${lastName}.jpg')`;
      }
  });
  cardContainer.style.visibility = 'visible';
}

let circuits = ['Melbourne', 'Kuala Lumpur', 'Sakhir', 'Montmeló', 'Istanbul',
  'Monte-Carlo', 'Montreal', 'Magny Cours', 'Silverstone',
  'Hockenheim', 'Budapest', 'Valencia', 'Spa', 'Monza', 'Marina Bay',
  'Oyama', 'Shanghai', 'São Paulo', 'Indianapolis', 'Nürburg',
  'Imola', 'Suzuka', 'Las Vegas', 'Abu Dhabi', 'Buenos Aires',
  'Jerez de la Frontera', 'Estoril', 'Okayama', 'Adelaide',
  'Midrand', 'Castle Donington', 'Mexico City', 'Phoenix',
  'Le Castellet', 'Yeongam County', 'Rio de Janeiro', 'Detroit',
  'Kent', 'Zandvoort', 'Heusden-Zolder', 'Dijon', 'Dallas',
  'California', 'Nevada', 'Madrid', 'New York State', 'Anderstorp',
  'Ontario', 'Barcelona', 'Brussels', 'Clermont-Ferrand', 'Quebec',
  'Rouen', 'Le Mans', 'Reims', 'Eastern Cape Province', 'Styria',
  'Liverpool', 'Oporto', 'Berlin', 'Lisbon', 'Florida', 'Casablanca',
  'Pescara', 'Bern', 'Uttar Pradesh', 'Austin', 'Spielberg', 'Sochi',
  'Baku', 'Portimão', 'Mugello', 'Jeddah', 'Al Daayen', 'Miami'];

let list = document.getElementById("all-circuits");

circuits.forEach(function(circuit) {
    let li = document.createElement('li');
    li.textContent = circuit;
    list.appendChild(li);
});

function filterCircuits() {
 let input = document.getElementById("circuits-search").value.toUpperCase();
 let ul = document.getElementById("all-circuits");
 let ul2 = document.getElementById("matching-circuits");
 let li = ul.getElementsByTagName("li");
 ul2.innerHTML = '';
 if (input === '') {
    return;
}
 for (let i = 0; i < li.length; i++) {
     let txtValue = li[i].textContent || li[i].innerText;
     if (txtValue.toUpperCase().indexOf(input) > -1) {
         if (!ul2.querySelector(`li[data-circuit="${txtValue}"]`)) {
             let li2 = document.createElement('li');
             li2.textContent = txtValue;
             li2.setAttribute('data-circuit', txtValue);
             ul2.appendChild(li2); 
         }
     } else {
         let existingLi = ul2.querySelector(`li[data-circuit="${txtValue}"]`);
         if (existingLi) {
             ul2.removeChild(existingLi);
         }
     }
 }
}
var lis1 = document.getElementById("all-circuits").getElementsByTagName('li'); 
var lis2 = document.getElementById("matching-circuits").getElementsByTagName('li'); 
var search=document.getElementById("circuits-search");
var icon=document.getElementById("go-icon");
for (var i=0; i<lis1.length; i++) {
lis1[i].addEventListener('click', doStuff, false);
}
for (var i=0; i<lis2.length; i++) {
lis2[i].addEventListener('click', doStuff, false);
}
function doStuff() {
search.value=this.innerHTML;
icon.src="icons/tick.svg";
}
search.addEventListener('input', function() {
icon.src = "icons/arrow-right.svg";
});

document.addEventListener('DOMContentLoaded', (event) => {
  const circ_search = document.getElementById('circuits-search');
  if (circ_search) {
    circ_search.addEventListener('keyup', filterCircuits);
  }
});
