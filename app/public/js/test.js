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

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3.3, 2.8, 7.2);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0.6, 0);

var light = new THREE.PointLight(0xffffff, 1);
light.position.set(4,4,5)
scene.add(light);

var loader = new THREE.JSONLoader();

var dynamicTexture	= new THREEx.DynamicTexture(512, 512);
dynamicTexture.texture.needsUpdate = true;
dynamicTexture.drawText('Hello WORLDDDDDDD', 32, 256, 'red');
var cubeGeometry = new THREE.BoxGeometry(1, 1, 0.05);
var cubeMaterial = new THREE.MeshBasicMaterial({
	map: dynamicTexture.texture
});
var cube = new THREE.SkinnedMesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0.75, 0.5);
cube.material.transparent = true;
// cube.material.opacity = 0.5;
scene.add(cube);

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	animateModel();
	render();
}

function render() {
	var delta = clock.getDelta();
	if(mixer)
		mixer.update( delta );

	renderer.render(scene, camera);
}


loader.load('../models/final_model.json', function(geometry, materials) {
	materials.forEach(function (material) {
	    material.skinning = true;
	    material.morphTargets = true;
	});
	obj = new THREE.SkinnedMesh(geometry,
		materials
	);

	scene.add(obj);

	mixer = new THREE.AnimationMixer(obj);

	action.walk = mixer.clipAction(geometry.animations[2]);
	// action.walk.setLoop(THREE.LoopOnce, 0);
	// action.walk.clampWhenFinished = true;

	// action.swipe_start = mixer.clipAction(geometry.animations[1]);
	// action.swipe_start.setLoop(THREE.LoopOnce, 0);
	// action.swipe_start.clampWhenFinished = true;

	action.idle = mixer.clipAction(geometry.animations[0]);


	action.idle.play();

	// obj.visible = false;

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

var entering = false,
	leaving = false;
function animateModel() {
	if(entering) {
		obj.position.z += 0.035;
		if(obj.position.z >= 0) {
			entering = false;
			fadeAction('walk', 'idle');
		}
	}
	if(leaving) {
		obj.position.z -= 0.039;
		if(obj.position.z <= -5) {
			leaving = false;
			obj.rotation.set(0,0,0);
			obj.visible = false;
			// fadeAction('walk', 'idle');
		}
	}
}

function enter() {
	obj.position.z = -5;
	obj.visible = true;
	entering = true;
	fadeAction('idle', 'walk');
}

function leave() {
	obj.position.z = 0;
	obj.visible = true;
	obj.rotation.set(0,Math.PI,0);
	leaving = true;
	fadeAction('idle', 'walk');
	// obj.position.set(0,0,3.67989 * 2);
}



