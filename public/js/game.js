//          ////////////////////////////
//         //// SPACE SHOOTER GAME ////
//        ////    Created By      ////
//       ////   Lucas Ferguson   ////
//      ////////////////////////////


//// ////
let raycaster;
let mouse;

let world = {
    width: 2000,
    height: 2000
}


let shipSprite;
//// ////

/**
 * backgroundPlane for mouse raycaster to hit
 */
let backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(world.width, world.height, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true
    })
);
scene.add(backgroundPlane);
backgroundPlane.material.visible = false;
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * skybox for mouse raycaster to hit
 */
let skybox = new THREE.Mesh(
    new THREE.CubeGeometry(world.width, world.width, world.width),
    [
        new THREE.MeshBasicMaterial({
            map: images.skybox.front,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.back,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.up,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.down,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.right,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: images.skybox.left,
            side: THREE.DoubleSide
        }),
    ]
);
scene.add(skybox);
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * backgroundSphere for mouse raycaster to hit
 */
let backgroundSphere1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(250, 25, 25), // 250, 25, 25
    new THREE.MeshStandardMaterial({
        flatShading: true,
        color: 0x0000ff
    })
);
backgroundSphere1.castShadow = true; //default is false
backgroundSphere1.receiveShadow = true; //default false
backgroundSphere1.position.z = -500;
scene.add(backgroundSphere1);
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * backgroundSpher2 for mouse raycaster to hit
 */
let backgroundSphere2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(60, 10, 10),
    new THREE.MeshStandardMaterial({
        flatShading: true,
        color: 0x0000ff
    })
);
backgroundSphere2.position.x = 0;
backgroundSphere2.position.y = 0;
backgroundSphere2.position.z = -150;
backgroundSphere2.castShadow = true; //default is false
backgroundSphere2.receiveShadow = true; //default false
scene.add(backgroundSphere2);
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * ambientLight Disabled **Disabled**
 */
let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(ambientLight); // **Disabled**
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * directionalLight 
 */
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.castShadow = true; // default false

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 100
// default
directionalLight.position.set(0.5, 0, 1);
scene.add(directionalLight);

// //Create a helper for the shadow camera (optional)
// var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper);
////    ////    ////
///    ////    ////
//    ////    ////



/**
 * player
 */
let player = new Player();
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * Game controller for all user input
 */
let controller = new Controller();
controller.setup();
////    ////    ////
///    ////    ////
//    ////    ////



function setup() {}


let deltaTime;
let then = 0;
let frameCount = 0;
/**
 * @description Master Function for running the game   
 * requestAnimationFrame(gameLoop);  
 * update();  
 * render();  
 */
function gameLoop(now) {
    // setTimeout(function () {

    //     requestAnimationFrame(gameLoop);

    // }, 1000 / 30);

    now *= 0.001; // make it seconds

    deltaTime = now - then;
    then = now;

    requestAnimationFrame(gameLoop);
    frameCount++;

    if (frameCount > 10) {
        update();
        render();
    }

}
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * update
 */
function update() {
    controller.update();

    // console.log("Mouse  x" + controller.mouse.x + "  y" + controller.mouse.y);

    backgroundSphere2.position.x = Math.sin(frameCount / 400) * 400;
    backgroundSphere2.position.z = -500 + Math.cos(frameCount / 400) * 400;

    var left = -1;
    var up = 1;
    var right = 1;
    var down = -1;

    var speed = camera.position.z / 40;

    // if (controller.leftarrow) {
    //     camera.position.x += left * speed;
    // }
    // if (controller.uparrow) {
    //     camera.position.y += up * speed;
    // }
    // if (controller.rightarrow) {
    //     camera.position.x += right * speed;
    // }
    // if (controller.downarrow) {
    //     camera.position.y += down * speed;
    // }

    //shift 16
    //ctrl	17

    var shift = -1;
    var ctrl = 1;

    if (controller.keyCodes[16] || controller.keyCodes[69]) {
        camera.position.z += shift * speed;
    }
    if (controller.keyCodes[17] || controller.keyCodes[81]) {
        camera.position.z += ctrl * speed;
    }

    player.update();

    camera.position.x = player.pos.x;
    camera.position.y = player.pos.y;

    skybox.position.x = camera.position.x;
    skybox.position.y = camera.position.y;
    skybox.position.z = camera.position.z;


}
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * render
 */
function render() {
    renderer.render(scene, camera);
}
////    ////    ////
///    ////    ////
//    ////    ////

setup();
gameLoop();

////////////////////////////////////