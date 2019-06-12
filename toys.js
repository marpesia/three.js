'use strict';

/* global THREE */

let bulbLight1, bulbLight2, train, scene;

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

class DegRadHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return THREE.Math.radToDeg(this.obj[this.prop]);
  }
  set value(v) {
    this.obj[this.prop] = THREE.Math.degToRad(v);
  }
}

function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
  folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
  folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
  folder.open();
}

function lights() {
  const bulbMat = new THREE.MeshStandardMaterial( {
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000
  } );
  const bulbGeometry = new THREE.SphereBufferGeometry( 0.1, 16, 20, 10 );

  const paramsBulbLight = {
    color: 0xffee88,
    intensity: 2,
    position: {
      x: 0.8,
      y: 1.1,
      z: 1.3
    },
    targetPosition: {
      x: 1,
      y: 0,
      z: 3
    },
    angle: 0.5,
    distance: 15,
    penumbra: 0.5,
    castShadow: true
  };

  bulbLight1 = new THREE.SpotLight(
    paramsBulbLight.color,
    paramsBulbLight.intensity
  );
  bulbLight1.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
  bulbLight1.position.set(
    paramsBulbLight.position.x,
    paramsBulbLight.position.y,
    paramsBulbLight.position.z
  );
  bulbLight1.target.position.set(
    paramsBulbLight.targetPosition.x,
    paramsBulbLight.targetPosition.y,
    paramsBulbLight.targetPosition.z
  );
  bulbLight1.angle = paramsBulbLight.angle;
  bulbLight1.distance = paramsBulbLight.distance;
  bulbLight1.penumbra = paramsBulbLight.penumbra;
  bulbLight1.castShadow = paramsBulbLight.castShadow;

  const helper1 = new THREE.SpotLightHelper(bulbLight1);
  // scene.add(helper1);

  bulbLight2 = new THREE.SpotLight(
    paramsBulbLight.color,
    paramsBulbLight.intensity
  );
  bulbLight2.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
  bulbLight2.position.set(
    -paramsBulbLight.position.x,
    paramsBulbLight.position.y,
    paramsBulbLight.position.z
  );
  bulbLight2.target.position.set(
    -paramsBulbLight.targetPosition.x,
    paramsBulbLight.targetPosition.y,
    paramsBulbLight.targetPosition.z
  );
  bulbLight2.angle = paramsBulbLight.angle;
  bulbLight2.distance = paramsBulbLight.distance;
  bulbLight2.penumbra = paramsBulbLight.penumbra;
  bulbLight2.castShadow = paramsBulbLight.castShadow;

  const helper2 = new THREE.SpotLightHelper(bulbLight2);
  // scene.add(helper2);

  scene.add( bulbLight1 );
  scene.add( bulbLight2 );

  function updateLight() {
    bulbLight1.target.updateMatrixWorld();
    helper1.update();
    bulbLight2.target.updateMatrixWorld();
    helper2.update();
  }
  updateLight();

  // const gui = new dat.GUI();
  // gui.addColor(new ColorGUIHelper(bulbLight1, 'color'), 'value').name('color');
  // gui.add(bulbLight1, 'intensity', 0, 2, 0.01);
  // gui.add(bulbLight1, 'distance', 0, 40).onChange(updateLight);
  // gui.add(new DegRadHelper(bulbLight1, 'angle'), 'value', 0, 90).name('angle').onChange(updateLight);
  // gui.add(bulbLight1, 'penumbra', 0, 1, 0.01);

  // makeXYZGUI(gui, bulbLight1.position, 'position', updateLight);
  // makeXYZGUI(gui, bulbLight1.target.position, 'target', updateLight);
}

function main() {

  /* -------------------- CONFIGURACIÓN BÁSICA ---------------------- */

  // Establecemos dónde va a pintarse nuestra escena en 3D
  const canvas = document.querySelector('#c');
  // Establecemos el motor para que renderice todo en el <canvas>
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.shadowMap.enabled = true;

  // parámetros de la cámara
  const fov = 45; // campo de visión en grados
  const aspect = window.innerWidth / window.innerHeight; // proporción de la escena
  const near = 0.1; // punto más cercano del campo de visión
  const far = 500; // punto más lejano del campo de visión
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 30); // (x, y, z)

  // controles de la cámara para movernos por la escena
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  // Creamos la escena donde se va a renderizar todo
  scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  /* -------------------- FIN CONFIGURACIÓN BÁSICA ---------------------- */

  /* -------------------- LUCES ------------------------------------- */
  { // LUZ DE AMBIENTE
    const skyColor = 0xddeeff;
    const groundColor = 0x0f0e0d;
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  // {
  //   const color = 0xFFFFFF;
  //   const intensity = 0.5;
  //   const light = new THREE.DirectionalLight(color, intensity);
  //   light.position.set(0, 10, 0);
  //   light.target.position.set(-5, 0, 0);
  //   scene.add(light);
  //   scene.add(light.target);
  // }

  // LUZ DE LOS FAROS
  lights();


  /*-------------- OBJETOS Y MATERIALES DE BLENDER ------------------ */

  // cargamos el material y el objeto de Blender
  {
    train = new THREE.OBJLoader2();
    train.loadMtl('models/train.mtl', null, (materials) => {
      train.setMaterials(materials);
      train.castShadow = true;
      train.load('models/train.obj', (event) => {
        const root = event.detail.loaderRootNode;
        scene.add(root);
      });
    });

    const cubes = new THREE.OBJLoader2();
    cubes.loadMtl('models/cubes.mtl', null, (materials) => {
      cubes.setMaterials(materials);
      cubes.castShadow = true;
      cubes.load('models/cubes.obj', (event) => {
        const root = event.detail.loaderRootNode;
        scene.add(root);
      });
    });
  }

  // PLANO

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  }

  /* ------------------------ ANIMATION ---------------------------- */

  {
    const animationGroup = new THREE.AnimationObjectGroup();

    animationGroup.add(train);
    animationGroup.add(bulbLight1);
    animationGroup.add(bulbLight2);

    // Setup the animation loop.
    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
    // requestAnimationFrame(animate);

    const coords = { x: 0, y: 0 }; // Start at (0, 0)
    const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
      .to({ x: 300, y: 200 }, 1000) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(() => { // Called after tween.js updates 'coords'.
          // Move 'box' to the position described by 'coords' with a CSS translation.
          train.position.set(0, 0, 0);
      })
      .start(); // Start the tween immediately.

    // tween();
  }

  /*------------------------- RENDER ------------------------------- */

  // actualizamos el render con respecto al navegador
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // refresco de render
  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    // se utiliza para indicar al navegador que queremos animal algo
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
