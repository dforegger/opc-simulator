import * as THREE from "three";
import Stats from "stats.js";
import createRenderer from "./three/createRenderer.js";
import createCamera from "./three/createCamera.js";
import createScene from "./three/createScene.js";
import createLight from "./three/createLight.js";
import createGround from "./three/createGround.js";
import createLEDs from "./three/createLEDs.js";



export default function renderModel(store){

  const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
  const renderer = createRenderer(store);
  const { camera, container } = createCamera(store);
  const ground   = createGround();

  const scene = new THREE.Scene();


  scene.add(container);
  scene.add(ambientLight);
  scene.add(ground);

  var callbacks = [];

  // load the layout and add the LEDs
  createLEDs().then(([leds, frameCallback]) => {
    scene.add(leds);
    if(frameCallback) {
      callbacks.push(frameCallback);
    }
  });

  var clock = new THREE.Clock();
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

  function animate() {

    stats.begin();

    renderer.render( scene, camera );

    for(var idx = 0; idx<callbacks.length; idx++) {
      callbacks[idx](clock);
    }

    stats.end();

    requestAnimationFrame( animate );
  }

  // setInterval(() => {
  //   leds.update();
  // }, 100);

  animate();


  // re-render when the store updates
  // store.subscribe(render);

}
