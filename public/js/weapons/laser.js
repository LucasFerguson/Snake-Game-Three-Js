class Laser {
    constructor(_pos, _vel) {
        this.pos = new THREE.Vector2(_pos.x, _pos.y);
        this.vel = new THREE.Vector2(_vel.x, _vel.y);
        this.acc = new THREE.Vector2(0, 0);
        this.angle = 0;

        let spriteMap = new THREE.TextureLoader().load("./assets/images/Space Ship.png");

        let spriteMaterial = new THREE.SpriteMaterial({
            map: spriteMap,
            color: 0xffffff
        });
        this.shipSprite = new THREE.Sprite(spriteMaterial);
        scene.add(this.shipSprite);

    }

    update() {

        this.acc.multiplyScalar(deltaTime);

        this.vel.add(this.acc);

        this.pos.add(this.vel);
        this.shipSprite.position.set(this.pos.x, this.pos.y, 0);
        this.shipSprite.material.rotation = this.angle - Math.PI / 2;
        this.acc.multiplyScalar(0);

        // console.log("this.acc.x == " + this.acc.x);
        // console.log("this.vel.x == " + this.vel.x);
        // console.log("this.pos.x == " + this.pos.x);

    }

    // render() { }
}