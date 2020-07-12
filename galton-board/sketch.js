const GaltonBoard = (p5) => {
    // for Matter.js
    let engine;
    let world;
    let bodies;

    let particles = [];
    let obstacles = [];
    let boundaries = [];
    let storages = [];
    let stopper;

    const MAX_PARTICLES = 200;

    const CANVAS_X = 500
    const CANVAS_Y = 800
    const START_X = CANVAS_X / 2
    const START_Y = 150;
    const PARTICLE_R = 5

    p5.setup = () => {
        p5.createCanvas(CANVAS_X, CANVAS_Y);
        p5.rectMode(p5.CENTER);

        engine = Matter.Engine.create();
        world = engine.world;
        world.gravity.y = 2;

        for (let i = 0; i < MAX_PARTICLES; i++) {
            const p = new Particle(p5, START_X + (Math.random() * 10), START_Y / 3 + (Math.random() * 10), PARTICLE_R);
            Matter.World.add(world, p.body)
            particles.push(p);
        }

        setupObstacle();

        setupBoundary();

        setupStorage();

        setupStopper();
    }

    setupObstacle = () => {
        for (let i = 0; i < Obstacle.ROWS; i++) {
            let shiftX = 0
            if (i % 2 === 0) {
                shiftX = Obstacle.SPACING / 2
            }
            for (let j = 0; j < Obstacle.COLS; j++) {
                const o = new Obstacle(p5, START_X + shiftX + Obstacle.SPACING * j, (START_Y + 50) + Obstacle.SPACING * i, 3);
                Matter.World.add(world, o.body)
                obstacles.push(o);
            }
        }
    }

    setupStopper = () => {
        const s = new Stopper(p5, START_X, START_Y, PARTICLE_R)
        Matter.World.add(world, s.body);
        stopper = s
    }

    setupStorage = () => {
        const sLeft = new PStorage(p5, 0, 0, 0, START_Y, START_X - PARTICLE_R, START_Y);
        const sRight = new PStorage(p5, CANVAS_X, 0, CANVAS_X, START_Y, START_X + PARTICLE_R, START_Y);
        Matter.World.add(world, sLeft.body)
        Matter.World.add(world, sRight.body)
        storages.push(...[sLeft, sRight])
    }

    setupBoundary = () => {
        const bT = 10;  // thickness
        const bTop = new Boundary(p5, CANVAS_X / 2, 0 + bT / 2, CANVAS_X, bT);
        const bLeft = new Boundary(p5, 0 + bT / 2, CANVAS_Y / 2, bT, CANVAS_Y);
        const bRight = new Boundary(p5, CANVAS_X - bT / 2, CANVAS_Y / 2, bT, CANVAS_Y);
        const bBottom = new Boundary(p5, CANVAS_X / 2, CANVAS_Y - bT / 2, CANVAS_X, bT);
        Matter.World.add(world, bTop.body);
        Matter.World.add(world, bLeft.body);
        Matter.World.add(world, bRight.body);
        Matter.World.add(world, bBottom.body);
        boundaries.push(...[bTop, bLeft, bRight, bBottom])
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
        for (let b of boundaries) {
            b.show();
        }
        for (let s of storages) {
            s.show();
        }
        stopper.show();
    }

}

new p5(GaltonBoard)