const GaltonBoard = (p5) => {
    // for Matter.js
    let engine;
    let world;
    let bodies;

    let particles = [];
    let obstacles = [];
    let boundary;

    const MAX_PARTICLES = 100;

    const CANVAS_X = 500
    const CANVAS_Y = 800
    const START_X = CANVAS_X / 2
    const START_Y = 100;

    p5.setup = () => {
        p5.createCanvas(CANVAS_X, CANVAS_Y);

        engine = Matter.Engine.create();
        world = engine.world;
        world.gravity.y = 2;

        for (let i = 0; i < MAX_PARTICLES; i++) {
            const p = new Particle(p5, START_X, START_Y / 2, 5);
            Matter.World.add(world, p.body)
            particles.push(p);
        }

        for (let i = 0; i < Obstacle.ROWS; i++) {
            let shiftX = 0
            if (i % 2 === 0) {
                shiftX = Obstacle.SPACING / 2
            }
            for (let j = 0; j < Obstacle.COLS; j++) {
                const o = new Obstacle(p5, 250 + shiftX + Obstacle.SPACING * j, 120 + Obstacle.SPACING * i, 3);
                Matter.World.add(world, o.body)
                obstacles.push(o);
            }
        }

        this.setupBoundary();
    }

    setupStopper = () => {
        // START_Y
    }

    setupBoundary = () => {
        const bH = 10;
        const b = new Boundary(p5, 0, CANVAS_Y - bH, CANVAS_X, bH);
        Matter.World.add(world, b.body)
        boundary = b
    }

    p5.draw = () => {
        p5.background(51)

        Matter.Engine.update(engine);
        for (let p of particles) {
            p.show();
        }
        for (let o of obstacles) {
            o.show();
        }
        boundary.show()
    }

}

new p5(GaltonBoard)