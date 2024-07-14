
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
     
    