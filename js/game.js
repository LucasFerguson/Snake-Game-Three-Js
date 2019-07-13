//          ////////////////////////////
//         //// SPACE SHOOTER GAME ////
//        ////    Created By      ////
//       ////   Lucas Ferguson   ////
//      ////////////////////////////


//// ////
let raycaster;
let mouse;

let world = {
    width: 60,
    height: 60
}


let shipSprite;
//// ////

/**
 * backgroundPlane for mouse raycaster to hit
 */
let backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(world.width, world.height, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0x111111
        // wireframe: true
    })
);
backgroundPlane.position.z = -1;
backgroundPlane.receiveShadow = true;
scene.add(backgroundPlane);
// backgroundPlane.material.visible = false;
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * ambientLight Disabled **Disabled**
 */
let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight); // **Disabled**
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * directionalLight 
 */
var directionalLight = new THREE.PointLight(0xffffff, 1, 500, 0.01);
directionalLight.castShadow = true; // default false

//Set up shadow properties for the light
// directionalLight.shadow.mapSize.width = 512; // default 512
// directionalLight.shadow.mapSize.height = 512; // default 512
// directionalLight.shadow.camera.near = 0; // default
// directionalLight.shadow.camera.far = 1000
// default
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

/**
 * Time Keeper
 */
let clock = new THREE.Clock(true);
////    ////    ////
///    ////    ////
//    ////    ////

/**
 * Food
 */
let food = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({
        color: 0xff0000
    })
);
scene.add(food);
food.castShadow = true;

let foodLight = new THREE.PointLight(0xff0000, 1, 20);
scene.add(foodLight);

////    ////    ////
///    ////    ////
//    ////    ////

function setup() {
    eatfood();
}

function eatfood() {
    food.position.x = Math.round(Math.random() * world.width - world.width / 2);
    food.position.y = Math.round(Math.random() * world.height - world.height / 2);

    foodLight.position.set(food.position.x, food.position.y, 3);

}

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


    if (controller.uparrow) {
        player.direction = "up";
    }
    if (controller.downarrow) {
        player.direction = "down";
    }
    if (controller.leftarrow) {
        player.direction = "left";
    }
    if (controller.rightarrow) {
        player.direction = "right";
    }

    //shift 16
    //ctrl	17

    // var shift = -1;
    // var ctrl = 1;

    // if (controller.keyCodes[16] || controller.keyCodes[69]) {
    //     camera.position.z += shift * speed;
    // }
    // if (controller.keyCodes[17] || controller.keyCodes[81]) {
    //     camera.position.z += ctrl * speed;
    // }


    directionalLight.position.x = Math.sin(frameCount / 100) * 50;
    directionalLight.position.z = Math.cos(frameCount / 100) * 50;


    if (clock.getElapsedTime() > 0.1) {
        if (controller.keyCodes[32]) {
            player.grow();
        }
        player.update();


        clock.start();

    }

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