class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
      newNode.prev = this.tail;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
      this.tail.next = this.head;
      this.head.prev = this.tail;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }
}
const sliderList = new CircularLinkedList();
const teamMap = new Map();
const driverMap = new Map();

Promise.all([
  fetch('https://winvis-scraper.onrender.com/team_records').then(response => response.json()),
  fetch('https://winvis-scraper.onrender.com/driver_records').then(response => response.json())
])
  .then(([teamData, driverData]) => {
    // Process team data\
    console.log(teamData);
    teamData.forEach(team => {
      teamMap.set(team['Team'], team);
      const div = document.createElement('div');
      div.classList.add('slider-item');
      div.style.backgroundImage = `linear-gradient(white, white), radial-gradient(circle at top left, #000000, #${team['Color-code']})
  `;

      div.innerHTML = `
        <p>${team['Pos']}</p>
        <div class="item-container">
          <p style="background: linear-gradient(to right, #000000, #${team['Color-code']}, #000000, #000000);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;">${team['Team']}</p>
        </div>
        <img class="team-logo" src='${team['Team-img']}'>
        <div class="points-container">
          <span>${team['Pts']}</span>
          <p>PTS</p>
        </div>`;
      sliderList.append(div);
    });

    // Process driver data
    driverData.forEach(driver => {
      const fullName = driver['Fname'] + ' ' + driver['Lname'];
      driverMap.set(fullName, driver);
    });

    let currentNode = sliderList.head;

    function displaySlides() {
      const sliderContent = document.getElementById('slider-content');
      const teamView = document.querySelector('#team-name-fg');
      const pos = document.querySelector('#pos');
      const fdriver = document.querySelector('#fdriver-name');
      const sdriver = document.querySelector('#sdriver-name');
      const pts = document.querySelector('#team-pts-val');
      const car = document.querySelector('#car');
      const logo = document.querySelector('#team-logo');
      const fflag = document.querySelector('#fdriver-flag');
      const sflag = document.querySelector('#sdriver-flag');
      const fno = document.querySelector('#fdriver-no-img');
      const sno = document.querySelector('#sdriver-no-img');
      const fimg = document.querySelector('#fdriver-img');
      const simg = document.querySelector('#sdriver-img');
      const line_container=document.querySelector('#mid-line');
      const pos_txt=document.querySelector('#pos-txt');
      sliderContent.innerHTML = ''; 

      let tempNode = currentNode;

      for (let i = 0; i < 5; i++) {
        if (!tempNode) return; 

        const item = tempNode.value.cloneNode(true);

        if (i === 2) {
          item.classList.add('highlight');
          const teamName = tempNode.value.querySelector('.item-container p').textContent;
          teamView.textContent = teamName.toUpperCase();

          const teamData = teamMap.get(teamName);
          if (teamData) {
            pos.textContent = teamData['Pos'];
            pts.textContent = teamData['Pts'];
            
            const driverNames = teamData['Drivers'];
            const [firstDriver, secondDriver] = driverNames;

            if (firstDriver) {
              const firstDriverData = driverMap.get(firstDriver);
              if (firstDriverData) {
                fdriver.textContent = firstDriver;
                fflag.src = `${firstDriverData['Flag-img']}`;
                fno.src = `${firstDriverData['No-img']}`;
                fimg.src = `${firstDriverData['Driver-img']}`;
              }
            }

            if (secondDriver) {
              const secondDriverData = driverMap.get(secondDriver);
              if (secondDriverData) {
                sdriver.textContent = secondDriver;
                sflag.src = `${secondDriverData['Flag-img']}`;
                sno.src = `${secondDriverData['No-img']}`;
                simg.src = `${secondDriverData['Driver-img']}`;
              }
            }

            car.src = `${teamData['Car-img']}`;
            logo.src = `${teamData['Team-img']}`;
            line_container.innerHTML=`<svg
              width="210mm"
              height="297mm"
              viewBox="0 0 210 297"
              version="1.1"
              id="svg1"
              inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
              sodipodi:docname="linesforcards.svg"
              xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
              xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:svg="http://www.w3.org/2000/svg">
              <sodipodi:namedview
                id="namedview1"
                pagecolor="#ffffff"
                bordercolor="#000000"
                borderopacity="0.25"
                inkscape:showpageshadow="2"
                inkscape:pageopacity="0.0"
                inkscape:pagecheckerboard="0"
                inkscape:deskcolor="#d1d1d1"
                inkscape:document-units="mm"
                inkscape:zoom="0.99150695"
                inkscape:cx="359.04942"
                inkscape:cy="388.80212"
                inkscape:window-width="1920"
                inkscape:window-height="1001"
                inkscape:window-x="-9"
                inkscape:window-y="-9"
                inkscape:window-maximized="1"
                inkscape:current-layer="g14" />
              <defs
                id="defs1" />
              <g
                inkscape:label="Layer 1"
                inkscape:groupmode="layer"
                id="layer1">
                <g
                  id="g14">
                  <g
                    id="g2">
                    <path
                      style="fill:#000000;fill-opacity:0;stroke:#ffffff;stroke-width:2.165"
                      d="m 24.283323,48.833495 74.18421,-0.26685 20.814287,23.215925 78.18696,-0.5337"
                      id="path1"
                      sodipodi:nodetypes="cccc" />
                    <path
                      style="fill:#000000;fill-opacity:0;stroke:#${teamData['Color-code']};stroke-width:2.165"
                      d="m 24.550171,52.56939 72.049413,0.266849 21.347986,22.949076 79.25436,-0.5337"
                      id="path2"
                      sodipodi:nodetypes="cccc" />
                  </g>
                </g>
              </g>
            </svg>`;
            pos_txt.style.background = `linear-gradient(to right, #${teamData['Color-code']}, #ffffff, #ffffff)`;
            pos_txt.style.webkitBackgroundClip = 'text';
            pos_txt.style.webkitTextFillColor = 'transparent';

          } else {
            console.error('No data found for team:', teamName);
          }
        }

        item.addEventListener('click', () => {
          if (i === 4) {
            currentNode = currentNode ? currentNode.next.next : null;
          } else if (i === 3) {
            currentNode = currentNode ? currentNode.next : null;
          } else if (i === 1) {
            currentNode = currentNode ? currentNode.prev : null;
          } else if (i === 0) {
            currentNode = currentNode ? currentNode.prev.prev : null;
          }
          displaySlides();
        });

        sliderContent.appendChild(item);
        tempNode = tempNode.next;
      }
    }

    displaySlides();
  })
  .catch(error => {
    console.error('Error fetching the JSON files:', error);
  });
