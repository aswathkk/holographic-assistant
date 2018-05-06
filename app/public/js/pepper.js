THREE.PeppersGhostEffect = function ( renderer ) {

	var scope = this;

	scope.cameraDistance = 15;
	scope.reflectFromAbove = false;

	// Internals
	var _halfWidth, _width, _height;

	var _cameraF = new THREE.PerspectiveCamera(); //front
	var _cameraB = new THREE.PerspectiveCamera(); //back
	var _cameraL = new THREE.PerspectiveCamera(); //left
	var _cameraR = new THREE.PerspectiveCamera(); //right

	var _position = new THREE.Vector3();
	var _quaternion = new THREE.Quaternion();
	var _scale = new THREE.Vector3();

	// Initialization
	renderer.autoClear = false;

	this.setSize = function ( width, height ) {

		_halfWidth = width / 2;
		if ( width < height ) {

			_width = width / 3;
			_height = width / 3;

		} else {

			_width = height / 3;
			_height = height / 3;

		}
		renderer.setSize( width, height );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		camera.matrixWorld.decompose( _position, _quaternion, _scale );

		// front
		// _cameraF.position.copy( _position );
		// _cameraF.quaternion.copy( _quaternion );
		// _cameraF.translateZ( scope.cameraDistance );
		// _cameraF.lookAt( scene.position );
		// _cameraF.rotation.z += 180 * ( Math.PI / 180 ); // EDITED

		_cameraF.position.copy( _position );
		_cameraF.quaternion.copy( _quaternion );
		// _cameraF.translateY( 2.5 );
		// _cameraF.translateZ( 5 );
		// _cameraF.lookAt( 0, 2.5, 0 );
		_cameraF.position.set(0, 2, 7);
		_cameraF.lookAt(0, 2, 0);
		_cameraF.rotation.z += 180 * ( Math.PI / 180 ); // EDITED

		// back
		// _cameraB.position.copy( _position );
		// _cameraB.quaternion.copy( _quaternion );
		// _cameraB.translateZ( - ( scope.cameraDistance ) );
		// _cameraB.lookAt( scene.position );
		// // _cameraB.rotation.z += 180 * ( Math.PI / 180 ); // EDITED

		_cameraB.position.copy( _position );
		_cameraB.quaternion.copy( _quaternion );
		_cameraB.translateY( 1.8 );
		_cameraB.translateZ( - ( 6.3 ) );
		_cameraB.lookAt(0, 1.8, 0);

		// left
		// _cameraL.position.copy( _position );
		// _cameraL.quaternion.copy( _quaternion );
		// _cameraL.translateX( - ( scope.cameraDistance ) );
		// _cameraL.lookAt( scene.position );
		// _cameraL.rotation.x += 90 * ( Math.PI / 180 );

		_cameraL.position.copy( _position );
		_cameraL.quaternion.copy( _quaternion );
		_cameraL.position.set(-7, 2, 0);
		_cameraL.lookAt(0, 2, 0);
		_cameraL.rotation.x += 90 * ( Math.PI / 180 );

		// right
		// _cameraR.position.copy( _position );
		// _cameraR.quaternion.copy( _quaternion );
		// _cameraR.translateX( scope.cameraDistance );
		// _cameraR.lookAt( scene.position );
		// _cameraR.rotation.x += 90 * ( Math.PI / 180 );

		_cameraR.position.copy( _position );
		_cameraR.quaternion.copy( _quaternion );
		_cameraR.position.set(7, 2, 0);
		_cameraR.lookAt( 0, 2, 0);
		_cameraR.rotation.x += 90 * ( Math.PI / 180 );


		renderer.clear();
		renderer.setScissorTest( true );

		renderer.setScissor( _halfWidth - ( _width / 2 ), ( _height * 2 ), _width, _height );
		renderer.setViewport( _halfWidth - ( _width / 2 ), ( _height * 2 ), _width, _height );

		if ( scope.reflectFromAbove ) {

			renderer.render( scene, _cameraB );

		} else {

			renderer.render( scene, _cameraF );

		}

		renderer.setScissor( _halfWidth - ( _width / 2 ), 0, _width, _height );
		renderer.setViewport( _halfWidth - ( _width / 2 ), 0, _width, _height );

		if ( scope.reflectFromAbove ) {

			renderer.render( scene, _cameraF );

		} else {

			renderer.render( scene, _cameraB );

		}

		renderer.setScissor( _halfWidth - ( _width / 2 ) - _width - 20, _height + 20, _width - 20, _height + 20 );
		renderer.setViewport( _halfWidth - ( _width / 2 ) - _width - 20, _height + 20, _width - 20, _height + 20 );

		if ( scope.reflectFromAbove ) {

			renderer.render( scene, _cameraR );

		} else {

			renderer.render( scene, _cameraL );

		}

		renderer.setScissor( _halfWidth + ( _width / 2 ) + 20, _height + 20, _width + 20, _height + 20 );
		renderer.setViewport( _halfWidth + ( _width / 2 ) + 20, _height + 20, _width + 20, _height + 20 );

		if ( scope.reflectFromAbove ) {

			renderer.render( scene, _cameraL );

		} else {

			renderer.render( scene, _cameraR );

		}

		renderer.setScissorTest( false );

	};


};