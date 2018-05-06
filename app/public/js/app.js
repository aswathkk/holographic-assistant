class App {
  constructor(pepper = false) {
    this.pepper = pepper;
    this.scene = new THREE.Scene();

    this.initRenderer();
    this.addLight();

    let container = document.getElementById('container');
    container.appendChild(this.renderer.domElement);

    if(pepper)
      this.initPepper();

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(3.3, 2.8, 7.2);
    // this.camera.lookAt(0, 50, 0);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new THREE.Vector3(0, 0.6, 0);
  }

  initPepper() {
    let effect = new THREE.PeppersGhostEffect( this.renderer );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.cameraDistance = 10;
    effect.reflectFromAbove = true;
    this.renderer = effect;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  addAxis() {
    this.axesHelper = new THREE.AxesHelper( 5 );
    this.scene.add(this.axesHelper);
  }

  showAxis() {
    this.axesHelper.visible = true;
  }

  hideAxis() {
    this.axesHelper.visible = false;
  }

  addLight() {
    let light = new THREE.HemisphereLight(0xffffff, 2);
    light.position.set(0, 7, 0)
    this.scene.add(light);
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}