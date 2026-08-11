// ==========================================================================
// Three.js Background Scene - Cinematic Gold Particles
// ==========================================================================

const canvas = document.getElementById('webgl-canvas');
if (canvas) {
    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060A17, 0.001); // Deep Navy Fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization

    // 2. Particles (Golden Dust)
    const particlesCount = 700; // Keep it optimal for performance
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const goldColor = new THREE.Color(0xD4AF37);
    const brightGold = new THREE.Color(0xFFDF73);

    for (let i = 0; i < particlesCount * 3; i+=3) {
        // Spread particles across a wide area
        posArray[i] = (Math.random() - 0.5) * 100;     // x
        posArray[i+1] = (Math.random() - 0.5) * 100;   // y
        posArray[i+2] = (Math.random() - 0.5) * 50;    // z

        // Mix colors between gold and bright gold for depth
        const mixColor = Math.random() > 0.5 ? goldColor : brightGold;
        colorsArray[i] = mixColor.r;
        colorsArray[i+1] = mixColor.g;
        colorsArray[i+2] = mixColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    // Create a circular texture for particles programmatically to avoid external loading issues
    const createCircleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(8, 8, 8, 0, Math.PI * 2);
        context.fillStyle = '#ffffff';
        context.fill();
        return new THREE.CanvasTexture(canvas);
    };

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        map: createCircleTexture(),
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending, // Gives that glowing effect
        depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 3. Mouse Interaction (Parallax Effect)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 4. Animation Loop
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Slow rotation of the entire particle system
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        // Smooth mouse parallax
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();
}
