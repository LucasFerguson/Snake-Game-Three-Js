//          ////////////////////////////
//         //// SPACE SHOOTER GAME ////
//        ////    Created By      ////
//       ////   Lucas Ferguson   ////
//      ////////////////////////////


//// ////
let raycaster;
let mouse;

let world = {
    width: 100,
    height: 100
}


let shipSprite;
//// ////

/**
 * backgroundPlane for mouse raycaster to hit
 */
let backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(world.width, world.height, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xffffff
        // wireframe: true
    })
);
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