class Obstacle {
    static SPACING = 20;
    static COLS = 12;
    static ROWS = this.COLS + 2;

    p5;
    body;

    constructor(p5, x, y, r) {
        const options = { isStatic: true }
        this.body = Matter.Bodies.circle(x, y, r, options)
        this.r = r
        this.p5 = p5 // inject p5 instance
    }

    show = () => {
        this.p5.fill("#ffd900");
        this.p5.stroke("#ffd900");
        const pos = this.body.position;
        this.p5.push()  // translate is accumulative
        this.p5.translate(pos.x, pos.y)
        this.p5.ellipse(0, 0, this.r * 2)
        this.p5.pop()
    }
}