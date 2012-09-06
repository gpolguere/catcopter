function Catcopter(scene, animations, globalClock) {
	var me = this;

	var clock = globalClock;

	this.scene = scene;

	var animations = animations;
	var kfAnimations = [];

	var meshBody = this.scene.children[0];
	Utils.addShadow(meshBody);
	var meshPropFL = this.scene.children[1];
	console.log(meshPropFL instanceof THREE.Mesh);
	Utils.addShadow(meshPropFL);
	var meshPropRL = this.scene.children[2];
	Utils.addShadow(meshPropRL);
	var meshPropRR = this.scene.children[3];
	Utils.addShadow(meshPropRR);
	var meshPropFR = this.scene.children[4];
	Utils.addShadow(meshPropFR);
	var meshEyeL = this.scene.children[5];
	Utils.addShadow(meshEyeL);
	var meshEyeR = this.scene.children[6];
	Utils.addShadow(meshEyeR);

	var progress = 0;
	var lastTimestamp = Date.now();
	this.render = function(timestamp) {
		var frameTime = ( timestamp - lastTimestamp ) * 0.01; // seconds

		// meshPropFL.rotation.y = progress;

		progress += frameTime;
		lastTimestamp = timestamp;
	};

	this.getMeshPropFL = function() {
		return meshPropFL;
	};
}