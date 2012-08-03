var App = {
	init: function() {

		var mainScene;

		init();

		function init() {
			mainScene = new MainScene();
			mainScene.init();

			var loader = new THREE.ColladaLoader();
			loader.convertUpAxis = true;
			loader.load(
				"obj/catcopter/chatcopter-noi-joint-1-4.dae",
				function(collada) {
					mainScene.setCatcopterCollada(collada);
					mainScene.start();
				}
			);
		}
	}
};