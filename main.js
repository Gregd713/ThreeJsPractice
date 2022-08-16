import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'
import {OrbitControls} from './OrbitControls.js'


import * as dat from 'dat.gui'    
import * as THREE from 'three';
import { Mesh } from 'three';
console.log(dat)
// console.log(OrbitControls);

const gui = new dat.GUI()
const world = {
  plane:{
    width:10,
    height:10,
    widthSegments:10,
    heightSegments: 10,
  }
}


gui.add(world.plane, 'width',1,20).onChange(generatePlane)

gui.add(world.plane, 'height',1,20).onChange(generatePlane)

gui.add(world.plane, 'widthSegments',1,20).onChange(generatePlane)
gui.add(world.plane,'heightSegments',1,20).onChange(generatePlane)

function generatePlane(){
  PlaneMesh.geometry.dispose()
  PlaneMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height, 
    world.plane.widthSegments,
    world.plane.heightSegments)
  const {array}=PlaneMesh.geometry.attributes.position
for (let i = 0;i< array.length;i +=3){
  const x = array[i]
  const y = array[i+1]
  const z = array[i+2]
  array[i + 2] = z + Math.random()
}

  console.log()
}

const scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xbfe3dd );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 
const renderer= new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(5);

renderer.render(scene, camera);

// const geometry = new THREE. TorusBufferGeometry(10,3,16,100)
// const boxGeometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe: true});
// const torus = new THREE.Mesh(geometry, material);
// const box = new THREE.Mesh(boxGeometry,material);

const PlaneGeometry = new THREE.PlaneGeometry(10,10, 10,10)
const PlaneMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000, flatShading:THREE.FlatShading
})
const PlaneMesh = new THREE.Mesh(PlaneGeometry,PlaneMaterial)
console.log(PlaneMesh.geometry.attributes.position.array)

const {array}=PlaneMesh.geometry.attributes.position
for (let i = 0;i< array.length;i +=3){
  const x = array[i]
  const y = array[i+1]
  const z = array[i+2]
  array[i + 2] = z + Math.random()
}

// // scene.add(torus)
// scene.add(box)
scene.add(PlaneMesh)

const light = new THREE.DirectionalLight(
  0xffffff,1
)
light.position.set(0,0,1)
scene.add(light)

const backLight = new THREE.DirectionalLight(
  0xffffff,1
)
backLight.position.set(0,0,-1)
scene.add(backLight)

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  // box.rotation.x += .01
  // box.rotation.y += .01
  // PlaneMesh.rotation.x += -.01
  // PlaneMesh.rotation.y += -.01
}

animate()
    
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const mouse= {
  x:undefined,
  y: undefined
}

addEventListener('mousemove',(event)=>{

  mouse.x=(event.clientX/innerWidth)*2 -1
  mouse.y=-(event.clientY/innerHeight)*2 +1
  console.log(mouse);
})