import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
//import { OrbitControls } from '/three/examples/jsm/controls/OrbitControls';
//import {GLTFLoader} from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
//https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js
import {GLTFLoader} from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';

var redpi, screw, tomb;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//render
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(150); //posizione camera iniz


//background
// const spaceTexture = new THREE.TextureLoader().load('/img/background.jpg');
// scene.background = spaceTexture;



//font loader
// const fontLoader = new FontLoader();



// Pi greco 3d model
const loader = new GLTFLoader();

loader.load('redpi/redpi.gltf', function(gltf){
  console.log(gltf);
  redpi = gltf.scene;
  //redpi.scale.set(5,5,5);
  redpi.scale.set(.09*redpi.scale.x, .09*redpi.scale.y, .09 * redpi.scale.z);
  //redpi.position.setX(100);
  redpi.position.z = 1;
  redpi.position.x = 4
  redpi.position.y = 4;

  redpi.rotation.Y += 0.075;

  scene.add(redpi);
}, function (error){
  console.log("An error has occurred")
  console.log(error);
});


//vite idraulica 
loader.load('screw/screw_model.gltf', function(gltf){
  console.log(gltf);
  screw = gltf.scene;
  screw.scale.set(5,5,5);

  screw.position.z = 3;
  screw.position.x = -860;
  screw.position.y = -5;

  scene.add(screw);
}, function (error){
  console.log("An error has occurred")
});
//tomba di archimede
loader.load('tomb/tomb_model.gltf', function(gltf){
  console.log(gltf);
  tomb = gltf.scene;
  tomb.scale.set(0.5,0.5,0.5);

  tomb.position.z = 3;
  tomb.position.x = -40;
  tomb.position.y = -20;

  scene.add(tomb);
}, function (error){
  console.log("An error has occurred")
});


//luci per 3d obj
// non funziona con ambient light solo con directional
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1,1,5);
scene.add(light);

//sfera con archimede
const archimedeText = new THREE.TextureLoader().load('archimede_bh.jpg');

const archimede = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: archimedeText,
    //color: 0xc1d8f0,
  })
);
// archimede.position.setZ(0);
// archimede.position.setX(0);
// archimede.position.setY(1);
archimede.position.z = -5;
archimede.position.x = 4
scene.add(archimede);
// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // redpi.rotation.x += 0.05;
  // redpi.rotation.y += 0.075;
  // redpi.rotation.z += 0.05;

  // archimede.rotation.y += 0.01;
  // archimede.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//movimenti del mouse
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.maxDistance = 200;
// controls.minDistance = 30;

renderer.render(scene, camera);

function animate(){
   if(redpi){
     redpi.rotation.x +=0.01;
     redpi.rotation.y +=0.01;
     //redpi.position.z = 1;
   }
   if(screw){
     //screw.rotation.x +=0.01;
     screw.rotation.y +=0.01;
     screw.rotation.z = 1;
   }
   if(tomb){
    //tomb.rotation.x +=0.01;
     tomb.rotation.y +=0.01;
     //tomb.rotation.z = 1;
   }

  //archimede.rotation.x += 0.01;
  archimede.rotation.y += 0.01;
  


  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
