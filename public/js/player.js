class Player {
    constructor() {
        this.pos = new THREE.Vector2(0, 0);
        this.vel = new THREE.Vector2(0, 0);
        this.acc = new THREE.Vector2(0, 0);

        this.tailGeometry = new THREE.BoxGeometry(1, 1, 1);
        this.tailMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.tail = [];
        this.tail.push(new THREE.Mesh(this.tailGeometry, this.tailMaterial));
        scene.add(this.tail[0]);


        this.snakeLen = 5;

        this.direction = "false"; // "up" "down" "left" "right"

        this.head = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0x00ff00
            })
        );
        scene.add(this.head);

    }

    update() {

        console.log(this.tail);

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

        this.head.position.x = this.pos.x;
        this.head.position.y = this.pos.y;

        for (var i = this.tail.length - 1; i >= 1; i--) {
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

        let newPos = new THREE.Vector2(this.tail[this.tail.length - 1].x, this.tail[this.tail.length - 1].y);
        cube.position.x = newPos.x;
        cube.position.y = newPos.y;

        this.tail.push(cube);

        scene.add(this.tail[this.tail.length - 1]);
    }

    // render() { }
}