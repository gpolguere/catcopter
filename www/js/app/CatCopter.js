function Catcopter(g) {
	var me = this;

	var geometry = g;

	/*
	var meshBody = this.scene.children[0];
	Utils.addShadow(meshBody);
	var meshPropFL = this.scene.children[1];
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

	this.getMeshPropFL = function() {
		return meshPropFL;
	};
	*/

	var material = new THREE.MeshFaceMaterial();
	this.mesh = new THREE.SkinnedMesh(geometry, material);

	var progress = 0;
	var lastTimestamp = Date.now();
	this.render = function(timestamp) {
		var frameTime = ( timestamp - lastTimestamp ) * 0.01; // seconds

		// meshPropFL.rotation.y = progress;

		progress += frameTime;
		lastTimestamp = timestamp;
	};
}