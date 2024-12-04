
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(8, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.set(1, 10, 10);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;

let controls;

let objToRender = 'scuderia_ferrari_f1_sf23_2023';

const loader = new GLTFLoader();

loader.load(
  `/assets/models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
    animate(); 
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

function updateModelPosition() {
  const scrollY = window.scrollY;
  const positionY = -scrollY / 100;
  if (object) {
    object.position.y = positionY;
  }
}

camera.position.z = objToRender === "scuderia_ferrari_f1_sf23_2023" ? 25 : 500;

const topLight = new THREE.DirectionalLight(0xffffff, 2); // (color, intensity)
const topLight2 = new THREE.DirectionalLight(0xffffff, 3); // (color, intensity)
topLight2.position.set(0, -500, 0);
topLight.position.set(0, 500, 0);
topLight.castShadow = false;
scene.add(topLight2);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "scuderia_ferrari_f1_sf23_2023" ? 5 : 1);
scene.add(ambientLight);

if (objToRender === "scuderia_ferrari_f1_sf23_2023") {
  controls = new OrbitControls(camera, renderer.domElement);
}

const clock = new THREE.Clock();
let transitionStart = null;
const transitionDuration = 15;
let currentPhase = 0;

const cameraPositions = [
  { x: 25, y: 10, z: 0 }, // Front view
  { x: -25, y: 10, z: 0 }, // Back view
  { x: 0, y: 10, z: 25 }, // Side view
  { x: 0, y: 30, z: 0 } // Top-down view
];

const carPositions = [
  { x: 0, y: 0, z: 0 },
  { x: 10, y: 0, z: 0 },
  { x: 10, y: 0, z: 10 }, 
  { x: 0, y: 0, z: 10 }, 
  { x: 0, y: 0, z: 0 } 
];

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  if (object) {
    if (!transitionStart) {
      transitionStart = elapsedTime;
    }

    const transitionProgress = (elapsedTime - transitionStart) / transitionDuration;

    if (transitionProgress < 1) {
      const startPos = cameraPositions[currentPhase % cameraPositions.length];
      const endPos = cameraPositions[(currentPhase + 1) % cameraPositions.length];

      camera.position.x = THREE.MathUtils.lerp(startPos.x, endPos.x, transitionProgress);
      camera.position.y = THREE.MathUtils.lerp(startPos.y, endPos.y, transitionProgress);
      camera.position.z = THREE.MathUtils.lerp(startPos.z, endPos.z, transitionProgress);
      camera.lookAt(object.position);

      const carStartPos = carPositions[currentPhase % carPositions.length];
      const carEndPos = carPositions[(currentPhase + 1) % carPositions.length];

      object.position.x = THREE.MathUtils.lerp(carStartPos.x, carEndPos.x, transitionProgress);
      object.position.y = THREE.MathUtils.lerp(carStartPos.y, carEndPos.y, transitionProgress);
      object.position.z = THREE.MathUtils.lerp(carStartPos.z, carEndPos.z, transitionProgress);

      const overlay = document.getElementById('fadeOverlay');
      overlay.style.opacity = transitionProgress;
    } else {
      currentPhase++;
      transitionStart = elapsedTime;
    }
  }
  
  renderer.render(scene, camera);
}

const overlay = document.createElement('div');
overlay.id = 'fadeOverlay';
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'Transparent';
overlay.style.opacity = '0';
overlay.style.transition = `opacity ${transitionDuration}s`;
document.body.appendChild(overlay);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Uncomment to move with the cursor
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
  const title=document.getElementById('prediction-results');
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
          card1.style.backgroundImage = `url('assets/images/f1_photos/driver photos/${lastName}.jpg')`;
      } else if (prediction === 2) {
          card2.querySelector('p').innerHTML = formattedText;
          card2.querySelector("h3").textContent = last3letters;
          card2.style.backgroundImage = `url('assets/images/f1_photos/driver photos/${lastName}.jpg')`;
      } else if (prediction === 3) {
          card3.querySelector('p').innerHTML = formattedText;
          card3.querySelector("h3").textContent = last3letters;
          card3.style.backgroundImage = `url('assets/images/f1_photos/driver photos/${lastName}.jpg')`;
      }
  });
  cardContainer.style.display = 'flex';
  title.style.display='flex';
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
 let input = search.value.toUpperCase();
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
          li2.addEventListener('click', doStuff, false);
      }
  } else {
      let existingLi = ul2.querySelector(`li[data-circuit="${txtValue}"]`);
      if (existingLi) {
          ul2.removeChild(existingLi);
      }
  }
}
}
document.addEventListener('DOMContentLoaded', (event) => {
const yourButtonElement = document.getElementById('circuit-open');
if (yourButtonElement) {
  yourButtonElement.addEventListener('click', openNav);
}
});
document.addEventListener('DOMContentLoaded', (event) => {
const yourButtonElement = document.getElementById('circuit-collapse');
if (yourButtonElement) {
  yourButtonElement.addEventListener('click', closeNav);
  
}
});


function openNav() {
  document.getElementById("circuits-sidebar").style.visibility = "visible"
  document.getElementById("circuits-sidebar").style.opacity = "1";

}

function closeNav() {
  document.getElementById("circuits-sidebar").style.visibility = "hidden"
  document.getElementById("circuits-sidebar").style.opacity = "0"; 


}
document.addEventListener('DOMContentLoaded', (event) => {
const yourButtonElement = document.getElementById('driver-open');
if (yourButtonElement) {
  yourButtonElement.addEventListener('click', openNavdriv);
}
});
document.addEventListener('DOMContentLoaded', (event) => {
const yourButtonElement = document.getElementById('driver-collapse');
if (yourButtonElement) {
  yourButtonElement.addEventListener('click', closeNavdriv);
}
});


function openNavdriv() {
  document.getElementById("driver-sidebar").style.visibility = "visible"
  document.getElementById("driver-sidebar").style.opacity = "1"; 
}

function closeNavdriv() {
  document.getElementById("driver-sidebar").style.visibility = "hidden"
  document.getElementById("driver-sidebar").style.opacity = "0"; 
}


var lis1 = document.getElementById("all-circuits").getElementsByTagName('li'); 
var search=document.getElementById("circuits-search");
var icon=document.getElementById("go-icon");
for (var i=0; i<lis1.length; i++) {
lis1[i].addEventListener('click', doStuff, false);
}

function doStuff() {
search.value=this.innerHTML;
icon.src="assets/images/icons/tick.svg";
}
search.addEventListener('input', function() {
icon.src = "assets/images/icons/error.svg";
});
document.addEventListener('DOMContentLoaded', function() {
const drivers = [
{ fname: 'GEORGE', dname: 'RUSSELL' },
{ fname: 'LANDO', dname: 'NORRIS' },
{ fname: 'OSCAR', dname: 'PIASTRI' },
{ fname: 'DANIEL', dname: 'RICCIARDO' },
{ fname: 'FERNANDO', dname: 'ALONSO' },
{ fname: 'LEWIS', dname: 'HAMILTON' },
{ fname: 'YUKI', dname: 'TSUNODA' },
{ fname: 'LANCE', dname: 'STROLL' },
{ fname: 'ALEXANDER', dname: 'ALBON' },
{ fname: 'CHARLES', dname: 'LECLERC' },
{ fname: 'CARLOS', dname: 'SAINZ' },
{ fname: 'LOGAN', dname: 'SARGEANT' },
{ fname: 'KEVIN', dname: 'MAGNUSSEN' },
{ fname: 'PIERRE', dname: 'GASLY' },
{ fname: 'SERGIO', dname: 'PÉREZ' },
{ fname: 'VALTTERI', dname: 'BOTTAS' },
{ fname: 'ESTEBAN', dname: 'OCON' },
{ fname: 'MAX', dname: 'VERSTAPPEN' },
{ fname: 'NICO', dname: 'HÜLKENBERG' },
{ fname: 'GUANYU', dname: 'ZHOU' }
];


const container = document.getElementById('drivers-container');

drivers.forEach((driver,index) => {
  const driv_card = document.createElement('div');
  driv_card.className = 'driv_card';
  driv_card.setAttribute('draggable', 'true');
  driv_card.style.zIndex = '5';

  const line = document.createElement('div');
  line.className = 'line';

  const dname = document.createElement('div');
  dname.className = 'dname';

  const fname = document.createElement('div');
  fname.className = 'fname';
  fname.textContent = driver.fname;

  const lname = document.createElement('div');
  lname.className = 'lname';
  lname.textContent = driver.dname;
  const toggleId = `${index}`;
  const toggle=document.createElement("div");

  toggle.className = 'dnf-toggle';
  toggle.innerHTML = `<input type="checkbox" id="${toggleId}" class="tgl tgl-skewed"><label for="${toggleId}" data-tg-on="DNF" data-tg-off="Bdia" class="tgl-btn"></label>`;
  dname.appendChild(fname);
  dname.appendChild(lname);

  driv_card.appendChild(line);
  driv_card.appendChild(dname);
  driv_card.appendChild(toggle);

  container.appendChild(driv_card);
});
});
document.addEventListener('DOMContentLoaded', (event) => {
  const circ_search = document.getElementById('circuits-search');
  if (circ_search) {
    circ_search.addEventListener('keyup', filterCircuits);
  }
});
(function() {
  var dragged, listener;

  console.clear();

  dragged = null;
  const sidebar = document.querySelector('.drivers-container');
  const gridLines = document.querySelectorAll('.grid-line');
  listener = document.addEventListener;

  listener("dragstart", (event) => {
    console.log("start !");
    dragged = event.target.closest('.driv_card');
  });

  listener("dragend", (event) => {
    console.log("end !");
  });

  listener("dragover", function(event) {
    event.preventDefault();
  });

  listener("drop", (event) => {
    console.log("drop !");
    event.preventDefault();

    let targetCard = event.target.closest('.driv_card');
    if (targetCard && targetCard !== dragged) {
      const draggedParent = dragged.parentNode;
      const targetParent = targetCard.parentNode;
      const draggedIndex = Array.from(draggedParent.children).indexOf(dragged);
      const targetIndex = Array.from(targetParent.children).indexOf(targetCard);

      if (draggedParent === targetParent) {
        draggedParent.insertBefore(dragged, targetIndex > draggedIndex ? targetCard.nextSibling : targetCard);
      } else {
        draggedParent.replaceChild(targetCard, dragged);
        targetParent.insertBefore(dragged, targetParent.children[targetIndex]);
      }
    } else if (event.target.className === "grid-line") {
      if (!event.target.hasChildNodes()) {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
      } else {
        const existingCard = event.target.firstChild;
        const draggedParent = dragged.parentNode;

        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);

        draggedParent.appendChild(existingCard);
      }
    } else if (event.target.className === "drivers-container") {
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
    }
  });
  const order = [2, 1, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15, 18, 17, 20, 19];

  document.addEventListener("dblclick", (event) => {
    if (event.target.closest('.tgl, .tgl-btn')) {
      return;
    }
    const card = event.target.closest('.driv_card');
    if (card) {
      const parent = card.parentNode;
      if (parent === sidebar) {
        for (let i = 0; i < order.length; i++) {
          const gridLineIndex = order[i] - 1;
          if (gridLines[gridLineIndex] && !gridLines[gridLineIndex].hasChildNodes()) {
            sidebar.removeChild(card);
            gridLines[gridLineIndex].appendChild(card);
            break;
          }
        }
      } else {
        parent.removeChild(card);
        sidebar.appendChild(card);
      }
    }
  });


}).call(this);
document.addEventListener('DOMContentLoaded', (event) => {
  const yourButtonElement = document.getElementById('submit-btn');
  

  if (yourButtonElement) {
    yourButtonElement.addEventListener('click', sendtoapi);
  }
});
function sendtoapi(event) {
  const containers = document.querySelectorAll('.grid-positions-container');
  const jsonList = [];
  const dnfList = [];
  const circuit = document.getElementById("circuits-search").value;
  
  containers.forEach(container => {
    const items = container.querySelectorAll('.dname');
    const order = [2, 1, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15, 18, 17, 20, 19];
  
    order.forEach(index => {
      if (index - 1 < items.length) {
        const item = items[index - 1];
        let fname = item.querySelector('.fname').textContent.trim().toLowerCase();
        let lname = item.querySelector('.lname').textContent.trim().toLowerCase();
        fname = fname.charAt(0).toUpperCase() + fname.slice(1);
        lname = lname.charAt(0).toUpperCase() + lname.slice(1);
        const fullName = `${fname} ${lname}`;
        const toggle = item.closest('.driv_card').querySelector('.tgl');
        if (toggle.checked) {
          dnfList.push(fullName);
        } else {
          jsonList.push(fullName);
        }
      }
    })
  });
  var chk=document.getElementById("go-icon").src;
  if (!chk.includes("tick") || jsonList.length + dnfList.length < 20){
        alert("Please enter all details");
  }
  else{
    //alert("Chosen "+JSON.stringify(jsonList));
    //alert("DNF "+JSON.stringify(dnfList));
    //alert(jsonList.length + dnfList.length);
    //alert("Chosen Circuit: "+ circuit);
    const lightsContainer = document.getElementById("lights_container");
    const blur = document.getElementById("blurred-background");
    const loader=document.getElementById("loader-container");
    
    blur.style.visibility="visible";
    loader.style.visibility = 'visible';     
    document.body.classList.add('no-scroll');
    const bulbs = document.querySelectorAll('.bulb');
    const delay = 800;
    const totalBulbs = bulbs.length;
    bulbs.forEach((bulb, index) => {
      setTimeout(() => {
        bulb.classList.add('red_light');
      }, index * delay);
    });
    setTimeout(() => {
      bulbs.forEach(bulb => bulb.classList.remove('red_light'));
      loader.style.visibility="hidden";
      blur.style.visibility = 'hidden';
      document.body.classList.remove('no-scroll');
      
    }, totalBulbs * delay);
    event.preventDefault();
    fetch('https://winvision-pred.onrender.com/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedDrivers: jsonList, circuit: circuit}),
    })
    .then((response) => response.json())
    .then((data) => {
        displayResults(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }
}

