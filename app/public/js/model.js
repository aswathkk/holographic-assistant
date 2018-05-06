class Model {
  constructor(scene) {
    this.scene = scene;
    this.loader = new THREE.JSONLoader();
    this.clock = new THREE.Clock();
    this.load();
    this.action = {};
    this.state = {
      entering: false,
      leaving: false
    }
  }

  load() {
    this.loader.load('../models/final_model2.json', (geometry, materials) => {
      materials.forEach(function (material) {
          material.skinning = true;
          material.morphTargets = true;
          material.emissive = {r: 1, g:1, b:1};
          material.emissiveIntensity = 0.5;
      });

      this.obj = new THREE.SkinnedMesh(geometry,
        materials
      );

      this.scene.add(this.obj);
      
      this.mixer = new THREE.AnimationMixer(this.obj);

      this.action.walk = this.mixer.clipAction(geometry.animations[3]);
      this.action.swipe = this.mixer.clipAction(geometry.animations[2]);
      this.action.idle = this.mixer.clipAction(geometry.animations[0]);

      this.action.swipe.setLoop(THREE.LoopOnce, 0);
      this.action.swipe.clampWhenFinished = true;

      this.action.idle.play();

      this.obj.visible = false;
    });
  }

  enter() {
    this.obj.position.z = -5;
    this.obj.visible = true;
    this.state.entering = true;
    this.fadeAction('idle', 'walk');
  }

  leave() {
    this.obj.position.z = 0;
    this.obj.visible = true;
    this.obj.rotation.set(0,Math.PI,0);
    this.state.leaving = true;
    this.fadeAction('idle', 'walk');
    // obj.position.set(0,0,3.67989 * 2);
  }

  swipe() {
    this.fadeAction('idle', 'swipe');
  }

  animate() {
    if(this.state.entering) {
      this.obj.position.z += 0.035;
      if(this.obj.position.z >= 0) {
        this.state.entering = false;
        this.fadeAction('walk', 'idle');
      }
    }
    if(this.state.leaving) {
      this.obj.position.z -= 0.039;
      if(this.obj.position.z <= -5) {
        this.state.leaving = false;
        this.obj.rotation.set(0,0,0);
        this.obj.visible = false;
        this.fadeAction('walk', 'idle');
      }
    }

    if(this.mixer)
      this.mixer.update(this.clock.getDelta());
  }

  fadeAction (from, to) {
    var from = this.action[ from ].play();
    var to = this.action[ to ].play();

    from.enabled = true;
    to.enabled = true;

    if (to.loop === THREE.LoopOnce) {
      to.reset();
    }

    from.crossFadeTo(to, 0.3);
  }
}