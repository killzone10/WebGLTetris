const { mat4, mat3, vec3, vec4 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;
const shapes = [];
const tetraShapes = [];
let gl = null;
const toMove = new Set() // set which contains object on which you can use operations (translate, scale, rotate)

let space = false;
let cameraPos = [2, 0.8, 2];
let gameStarted = false;
let grid = false;
let orthographic = true;
let scaleFactor = 1;

let goraud = true;
let constAmbient = 0.5;
let constDiffuse = 0.5;
let constSpecular = 0.5;
let counter = 0;
let changeShape = false;
let rendering = true;
const shaders = {
    withLight: "v-shader",
    fragment: "f-shader",
    goraudSpecularVertex :"v-shader-gouraud-specular",
    goraudSpecularFragment:"f-shader",
    phongDiffuseVertex:"v-shader-phong-diffuse",
    phongDiffuseFragment:"f-shader-phong-diffuse",
    phongSpecularFragment:"f-shader-phong-specular"
}

let currentShaderProgram = null;

const shaderInfo = {
    attributes: {
        vertexLocation: "vertexPosition",
        normalLocation: "vertexNormal",
        colorLocation: "vertexColor",
        textureLocation:"texPosition",
    }, uniforms: {
        modelViewMatrix: "modelViewMatrix",
        projectionMatrix: "projectionMatrix",
        viewMatrix: "viewMatrix",
        normalMatrix: "normalMatrix",
        lightMatrix:"lightMatrix",
        lightPos:"lightPos",
        ambientConst:"ambientConst",
        diffuseConst:"diffuseConst",
        specularConst:"specularConst",
        texture:"texture",
    }
}



const matrices = {
    viewMatrix: mat4.create(),
    orthoProjectionMatrix: mat4.create(),
    perspectiveProjectionMatrix: mat4.create(),
    projectionMatrix: mat4.create(),
    lightMatrix: mat4.create(),
    inverseTranspose:mat3.create(),
}

const vectors = {
    lightPos:[],

}

const shaderPrograms = {
    noLightProgram: null,
    withLightProgram: null,
    goraudDiffuse: null,
    goraudSpecular: null,
    phongDiffuse: null,
    phongSpecular:null,
}
