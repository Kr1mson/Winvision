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
  fetch('/team_records.json').then(response => response.json()),
  fetch('/driver_records.json').then(response => response.json())
])
  .then(([teamData, driverData]) => {
    // Process team data
    teamData.forEach(team => {
      teamMap.set(team['Team'], team);
      const div = document.createElement('div');
      div.classList.add('slider-item');
      div.style.backgroundImage = `url('/team-logos/${team['Team-img']}')`;
      div.style.backgroundColor = `#ffffff`;
      div.innerHTML = `
        <p>${team['Pos']}</p>
        <div class="item-container">
          <p style="background: linear-gradient(to right, #000000, #${team['Color-code']}, #000000, #000000);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;">${team['Team']}</p>
        </div>
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
                fflag.src = `/flag-photos/${firstDriverData['Flag-img'][0]}`;
                fno.src = `/driver-no-photos/${firstDriverData['No-img']}`;
                fimg.src = `/drivers/${firstDriverData['Driver-img']}`;
              }
            }

            if (secondDriver) {
              const secondDriverData = driverMap.get(secondDriver);
              if (secondDriverData) {
                sdriver.textContent = secondDriver;
                sflag.src = `/flag-photos/${secondDriverData['Flag-img'][0]}`;
                sno.src = `/driver-no-photos/${secondDriverData['No-img']}`;
                simg.src = `/drivers/${secondDriverData['Driver-img']}`;
              }
            }

            car.src = `/cars/${teamData['Car-img']}`;
            logo.src = `/team-logos/${teamData['Team-img']}`;
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
