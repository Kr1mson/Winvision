let circuits=['Melbourne', 'Kuala Lumpur', 'Sakhir', 'Montmeló', 'Istanbul',
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
  'Baku', 'Portimão', 'Mugello', 'Jeddah', 'Al Daayen', 'Miami']
  
  let list = document.getElementById("all-circuits");
  for (i = 0; i < circuits.length; ++i) {
     var li = document.createElement('li');
     li.innerText = circuits[i];
     list.appendChild(li);
  }