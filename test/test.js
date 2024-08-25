fetch('/team_records.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const teamContainer = document.getElementById('outer-grid');

    data.forEach(team => {
      const teamDiv = document.createElement('div');
      teamDiv.className = 'team-container';

      const formatDriverName = (fullName) => {
        const nameParts = fullName.split(' ');
        const lastName = nameParts.pop(); 
        const firstName = nameParts.join(' '); 
        return `${firstName} <strong>${lastName}</strong>`; 
      };

      teamDiv.innerHTML = `
        <img src="/BG/linesforcards.svg" class="curved-line" />

        <div class="pos-container">
          <div>
            <div class="ranking">${team.Pos}</div>
            <div class="points-container">
              <div class="points">${team.Pts}</div>
              <div class="points-txt-container">
                <h3>PTS</h3>
              </div>
            </div>
          </div>
          <div class="team-name-container">
            <div class="team-logo">
              <img class="team-logo-img" src="/team-logos/${team['Team-img']}" alt="${team.Team} Logo" />
            </div>
            <div class="team-line">
              <div class="team-name">${team.Team}</div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        
        <hr>
        
        <div class="driver-container">
          <div class="driver-img">
            <img class="driver-photo" src="/drivers/${team['Driver-img'][0]}" alt="${team.Drivers[0]} Photo" />
          </div>
          <div class="names">
            <div class="driver-name-top">
              <p>${formatDriverName(team.Drivers[0])}</p>
            </div>
            <div class="driver-name-bottom">
              <p>${formatDriverName(team.Drivers[1])}</p>
            </div>
          </div>
          <div class="driver-img">
            <img class="driver-photo" src="/drivers/${team['Driver-img'][1]}" alt="${team.Drivers[1]} Photo" />
          </div>
        </div>
        
        <hr>
        <div class="car-container">
          <img class="car-img" src="/cars/${team['Car-img']}" alt="${team.Team.toLowerCase().replace(/ /g, '-')}" />
        </div>
      `;

      teamContainer.appendChild(teamDiv);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    alert('Failed to load team records. Please try again later.');
  });
