/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(module.hot) {
	var checkForUpdate = function checkForUpdate(fromUpdate) {
		module.hot.check().then(function(updatedModules) {
			if(!updatedModules) {
				if(fromUpdate)
					log.log("[HMR] Update applied.");
				else
					log.warn("[HMR] Cannot find update.");
				return;
			}

			return module.hot.apply({
				ignoreUnaccepted: true,
				onUnaccepted: function(data) {
					log.warn("Ignored an update to unaccepted module " + data.chain.join(" -> "));
				},
			}).then(function(renewedModules) {
				require("./log-apply-result")(updatedModules, renewedModules);

				checkForUpdate(true);
			});
		}).catch(function(err) {
			var status = module.hot.status();
			if(["abort", "fail"].indexOf(status) >= 0) {
				log.warn("[HMR] Cannot apply update.");
				log.warn("[HMR] " + err.stack || err.message);
				log.warn("[HMR] You need to restart the application!");
			} else {
				log.warn("[HMR] Update failed: " + err.stack || err.message);
			}
		});
	};

	process.on(__resourceQuery.substr(1) || "SIGUSR2", function() {
		if(module.hot.status() !== "idle") {
			log.warn("[HMR] Got signal but currently in " + module.hot.status() + " state.");
			log.warn("[HMR] Need to be in idle state to start hot update.");
			return;
		}

		checkForUpdate();
	});
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}
