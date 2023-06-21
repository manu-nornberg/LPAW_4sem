import * as three from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createSkyBox } from './skybox'


//renderização
const render = new three.WebGL1Renderer({alpha:true})
render.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(render.domElement)

//cena
const scene = new three.Scene()

//camera
let apectro = window.innerWidth / window.innerHeight
const camera = new three.PerspectiveCamera(
    75, apectro, 0.1, 500
);
camera.position.z = 5

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
  cat.scale.setScalar(.5)
  cat.position.x = 0
  // cat.rotation.z = 4.6
  cat.rotation.x = 4.7
  scene.add(cat)
  createSkyBox('', 200)
    .then(sky=> {
      sky.position.y = 100
      console.log('sky created')
      console.log(sky)
      scene.add(sky)
      animate()

    })
  .catch(error => console.log(error));
  })
})

// function material(materials) {
//     materials.preload()
//     objloader.setMaterials(materials)
//     objloader.setPath(path)
//     .load(obj, objetos)
// }

// function objetos(objeto){
//     cat = objeto
//     cat.position.x = 0
//     cat.position.y = -50
//     cat.position.z = -60
//     // cat.rotation.y = 1
//     cat.rotateY(.58)
//     cat.rotateX(4.7)
//     // cat.scale.setScalar(.5)
//     scene.add(cat)
//     animate()
//   }

  // let indo = true;
  
  function animate() {
    render.render(scene, camera)
    // cat.rotation.z += .01
    
  //   if(indo){
  //     cat.position.z -=1
	// }else{
  //     // cat.rotation.z += .01
  //     cat.position.z +=1
	// }
    
	// if(!indo && cat.position.z>90)
	// 	indo = true
	
	// if(indo && cat.position.z<10)
	// 	indo = false

    
    control.update();
    requestAnimationFrame(animate)
  }
  
let key

  window.addEventListener('keydown', event => {
    key = event.key
    
    if(key == "s"){
    cat.position.z += 1
    cat.rotation.z = 0
    }
    if(key == "w"){
    cat.position.z -= 1
    cat.rotation.z = 9.4
  }
    if(key == "a"){
    cat.position.x -= 1
    cat.rotation.z = 4.8
    }
    if(key == "d"){
    cat.position.x += 1
    cat.rotation.z = 1.4
    }
    
  })

  window.addEventListener('mousemove', event => {
    let wh = window.innerHeight
    let my = event.clientY
    let ww = window.innerWidth
    let mx = event.clientX
    if (cat) cat.position.z += (my - wh / 2) / wh / 1
    if (cat) cat.position.x -= (mx - ww / 2) / ww / 1
  })

