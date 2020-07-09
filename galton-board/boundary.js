class Boundary {
    p5;
    body;
    x;
    y;
    w;
    h;

    constructor(p5, x, y, w, h) {
        const options = { isStatic: true }
        this.p5 = p5 // inject p5 instance
        this.body = Matter.Bodies.rectangle(x, y, w, h, options)
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    show = () => {
        this.p5.fill("#ffd900");
        this.p5.stroke("#ffd900");
        const pos = this.body.position;
        this.p5.push()  // translate is accumulative
        this.p5.translate(pos.x, pos.y)
        this.p5.rect(0, 0, this.w, this.h)
        this.p5.pop()
    }
}