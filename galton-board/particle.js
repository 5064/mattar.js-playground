class Particle {
    p5;
    body;

    constructor(p5, x, y, r) {
        const options = { restitution: 0.2 }
        this.p5 = p5 // inject p5 instance
        this.body = Matter.Bodies.circle(x, y, r, options)
        this.r = r
    }

    show = () => {
        this.p5.fill(255);
        this.p5.stroke(255);
        const pos = this.body.position;
        this.p5.push()  // translate is accumulative
        this.p5.translate(pos.x, pos.y)
        this.p5.ellipse(0, 0, this.r * 2)
        this.p5.pop()
    }
}