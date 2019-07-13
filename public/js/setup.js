//          ////////////////////////////
//         //// SPACE SHOOTER GAME ////
//        ////    Created By      ////
//       ////   Lucas Ferguson   ////
//      ////////////////////////////

/**
 * Create a WebGLRenderer with shadows in the renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * This is the scene
 */
const scene = new THREE.Scene();
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * This is the camera
 */
const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10000
);
camera.position.z = 50;
////    ////    ////
///    ////    ////
//    ////    ////


/**
 * textureLoader
 */
var textureLoader = new THREE.TextureLoader();

var images = {
    skybox: {
        front: textureLoader.load("./assets/images/skybox/front.png"),
        back: textureLoader.load("./assets/images/skybox/back.png"),
        up: textureLoader.load("./assets/images/skybox/up.png"),
        down: textureLoader.load("./assets/images/skybox/down.png"),
        right: textureLoader.load("./assets/images/skybox/right.png"),
        left: textureLoader.load("./assets/images/skybox/left.png")
    }
};
console.log(images);
// C:\Users\Lucas\Documents\GitHub\Space-Shooter-Three-Js-Node\public\assets\images\skybox\purplenebula_bk.png
////    ////    ////
///    ////    ////
//    ////    ////







// onWindowResize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    renderer.setSize(windowWidth, windowHeight);
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
}