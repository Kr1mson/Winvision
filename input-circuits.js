
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
        document.getElementById("circuits-sidebar").style.display = "flex"; 
    }
    
    function closeNav() {
        document.getElementById("circuits-sidebar").style.display = "none"; 
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
        document.getElementById("driver-sidebar").style.display = "flex"; 
    }
    
    function closeNavdriv() {
        document.getElementById("driver-sidebar").style.display = "none"; 
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
  
      drivers.forEach(driver => {
          const card = document.createElement('div');
          card.className = 'card';
  
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
  
          dname.appendChild(fname);
          dname.appendChild(lname);
  
          card.appendChild(line);
          card.appendChild(dname);
  
          container.appendChild(card);
      });
  });
  
     
    