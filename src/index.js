// Only JS file, required libraries needs to be installed first


import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

// import * as dat from 'dat.gui'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
/**
 * Base
 */
// Debug
// const gui = new dat.GUI() 1
const gui = new dat.GUI();
// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene
const scene = new THREE.Scene()

//Galaxy
const parameters = {};
parameters.count = 100000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.2;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry1 = null;
let material1 = null;
let points = null;

const generateGalaxy = () => {
  // Destroy old galaxy
  if (points !== null) {
    geometry1.dispose();
    material1.dispose();
    scene.remove(points);
  }

  /**
   * Geometry
   */
  geometry1 = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    // Position
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;

    const spinAngle = radius * parameters.spin;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry1.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry1.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  /**
   * Material
   */
  material1 = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  /**
   * Points
   */
  points = new THREE.Points(geometry1, material1);
  points.position.set(30,3,2)
  scene.add(points);
};
gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

generateGalaxy();
//Fog
const fog = new THREE.Fog("#262837", 1, 90);

scene.fog = fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//Group
const fullFrame = new THREE.Group();
scene.add(fullFrame);

const box = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ color: '#ac8e82' })
)
box.position.x = 12
box.position.y = 3;
box.position.z = -2;
scene.add(box)

const box1 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ color: "#ac8e82" })
);
box1.position.x = 1;
box1.position.y = 3;
box1.position.z = 11;
scene.add(box1);

const geometry = new THREE.CylinderGeometry(1, 2, 1.5, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x090900 });
const cylinder = new THREE.Mesh(geometry, material);
cylinder.position.x = 12;
cylinder.position.y = 0;
cylinder.position.z = -2;
scene.add(cylinder);
const cylinder8 = new THREE.Mesh(new THREE.CylinderGeometry(1, 2, 1.5, 32), new THREE.MeshBasicMaterial({ color: 0x090900 }));
cylinder8.position.x = 30;
cylinder8.position.y = 0;
cylinder8.position.z = 0;
scene.add(cylinder8);

const cylinder9 = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 2, 1.5, 32),
  new THREE.MeshBasicMaterial({ color: 0x090900 })
);
cylinder9.position.x = 45;
cylinder9.position.y = 0;
cylinder9.position.z = 0;
scene.add(cylinder9);



const cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(1, 2, 1.5, 32), new THREE.MeshBasicMaterial({ color: 0x090900 }));
cylinder1.position.x = 1;
cylinder1.position.y = 0;
cylinder1.position.z = 11;
scene.add(cylinder1);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 5, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
cylinder2.position.x = -7;
cylinder2.position.y = 0;
cylinder2.position.z = 11;
scene.add(cylinder2);
const cylinder3 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 5, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
cylinder3.position.x = -7;
cylinder3.position.y = 0;
cylinder3.position.z = 24;
scene.add(cylinder3);
const cylinder4 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 5, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
cylinder4.position.x = -7;
cylinder4.position.y = 0;
cylinder4.position.z = 38;
scene.add(cylinder4);
const cylinder5 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 5, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
cylinder5.position.x = 12;
cylinder5.position.y = 0;
cylinder5.position.z = -10;
scene.add(cylinder5);
const cylinder6 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 5, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
cylinder6.position.x = 30;
cylinder6.position.y = 0;
cylinder6.position.z = -10;
scene.add(cylinder6);
const cylinder7 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 5, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
cylinder7.position.x = 40;
cylinder7.position.y = 0;
cylinder7.position.z = -10;
scene.add(cylinder7);
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)
// Particles
const particlesGeometry=new THREE.BufferGeometry()
const count=50000

const positions=new Float32Array(count*3)
for (let i=0; i<count*3;i++){
  positions[i]=(Math.random()-0.5)*100
}
particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions,3)
)
const particlesMaterial=new THREE.PointsMaterial({
  size:0.08,
  sizeAttenuation:true,
  color:'white'
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
// This code portion needs to be refractored to be cleaner!!
const torusgeometry = new THREE.TorusGeometry(0.5, 5, 4, 10);
const torusmaterial = new THREE.MeshBasicMaterial({ color:'white', wireframe: true });
const torus = new THREE.Mesh(torusgeometry, torusmaterial);
torus.position.set(-10, 6, 20)
torus.rotation.set(0, 0.8, 0)
scene.add(torus);
const torusgeometry1 = new THREE.TorusGeometry(0.5, 5, 4, 10);
const torusmaterial1 = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true });
const torus1 = new THREE.Mesh(torusgeometry, torusmaterial);
torus1.position.set(20, 6, -10)
torus1.rotation.set(0, 0.8, 0)
scene.add(torus1);





// Category text
const loader = new THREE.FontLoader();
loader.load(
  // resource URL
  './fonts/helvetiker_regular.typeface.json',

  // onLoad callback
  (font)=> {
    const textGeometry=new THREE.TextBufferGeometry(
      "Welcome to the exibition",
      {
        font:font,
        size:1,
        height:0.1,
        curveSegments:20,
        bevelEnabled:true,
        bevelThickness:0.015,
        bevelSize:0.02,
        bevelOffset:0,
        bevelSegments:50

      }
    )
    const textMaterial=new THREE.MeshBasicMaterial({color:'black'})
    const text=new THREE.Mesh(textGeometry,textMaterial)
    // text.position.set(6.5, 0.2, 15)
    text.position.set(0, 1, 40)
    text.rotation.set(0, 0.8, 0)
    scene.add(text);
  }
);
//Rectangle as a frame 
const texturePainting = new THREE.TextureLoader().load(
  "./test.jpeg"
);
const materialPainting = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texturePainting,
});
const frame = new THREE.PlaneGeometry(5, 5);
const frameMesh = new THREE.Mesh(frame, materialPainting);
frameMesh.position.set(1, 5, -1);
frameMesh.rotation.y = Math.PI / 4;
fullFrame.add(frameMesh);

const backframe = new THREE.Mesh(
  new THREE.PlaneGeometry(16, 12),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
  })
);
backframe.position.set(0.9, 5, -1);
backframe.rotation.y = Math.PI / 4;
fullFrame.add(backframe);
fullFrame.position.set(-1, 0, 0)
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//Box light
const boxlight = new THREE.PointLight('#ff7d46', 1, 30)
boxlight.position.set(1, 3, 4)
scene.add(boxlight)

// Ghost

const ghost1 = new THREE.PointLight('#ff00ff', 3, 3)
ghost1.castShadow = true
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7
scene.add(ghost1)


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 12
camera.position.y = 3
camera.position.z = 12

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.enablePan=true

//Camera view limits
controls.minPolarAngle = 0.2; // radians
controls.maxPolarAngle = Math.PI / 2.1; // radians
controls.minDistance = 10;
controls.maxDistance = 50;

controls.minAzimuthAngle = Math.PI / 30;
controls.maxAzimuthAngle = Math.PI / 2;


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#262837");

/**
 * Animate
 */
const clock = new THREE.Clock()
const flag = true
const tick = () => {
  if (flag == true) {
    camera.position.x += 0.004;
  }
  const elapsedTime = clock.getElapsedTime();



  torus.rotation.z+=0.003
  torus1.rotation.z += 0.003


  box.rotation.y += 0.02
  box.rotation.z += 0.02;

  box1.rotation.y += 0.02;
  box1.rotation.z += 0.02;

  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 6;
  ghost1.position.z = Math.sin(ghost1Angle) * 6;
  ghost1.position.y = Math.sin(elapsedTime * 4);


  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

