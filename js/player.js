class Player {
    constructor() {
        this.pos = new THREE.Vector2(0, 0);
        this.vel = new THREE.Vector2(0, 0);
        this.acc = new THREE.Vector2(0, 0);

        this.tailGeometry = new THREE.BoxGeometry(1, 1, 1);
        this.tailMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        this.tail = [];

        this.tail.push(new THREE.Mesh(this.tailGeometry, this.tailMaterial));
        scene.add(this.tail[0]);


        this.snakeLen = 5;

        this.invulnerable = false;
        this.recharge = 0;

        this.direction = "right"; // "up" "down" "left" "right"

        this.head = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({
                color: 0x00ff00
            })
        );
        scene.add(this.head);



        this.pointLight = new THREE.PointLight(0x00ff00, 1, 20);
        scene.add(this.pointLight);


    }

    update() {

        this.recharge++;

        if (this.invulnerable) {
            this.pointLight.color.setHex(0x0000ff);
            this.head.material.color.setHex(0x0000ff);

            if (this.recharge == 15) {
                this.invulnerable = false;
            }
        } else {
            this.pointLight.color.setHex(0x00ff00);
            this.head.material.color.setHex(0x00ff00);

            if (controller.shift && this.recharge >= 10) {
                this.invulnerable = true;
                this.recharge = 0;
                console.log("shift");
            }
        }

        console.log(this.invulnerable, this.recharge);

        // console.log(this.tail);

        if (this.direction == "up") {
            this.pos.y++;
        }
        if (this.direction == "down") {
            this.pos.y--;
        }
        if (this.direction == "left") {
            this.pos.x--;
        }
        if (this.direction == "right") {
            this.pos.x++;
        }

        if (this.pos.x > world.width / 2) {
            this.pos.x = -world.width / 2;
        }
        if (this.pos.x < -world.width / 2) {
            this.pos.x = world.width / 2;
        }
        if (this.pos.y > world.height / 2) {
            this.pos.y = -world.height / 2;
        }
        if (this.pos.y < -world.height / 2) {
            this.pos.y = world.height / 2;
        }

        for (let i = 0; i <= this.tail.length - 1; i++) {
            if (!this.invulnerable) {
                if (this.tail[i].position.x == this.pos.x && this.tail[i].position.y == this.pos.y) {
                    console.log("dead");
                    location.reload();
                }
            }

            if (food.position.x == this.pos.x && food.position.y == this.pos.y) {

                for (let i = 0; i <= 10; i++) {
                    this.grow();
                }

                eatfood();
            }
        }

        this.head.position.x = this.pos.x;
        this.head.position.y = this.pos.y;

        this.pointLight.position.set(this.pos.x, this.pos.y, 3);

        for (let i = this.tail.length - 1; i >= 1; i--) {
            let newPos = new THREE.Vector2(this.tail[i - 1].position.x, this.tail[i - 1].position.y);

            this.tail[i].position.x = newPos.x;
            this.tail[i].position.y = newPos.y;
        }

        this.tail[0].position.x = this.head.position.x;
        this.tail[0].position.y = this.head.position.y;


        // console.log("this.acc.x == " + this.acc.x);
        // console.log("this.vel.x == " + this.vel.x);
        // console.log("this.pos.x == " + this.pos.x);

        // if (this.acc.x.isNaN()) {
        //     console.error("this.acc.x == " + this.acc.x);
        // }
        // if (this.vel.x.isNaN()) {
        //     console.error("this.vel.x == " + this.vel.x);
        // }
        // if (this.pos.x.isNaN()) {
        //     console.error("this.pos.x == " + this.pos.x);
        // }
    }

    grow() {

        let cube = new THREE.Mesh(this.tailGeometry, this.tailMaterial);

        cube.position.x = 100;
        cube.position.y = 100;


        cube.castShadow = true; //default is false
        cube.receiveShadow = true; //default

        this.tail.push(cube);

        scene.add(this.tail[this.tail.length - 1]);
    }

    // render() { }
}