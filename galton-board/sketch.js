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

    const MAX_PARTICLES = 100;

    const CANVAS_X = 500
    const CANVAS_Y = 800
    const START_X = CANVAS_X / 2
    const START_Y = 150;
    const PARTICLE_R = 3
    const OBS_R = 5

    p5.setup = () => {
        p5.createCanvas(CANVAS_X, CANVAS_Y);
        p5.rectMode(p5.CENTER);

        engine = Matter.Engine.create();
        world = engine.world;
        world.gravity.y = 2;

        for (let i = 0; i < MAX_PARTICLES; i++) {
            const p = new Particle(p5, START_X + (Math.random() * 10), START_Y / 2 + (Math.random() * 10), PARTICLE_R);
            Matter.World.add(world, p.body)
            particles.push(p);
        }

        setupObstacle();

        setupBoundary();

        setupStorage();

        // setupStopper();
    }

    setupObstacle = () => {
        for (let i = 0; i < Obstacle.ROWS; i++) {
            let shiftX = 0
            if (i % 2 !== 0) {
                shiftX += Obstacle.SPACING / 2  // Partricleが垂直落下したとき中心に
            }
            for (let j = 0; j < i + 3; j++) {
                shiftX += calcIntervalX(j, PARTICLE_R * 2 + OBS_R * 2);
                const shiftY = perpendicular(i, PARTICLE_R * 2 + OBS_R * 2);

                const o = new Obstacle(p5, START_X + shiftX, (START_Y + 20) + shiftY, OBS_R);
                Matter.World.add(world, o.body)
                obstacles.push(o);
            }
        }
    }

    calcIntervalX = (index, interval) => {
        return index % 2 === 0 ? index * interval : -1 * index * interval
    }

    perpendicular = (index, spacing) => {
        return ((Math.sqrt(3) * spacing) / 2) * index
    }

    setupStopper = () => {
        const s = new Stopper(p5, START_X, START_Y, PARTICLE_R)
        Matter.World.add(world, s.body);
        stopper = s
    }

    setupStorage = () => {
        const sLeft = new PStorage(p5, 0, 0, 0, START_Y, START_X - PARTICLE_R, START_Y, START_X - PARTICLE_R, START_Y - 10);
        const sRight = new PStorage(p5, CANVAS_X, 0, CANVAS_X, START_Y, START_X + PARTICLE_R, START_Y, START_X + PARTICLE_R, START_Y - 10);
        Matter.World.add(world, sLeft.body)
        Matter.World.add(world, sRight.body)
        storages.push(...[sLeft, sRight])
    }

    setupBoundary = () => {
        const bT = 10;  // thickness
        const bTop = new Boundary(p5, CANVAS_X / 2, 0 + bT / 2, CANVAS_X, bT);
        const bLeft = new Boundary(p5, 0 + bT / 2, CANVAS_Y / 2, bT, CANVAS_Y);
        const bRight = new Boundary(p5, CANVAS_X - bT / 2, CANVAS_Y / 2, bT, CANVAS_Y);
        const bBottom = new Boundary(p5, CANVAS_X / 2, CANVAS_Y - bT / 2, CANVAS_X, 10);
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
        // stopper.show();
    }

}

new p5(GaltonBoard)