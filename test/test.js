fetch('/driver_records.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const teamContainer = document.getElementById('outer-grid');

    data.forEach(driver => {
      const teamDiv = document.createElement('div');
      teamDiv.className = 'driver-container';
      teamDiv.style.backgroundImage = `linear-gradient(white, white), radial-gradient(circle at top left, #000000, ${driver['Color-code']})`;
      
      teamDiv.addEventListener('mouseenter', () => {
        teamDiv.style.backgroundImage = `linear-gradient(white, white), radial-gradient(circle at top left, ${driver['Color-code']}, #000000)`;
      });
      
      teamDiv.addEventListener('mouseleave', () => {
        teamDiv.style.backgroundImage = `linear-gradient(white, white), radial-gradient(circle at top left, #000000, ${driver['Color-code']})`;
      });
      
      

      teamDiv.innerHTML = `
      <div class="pos-container">
        <div class="ranking-container">
          <span>${driver['Pos']}</span>
        </div>
        <div class="points-container">
          <span class="points">${driver['Pts']}</span>
          <span class="points-txt">PTS</span>
        </div>
      </div>
      <hr>
      <div class="team-container">
        <img class="flag-photo" src="/flag-photos/${driver['Flag-img']}">
        <span>${driver['Team']}</span>
      </div>
      <hr>
      <div class="driver-info-container">
        <div class="driver-info">
          <img class="driver-no-photo" src="/driver-no-photos/${driver['No-img']}">
          <div class="driver-name">
            <span class="first-name">${driver['Fname']}</span>
            <span class="last-name">${driver['Lname']}</span>
          </div>
        </div>
        <img class="driver-photo" src="/drivers/${driver['Driver-img']}">
      </div>
`;
teamContainer.appendChild(teamDiv);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    alert('Failed to load team records. Please try again later.');
  });