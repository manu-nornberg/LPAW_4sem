import * as three from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

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

//luz
var luz = new three.AmbientLight(0xffffff, 5);
scene.add(luz);

//ponto de luz
var pontoluz = new three.PointLight(0xfffffff, 1);
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

mtlloader.setPath(path).load(mtl, material)

function material(materials) {
    materials.preload()
    objloader.setMaterials(materials)
    objloader.setPath(path)
    .load(obj, objetos)
}

function objetos(objeto){
    cat = objeto
    cat.position.x = 0
    cat.position.y = -50
    cat.position.z = -60
    // cat.rotation.y = 1
    cat.rotateY(.58)
    cat.rotateX(4.7)
    // cat.scale.setScalar(.5)
    scene.add(cat)
    animate()
  }

  let indo = true;
  
  function animate() {
    render.render(scene, camera)
    
    if(indo){
        camera.position.z -=1
        cat.rotation.z += .02
	}else{
        camera.position.z +=1
	}
    
	if(!indo && camera.position.z>100)
		indo = true
	
	if(indo && camera.position.z<10)
		indo = false

    requestAnimationFrame(animate)
  }

