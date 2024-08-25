const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');
const section = document.querySelector('section');
const end = section.querySelector('h1');

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  duration: 2000,
  triggerElement: intro,
  triggerHook: 0
}).setPin(intro).addTo(controller);

let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on('update', e => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  video.currentTime = scrollpos;
}, 33.3);

var controller2 = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: "onEnter",
    duration: "200%"
  }
});

new ScrollMagic.Scene({
  triggerElement: "#parallax1"
})
  .setTween("#parallax1 > div", { y: "80%", ease: Linear.easeNone })
  .addTo(controller2);

new ScrollMagic.Scene({
  triggerElement: "#parallax2"
})
  .setTween("#parallax2 > div", { y: "80%", ease: Linear.easeNone })
  .addTo(controller2);

fetch('team_records.json')
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
      teamDiv.style.backgroundImage = `linear-gradient(white, white), radial-gradient(circle at top left, #000000, #${team['Color-code']})`;
      
      teamDiv.addEventListener('mouseenter', () => {
        teamDiv.style.backgroundImage = `linear-gradient(white, white), radial-gradient(circle at top left, #${team['Color-code']}, #000000)`;
      });
      
      teamDiv.addEventListener('mouseleave', () => {
        teamDiv.style.backgroundImage = `linear-gradient(white, white), radial-gradient(circle at top left, #000000, #${team['Color-code']})`;
      });
      
      const formatDriverName = (fullName) => {
        const nameParts = fullName.split(' ');
        const lastName = nameParts.pop();
        const firstName = nameParts.join(' ');
        return `${firstName} <strong>${lastName}</strong>`;
      };

      teamDiv.innerHTML = `
      <svg
   width="210mm"
   class="curved-line"
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
     inkscape:cx="358.54514"
     inkscape:cy="562.27543"
     inkscape:window-width="1920"
     inkscape:window-height="1001"
     inkscape:window-x="-9"
     inkscape:window-y="-9"
     inkscape:window-maximized="1"
     inkscape:current-layer="g14" />
  <defs
     id="defs1">
    <inkscape:path-effect
       effect="fillet_chamfer"
       id="path-effect18"
       is_visible="true"
       lpeversion="1"
       nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,9.3631915,0,1 @ F,0,0,1,0,20.252866,0,1 @ F,0,0,1,0,0,0,1"
       radius="0"
       unit="px"
       method="auto"
       mode="F"
       chamfer_steps="1"
       flexible="false"
       use_knot_distance="true"
       apply_no_radius="true"
       apply_with_radius="true"
       only_selected="false"
       hide_knots="false" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect16"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="fillet_chamfer"
       id="path-effect14"
       is_visible="true"
       lpeversion="1"
       nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,14.446686,0,1 @ F,0,0,1,0,15.450597,0,1 @ F,0,0,1,0,0,0,1"
       radius="0"
       unit="px"
       method="auto"
       mode="F"
       chamfer_steps="1"
       flexible="false"
       use_knot_distance="true"
       apply_no_radius="true"
       apply_with_radius="true"
       only_selected="false"
       hide_knots="false" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect12"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="fillet_chamfer"
       id="path-effect10"
       is_visible="true"
       lpeversion="1"
       nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,14.446686,0,1 @ F,0,0,1,0,15.450597,0,1 @ F,0,0,1,0,0,0,1"
       radius="0"
       unit="px"
       method="auto"
       mode="F"
       chamfer_steps="1"
       flexible="false"
       use_knot_distance="true"
       apply_no_radius="true"
       apply_with_radius="true"
       only_selected="false"
       hide_knots="false" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect8"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="fillet_chamfer"
       id="path-effect6"
       is_visible="true"
       lpeversion="1"
       nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,14.446686,0,1 @ F,0,0,1,0,15.450597,0,1 @ F,0,0,1,0,0,0,1"
       radius="0"
       unit="px"
       method="auto"
       mode="F"
       chamfer_steps="1"
       flexible="false"
       use_knot_distance="true"
       apply_no_radius="true"
       apply_with_radius="true"
       only_selected="false"
       hide_knots="false" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect5"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect4"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect3"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect2"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect5-4"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="fillet_chamfer"
       id="path-effect6-9"
       is_visible="true"
       lpeversion="1"
       nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,14.446686,0,1 @ F,0,0,1,0,15.450597,0,1 @ F,0,0,1,0,0,0,1"
       radius="0"
       unit="px"
       method="auto"
       mode="F"
       chamfer_steps="1"
       flexible="false"
       use_knot_distance="true"
       apply_no_radius="true"
       apply_with_radius="true"
       only_selected="false"
       hide_knots="false" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect8-3"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="fillet_chamfer"
       id="path-effect10-1"
       is_visible="true"
       lpeversion="1"
       nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,14.446686,0,1 @ F,0,0,1,0,15.450597,0,1 @ F,0,0,1,0,0,0,1"
       radius="0"
       unit="px"
       method="auto"
       mode="F"
       chamfer_steps="1"
       flexible="false"
       use_knot_distance="true"
       apply_no_radius="true"
       apply_with_radius="true"
       only_selected="false"
       hide_knots="false" />
    <inkscape:path-effect
       effect="spiro"
       id="path-effect12-8"
       is_visible="true"
       lpeversion="1" />
    <inkscape:path-effect
       effect="fillet_chamfer"
       id="path-effect14-9"
       is_visible="true"
       lpeversion="1"
       nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,14.446686,0,1 @ F,0,0,1,0,15.450597,0,1 @ F,0,0,1,0,0,0,1"
       radius="0"
       unit="px"
       method="auto"
       mode="F"
       chamfer_steps="1"
       flexible="false"
       use_knot_distance="true"
       apply_no_radius="true"
       apply_with_radius="true"
       only_selected="false"
       hide_knots="false" />
  </defs>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1">
    <g
       id="g14">
      <g
         id="g18">
        <path
           style="fill:#000000;fill-opacity:0;stroke:#000000;stroke-width:2.165;stroke-dasharray:none;stroke-opacity:1"
           d="m 50.167743,163.04516 0.146466,-17.57578 A 14.621835,14.621835 135.13223 0 1 64.88118,130.9695 l 41.88549,-0.15571 a 15.508141,15.508141 134.8935 0 0 15.45049,-15.50804 v -8.29902"
           id="path10"
           sodipodi:nodetypes="cccc"
           transform="translate(-4.1748457e-7,0.26684962)" />
        <path
           style="fill:#000000;fill-opacity:0;stroke:#${team['Color-code']};stroke-width:2.165;stroke-dasharray:none;stroke-opacity:1"
           d="m 50.167743,157.17447 0.171313,-16.78857 a 9.4944545,9.4944545 135.18582 0 1 9.458665,-9.39751 l 42.166709,-0.15675 a 20.328295,20.328295 134.8935 0 0 20.25273,-20.32816 v -9.90114"
           id="path14"
           sodipodi:nodetypes="cccc"
           transform="translate(5.0701439,6.4043927)" />
      </g>
    </g>
  </g>
</svg>
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
              <div class="line" style="background-color: #${team['Color-code']}";></div>
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