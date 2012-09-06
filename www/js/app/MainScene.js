function MainScene() {
	var me = this;

	var container, stats;

	var camera, controls, scene, renderer;

	var dLight, aLight, sLight;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	var floor, dz = -10;

	var clock = new THREE.Clock();

	var catcopterCollada;
	var catcopter;
	var catcopter2;

	var timestamp;
	var lastTimestamp;

	var objectsToRender = [];

	var animHandler = THREE.AnimationHandler;
	var kfAnimations = [];
	var kfAnimationsLength;
	var animations;
	var progress = 0;

	this.init = function() {
		me.initScene();
		me.initCamera();
		me.initLights();
		me.initFloor();
		me.initRenderer();
		me.initContainer();
		me.initStats();
		me.addListeners();
	};

	this.initScene = function() {
		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0xffffff );
		// scene.fog = new THREE.Fog( 0xffffff, 1000, 3000 );
		// THREE.ColorUtils.adjustHSV( scene.fog.color, 0.02, -0.15, -0.65 );
	};

	this.initCamera = function() {
		camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.set( 0, 185, 2500 );
		scene.add( camera );

		controls = new THREE.OrbitControls( camera );
	};

	this.initLights = function() {
		aLight = new THREE.AmbientLight( 0x444444 );
		scene.add( aLight );

		sLight = new THREE.SpotLight( 0xffffff, 0.7, 0, Math.PI, 1 );
		sLight.position.set( 500, 700, 1000 );
		sLight.target.position.set(0, 0, 0);
		sLight.castShadow = true;
		sLight.shadowCameraNear = 700;
		sLight.shadowCameraFar = camera.far;
		sLight.shadowCameraFov = 50;
		sLight.shadowBias = 0.000001;
		sLight.shadowDarkness = 0.3;
		sLight.shadowMapWidth = 2048;
		sLight.shadowMapHeight = 1024;
		// sLight.shadowCameraVisible = true;
		scene.add( sLight );
	};

	this.initFloor = function() {
		var planeSimple = new THREE.PlaneGeometry( 600, 600, 40, 40 );
		var planeTesselated = new THREE.PlaneGeometry( 600, 600, 40, 40 );
		var matWire = new THREE.MeshBasicMaterial( { color :0x666666, wireframe: true, wireframeLinewidth: 2 } );
		var matSolid = new THREE.MeshBasicMaterial( { color :0xcca838 } );

		var material	= new THREE.MeshPhongMaterial({
			ambient		: 0xdede0b9,
			color		: 0xffffff,
			shininess	: 500, 
			specular	: 0x888888,
			shading		: THREE.SmoothShading
		});
		floor = new THREE.Mesh( planeSimple, material );
		floor.position.y = -10;
		floor.scale.set( 25, 25, 25 );
		floor.castShadow = false;
		floor.receiveShadow = true;
		scene.add( floor );

		floor = new THREE.Mesh( planeTesselated, matWire );
		floor.scale.set( 25, 25, 25 );
		floor.castShadow = false;
		floor.receiveShadow = true;
		scene.add( floor );
	};

	this.initRenderer = function() {
		renderer = new THREE.WebGLRenderer( { clearColor: 0xffffff, clearAlpha: 1, antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( scene.fog.color, 1 );
		renderer.sortObjects = false;
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
	};

	this.initContainer = function() {
		container = document.getElementById( 'container' );
		container.appendChild( renderer.domElement );
	};

	this.initStats = function() {
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild( stats.domElement );
	};

	this.addListeners = function() {
		window.addEventListener( 'resize', onWindowResize, false );
	};

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	this.setCatcopterCollada = function(collada) {
		catcopterCollada = collada;
	}

	this.getCatcopterScene = function() {
		return THREE.SceneUtils.cloneObject(catcopterCollada.scene);
	}

	this.start = function() {
		catcopter = new Catcopter(me.getCatcopterScene(), catcopterCollada.animations);
		scene.add( catcopter.scene );
		objectsToRender.push(catcopter);
		catcopter.scene.position.y = 200;


		catcopter2 = new Catcopter(me.getCatcopterScene(), catcopterCollada.animations);
		scene.add( catcopter2.scene );
		objectsToRender.push(catcopter2);
		catcopter2.scene.position.x = 500;
		catcopter2.scene.position.y = 200;

		render(lastTimestamp);
	}

	function render(timestamp) {
		if(isNaN(timestamp) || isNaN(lastTimestamp)) {
			if(!isNaN(timestamp)) {
				lastTimestamp = timestamp;
			}
			requestAnimationFrame( render, renderer.domElement );
			return;
		}

		var delta = clock.getDelta();

		controls.update( delta );

		for(var key in objectsToRender) {
			objectsToRender[key].render(timestamp);
		}

		var elapsed;
		if ( catcopter ) {

			elapsed = clock.getElapsedTime();

			catcopter.scene.position.y = 300 + Math.sin(elapsed) * 75;

			camera.lookAt(catcopter.scene.position);
		catcopter.getMeshPropFL().rotation.y -= 0.005;
		}

		if ( catcopter2 ) {

			elapsed = clock.getElapsedTime();

			catcopter2.scene.position.y = 300 + Math.sin(elapsed) * 75;
		}

		floor.position.z += dz;
		if( floor.position.z < -1100 ) floor.position.z = 0;

		lastTimestamp = timestamp;

		renderer.render( scene, camera );
		stats.update();
		requestAnimationFrame( render, renderer.domElement );
	}

}