  /* ------------ HELPERS LUCES ------------------ */
  function lights() {
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

    /* ------------ HELPERS LUCES ------------------ */

    // {
      // const color = 0xc8b42b;
      // const intensity = 2;
      // const light = new THREE.SpotLight(color, intensity);
      // light.position.set(-0.9, 1.2, 1.3);
      // light.target.position.set(-1, 0, 10);
      // light.castShadow = true;

      // light.shadow.mapSize.width = 1024;
      // light.shadow.mapSize.height = 1024;

      // light.shadow.camera.near = 500;
      // light.shadow.camera.far = 4000;
      // light.shadow.camera.fov = 30;

      // light.angle = 0.2;
      // light.distance = 18;
      // scene.add(light);
      // scene.add(light.target);

      // const helper = new THREE.SpotLightHelper(light);
      // // scene.add(helper);

      // function updateLight() {
      //   light.target.updateMatrixWorld();
      //   helper.update();
      // }
      // updateLight();

      // const gui = new dat.GUI();
      // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
      // gui.add(light, 'intensity', 0, 2, 0.01);
      // gui.add(light, 'distance', 0, 40).onChange(updateLight);
      // gui.add(new DegRadHelper(light, 'angle'), 'value', 0, 90).name('angle').onChange(updateLight);
      // gui.add(light, 'penumbra', 0, 1, 0.01);

      // makeXYZGUI(gui, light.position, 'position', updateLight);
      // makeXYZGUI(gui, light.target.position, 'target', updateLight);
    // }


    // {
    //   const color = 0xc8b42b;
    //   const intensity = 2;
    //   const light = new THREE.SpotLight(color, intensity);
    //   light.position.set(0.9, 1.2, 1.1);
    //   light.target.position.set(1.3, 0, 10);
    //   light.castShadow = true;

    //   light.shadow.mapSize.width = 1024;
    //   light.shadow.mapSize.height = 1024;

    //   light.shadow.camera.near = 500;
    //   light.shadow.camera.far = 4000;
    //   light.shadow.camera.fov = 30;

    //   light.angle = 0.2;
    //   light.distance = 18;
    //   scene.add(light);
    //   scene.add(light.target);

    //   const helper = new THREE.SpotLightHelper(light);
    //   // scene.add(helper);

    //   function updateLight() {
    //     light.target.updateMatrixWorld();
    //     helper.update();
    //   }
    //   updateLight();
    // }


    // FAROS
    // {
    //   const color = 0xFFFFFF;
    //   const intensity = 5;
    //   const width = 0.2;
    //   const height = 0.2;
    //   const light = new THREE.RectAreaLight(color, intensity, width, height);
    //   light.position.set(0.85, 1.1, 1.32);
    //   light.rotation.x = THREE.Math.degToRad(-180);
    //   scene.add(light);

    //   const helper = new THREE.RectAreaLightHelper(light);
    //   light.add(helper);

    //   function updateLight() {
    //     helper.update();
    //   }

      // const gui = new dat.GUI();
      // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
      // gui.add(light, 'intensity', 0, 10, 0.01);
      // gui.add(light, 'width', 0, 20).onChange(updateLight);
      // gui.add(light, 'height', 0, 20).onChange(updateLight);
      // gui.add(new DegRadHelper(light.rotation, 'x'), 'value', -180, 180).name('x rotation').onChange(updateLight);
      // gui.add(new DegRadHelper(light.rotation, 'y'), 'value', -180, 180).name('y rotation').onChange(updateLight);
      // gui.add(new DegRadHelper(light.rotation, 'z'), 'value', -180, 180).name('z rotation').onChange(updateLight);

      // makeXYZGUI(gui, light.position, 'position', updateLight);
    // }

    // {
    //   const color = 0xFFFFFF;
    //   const intensity = 5;
    //   const width = 0.2;
    //   const height = 0.2;
    //   const light = new THREE.RectAreaLight(color, intensity, width, height);
    //   light.position.set(-0.85, 1.1, 1.32);
    //   light.rotation.x = THREE.Math.degToRad(-180);
    //   scene.add(light);

    //   const helper = new THREE.RectAreaLightHelper(light);
    //   light.add(helper);

    //   function updateLight() {
    //     helper.update();
    //   }
    // }

    /* -------------------- FIN LUCES ------------------------------------- */
  }
