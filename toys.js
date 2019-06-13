'use strict';

const toys = {
  data: {
    renderer: {},
    scene: {},
    camera: {},
    train: {}
  },
  init: function() {
    this.settings();
    this.ambient();
    this.train();
    this.renderScene();
  },
  settings: function() {
    const canvas = document.querySelector('#c');
    // Establecemos el motor para que renderice todo en el <canvas>
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.renderer.shadowMap.enabled = true;

    // parámetros de la cámara
    const fov = 45; // campo de visión en grados
    const aspect = window.innerWidth / window.innerHeight; // proporción de la escena
    const near = 0.1; // punto más cercano del campo de visión
    const far = 500; // punto más lejano del campo de visión
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 10, 30); // (x, y, z)

    // controles de la cámara para movernos por la escena
    const controls = new THREE.OrbitControls(this.camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    // Creamos la escena donde se va a renderizar todo
    this.scene = new THREE.Scene();
  },
  renderScene: function() {
    const renderer = this.renderer
    const camera = this.camera
    const scene = this.scene

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
  },  
  ambient: function() {
    // color de fondo
    this.scene.background = new THREE.Color('black');

    // luz de ambiente
    const skyColor = 0xddeeff;
    const groundColor = 0x0f0e0d;
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    this.scene.add(light);

    //suelo
    const planeSize = 40;

    // textura suelo
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    // geometría del suelo
    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    // material del suelo
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    // malla del suelo
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    this.scene.add(mesh);
  },
  train: function() {
    this.train = new THREE.OBJLoader2();
    this.train.loadMtl('models/train.mtl', null, (materials) => {
      this.train.setMaterials(materials);
      this.train.castShadow = true;
      this.train.load('models/train.obj', (event) => {
        const root = event.detail.loaderRootNode;
        this.scene.add(root);
      });
    });

    const cubes = new THREE.OBJLoader2();
    cubes.loadMtl('models/cubes.mtl', null, (materials) => {
      cubes.setMaterials(materials);
      cubes.castShadow = true;
      cubes.load('models/cubes.obj', (event) => {
        const root = event.detail.loaderRootNode;
        this.scene.add(root);
      });
    });
  },
  headlights: function() {
    const bulbMat = new THREE.MeshStandardMaterial( {
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000
    } );
    const bulbGeometry = new THREE.SphereBufferGeometry( 0.1, 16, 20, 10 );

    const headlightsSettings = {
      color: 0xffee88,
      intensity: 2,
      position: {
        x: 0.8,
        y: 1.1,
        z: 1.3
      },
      target: {
        position: {
          x: 1,
          y: 0,
          z: 3
        }
      },
      angle: 0.5,
      distance: 15,
      penumbra: 0.5,
      castShadow: true
    };

    const headlights1 = new THREE.SpotLight(
      headlightsSettings.color,
      headlightsSettings.intensity,
      headlightsSettings.distance,
      headlightsSettings.angle,
      headlightsSettings.penumbra
    );
    headlights1.name = 'headlights1'
    headlights1.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    headlights1.position.set(
      headlightsSettings.position.x,
      headlightsSettings.position.y,
      headlightsSettings.position.z
    );
    headlights1.target.position.set(
      headlightsSettings.target.position.x,
      headlightsSettings.target.position.y,
      headlightsSettings.target.position.z
    );
    headlights1.castShadow = headlightsSettings.castShadow;

    const helper1 = new THREE.SpotLightHelper(headlights1);
    // scene.add(helper1);

    const headlights2 = new THREE.SpotLight(
      headlightsSettings.color,
      headlightsSettings.intensity,
      headlightsSettings.distance,
      headlightsSettings.angle,
      headlightsSettings.penumbra
    );
    headlights2.name = 'headlights2'
    headlights2.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    headlights2.position.set(
      -headlightsSettings.position.x,
      headlightsSettings.position.y,
      headlightsSettings.position.z
    );
    headlights2.target.position.set(
      -headlightsSettings.target.position.x,
      headlightsSettings.target.position.y,
      headlightsSettings.target.position.z
    );
    headlights2.castShadow = headlightsSettings.castShadow;

    const helper2 = new THREE.SpotLightHelper(headlights2);
    // scene.add(helper2);

    this.scene.add( headlights1 );
    this.scene.add( headlights2 );

    function updateLight() {
      headlights1.target.updateMatrixWorld();
      helper1.update();
      headlights2.target.updateMatrixWorld();
      helper2.update();
    }
    updateLight();

    // helperLights(headlights1, updateLight());
  },
  deleteObj(name) {
    let selectedObj = this.scene.getObjectByName(name);
    this.scene.remove(selectedObj);
    this.renderScene();
  },
  actions: function() {
    const lights = document.querySelector('#lightsCheckbox').checked;
    if (lights) {
      this.headlights();
    } else {
      this.deleteObj('headlights1');
      this.deleteObj('headlights2');
    }
  }
}

toys.init();
