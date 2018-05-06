var mixer, action = {};

var scene = new THREE.Scene();
var clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var container = document.getElementById('container');
container.appendChild(renderer.domElement);

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

var effect = new THREE.PeppersGhostEffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );
effect.cameraDistance = 4;
effect.reflectFromAbove = true;

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(3.5, 3, 4);
camera.position.set(0, 1, 1);
camera.lookAt(0, 1, 0);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0.6, 0);

var light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(4,4,5)
scene.add(light);

var loader = new THREE.JSONLoader();

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();
}

function render() {
	var delta = clock.getDelta();
	if(mixer)
		mixer.update( delta );

	effect.render(scene, camera);
}


loader.load('../models/untitled.json', function(geometry, materials) {
	materials.forEach(function (material) {
		material.skinning = true;
		material.morphTargets = true;
	});
	var obj = new THREE.SkinnedMesh(geometry,
		materials
	);
	// obj.scale.set(5, 5, 5);

	scene.add(obj);

	mixer = new THREE.AnimationMixer(obj);

	action.swipe = mixer.clipAction(geometry.animations[2]);
	action.swipe.setLoop(THREE.LoopOnce, 0);
	action.swipe.clampWhenFinished = true;

	action.swipe_start = mixer.clipAction(geometry.animations[3]);
	action.swipe_start.setLoop(THREE.LoopOnce, 0);
	action.swipe_start.clampWhenFinished = true;

	action.idle = mixer.clipAction(geometry.animations[0]);

	action.idle.play();

	animate();
});

function fadeAction (from, to) {
  var from = action[ from ].play();
  var to = action[ to ].play();

  from.enabled = true;
  to.enabled = true;

  if (to.loop === THREE.LoopOnce) {
    to.reset();
  }

  from.crossFadeTo(to, 0.3);

}

function swipe() {
	console.log(action.swipe_start.time * 1500);
	fadeAction('idle', 'swipe_start');
	setTimeout(function() {
		fadeAction('swipe_start', 'swipe');
	}, action.swipe_start.time * 1500);
}



