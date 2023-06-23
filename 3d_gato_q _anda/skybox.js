import { TextureLoader, MeshBasicMaterial, BackSide, BoxGeometry, Mesh } from "three";

const createPath = (filename) => {
    const basePath = "img/skybox";
    const baseFilename = basePath + filename;
    const fileType = ".png";
    const sides = ["ft", "bk", "up", "dw", "lt", "rt"];
    //mapeou todas as fotos
    const path = sides.map(side => {
        return baseFilename + "/" + side + fileType;
    });
    console.log("path: ", path);
    return path;
}

const createSkyBoxMaterial = async (filename) => {
    const skyBox = createPath(filename);
    const materialArray = []
    for(let imagePath of skyBox){
        console.log(`Carregando: ${imagePath}`)
        let loader = new TextureLoader();
        let texture = await loader.loadAsync(imagePath);
        materialArray.push(
            new MeshBasicMaterial(
                {map: texture, side: BackSide}
            )
        )
        console.log('material criado')
    }
    return materialArray;
}


const createSkyBox = async(filename, size) => {
    const skyboxGeo = new BoxGeometry(size, size, size);
    const materials = await createSkyBoxMaterial(filename);
    return new Mesh(skyboxGeo, materials);
}

export {createSkyBox}