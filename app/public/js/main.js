// const app = new App(false);
const app = new App(true);
// app.addAxis();

const model = new Model(app.scene);

// app.camera.position.set(9.05647, 0.06074, 1.25986);
// app.camera.position.set(-0.12429, 1.25986, 9.28576);
app.camera.position.set(0, 1, 2); // DON'T CHANGE THIS !!!
// app.scene.position.y = -3;
app.camera.lookAt(0, 1, 0);

// setTimeout(() => model.enter(), 1000);

(function render() {
  requestAnimationFrame(render);
  model.animate();
  app.render();
})();

const sock = new Sock('ws://localhost:8181/core');
