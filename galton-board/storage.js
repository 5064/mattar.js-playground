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
        const options = { isStatic: true }
        const triangle = Matter.Vertices.fromPath(`L ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3}`)
        const incenter = this.incenter();
        this.body = Matter.Bodies.fromVertices(incenter["x"], incenter["y"], triangle, options)

        console.log(incenter)

    }

    incenter = () => {
        return {
            x: ((Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2) * this.x3) + (Math.sqrt((this.x2 - this.x3) ** 2 + (this.y2 - this.y3) ** 2) * this.x1) + (Math.sqrt((this.x3 - this.x1) ** 2 + (this.y3 - this.y1) ** 2) * this.x2)) / (Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2) + Math.sqrt((this.x2 - this.x3) ** 2 + (this.y2 - this.y3) ** 2) + Math.sqrt((this.x3 - this.x1) ** 2 + (this.y3 - this.y1) ** 2)),
            y: ((Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2) * this.y3) + (Math.sqrt((this.x2 - this.x3) ** 2 + (this.y2 - this.y3) ** 2) * this.y1) + (Math.sqrt((this.x3 - this.x1) ** 2 + (this.y3 - this.y1) ** 2) * this.y2)) / (Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2) + Math.sqrt((this.x2 - this.x3) ** 2 + (this.y2 - this.y3) ** 2) + Math.sqrt((this.x3 - this.x1) ** 2 + (this.y3 - this.y1) ** 2))
        }
    }


    show = () => {
        this.p5.fill("#ffd900");
        this.p5.stroke("#ffd900");
        const pos = this.body.position;
        this.p5.triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)
    }
}