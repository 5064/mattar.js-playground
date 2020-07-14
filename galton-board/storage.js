class PStorage {
    p5;
    body;
    x1
    y1
    x2
    y2
    x3
    y3
    x4
    y4

    constructor(p5, x1, y1, x2, y2, x3, y3, x4, y4) {
        this.p5 = p5 // inject p5 instance
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.x3 = x3
        this.y3 = y3
        this.x4 = x4
        this.y4 = y4
        const options = {
            isStatic: true,
            // slop: 0
        }
        const vertices = Matter.Vertices.fromPath(`L ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`)
        this.body = Matter.Bodies.fromVertices((x1 + x2 + x3 + x4) / 4, (y1 + y2 + y3 + y4) / 4, vertices, options)
    }

    show = () => {
        this.p5.fill("#ffd900");
        this.p5.stroke("#ffd900");
        const pos = this.body.position;
        this.p5.quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4)
    }
}