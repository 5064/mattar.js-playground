class PStorage {
    p5;
    body;
    x1
    y1
    x2
    y2
    x3
    y3

    constructor(p5, x1, y1, x2, y2, x3, y3) {
        this.p5 = p5 // inject p5 instance
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.x3 = x3
        this.y3 = y3
        const options = {
            isStatic: true,
            slop: 0
        }
        const vertices = Matter.Vertices.fromPath(`L ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`)
        this.body = Matter.Bodies.fromVertices((x1 + x2 + x3) / 3, (y1 + y2 + y3) / 3, vertices, options)
    }

    show = () => {
        this.p5.fill("#ffd900");
        this.p5.stroke("#ffd900");
        const pos = this.body.position;
        this.p5.triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)
    }
}