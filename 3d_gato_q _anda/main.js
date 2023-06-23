import * as three from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createSkyBox } from './skybox'
import { loadAudio } from './loaderAssets'

const size = 700

//carregamento do audio
let miau = await loadAudio('/sound/gato-miau.mp3');
console.log(miau);

//renderização
const render = new three.WebGL1Renderer({alpha:true})
render.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(render.domElement)

//cena
const scene = new three.Scene()
scene.background = new three.Color(0x003333);

//camera
let apectro = window.innerWidth / window.innerHeight
const camera = new three.PerspectiveCamera(
    75, apectro, 0.1, 1500
);
camera.position.z = size * 0.6
camera.position.y = size * 0.35

//orbitcontrol
const control = new OrbitControls(camera, render.domElement);

//luz
var luz = new three.AmbientLight(0xffffff, 5);
scene.add(luz);

//ponto de luz
var pontoluz = new three.PointLight(0xffffff, 1);
pontoluz.position.set(10, 10, 0);
scene.add(pontoluz);

//path do arquivo 3d
const path = 'model/cat/'
const obj = '12221_Cat_v1_l3.obj'
const mtl = '12221_Cat_v1_l3.mtl'
let cat 

const manager = new three.LoadingManager();
manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
}

const mtlloader = new MTLLoader(manager);
const objloader = new OBJLoader();

mtlloader.setPath(path)
.load(mtl, (material) =>{
  material.preload()
  objloader.setMaterials(material)
  objloader.setPath(path).load(obj, (object) => {
  cat = object
  cat.scale.setScalar(size / 700)
  cat.position.x = 0
  // cat.rotation.z = 4.6
  cat.rotation.x = 4.7
  scene.add(cat)
  createSkyBox('', size)
    .then(sky=> {
      sky.position.y = size/2
      console.log('sky created')
      console.log(sky)
      scene.add(sky)
      animate()
    })
  .catch(error => console.log(error));
  })
})

  
//função animate
  function animate() {
    render.render(scene, camera)
    control.update();
    requestAnimationFrame(animate)
  }
  
let key

//açoes de teclas 
  window.addEventListener('keydown', event => {
    key = event.key
    const speed = 10
    
    if(key == "s"){
    cat.position.z += speed
    cat.rotation.z = 0
    }
    if(key == "w"){
    cat.position.z -= speed
    cat.rotation.z = 9.4
  }
    if(key == "a"){
    cat.position.x -= speed
    cat.rotation.z = 4.8
    }
    if(key == "d"){
    cat.position.x += speed
    cat.rotation.z = 1.4
    }
    if(key == "e"){
      miau.play();
      }
    
  })

//açoes com o mouse 
  window.addEventListener('mousemove', event => {
    let wh = window.innerHeight
    let my = event.clientY
    let ww = window.innerWidth
    let mx = event.clientX
    const speed = 0.5
    if (cat) cat.position.z += (my - wh / 2) / wh /speed
    if (cat) cat.position.x += (mx - ww / 2) / ww /speed
  })

