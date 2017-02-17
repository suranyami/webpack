/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals window __webpack_hash__ */

var log = require('picolog');

if(module.hot) {
	var lastHash;
	var upToDate = function upToDate() {
		return lastHash.indexOf(__webpack_hash__) >= 0;
	};
	var check = function check() {
		module.hot.check(true).then(function(updatedModules) {
			if(!updatedModules) {
				log.warn("[HMR] Cannot find update. Need to do a full reload!");
				log.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
				window.location.reload();
				return;
			}

			if(!upToDate()) {
				check();
			}

			require("./log-apply-result")(updatedModules, updatedModules);

			if(upToDate()) {
				log.log("[HMR] App is up to date.");
			}

		}).catch(function(err) {
			var status = module.hot.status();
			if(["abort", "fail"].indexOf(status) >= 0) {
				log.warn("[HMR] Cannot apply update. Need to do a full reload!");
				log.warn("[HMR] " + err.stack || err.message);
				window.location.reload();
			} else {
				log.warn("[HMR] Update failed: " + err.stack || err.message);
			}
		});
	};
	var hotEmitter = require("./emitter");
	hotEmitter.on("webpackHotUpdate", function(currentHash) {
		lastHash = currentHash;
		if(!upToDate() && module.hot.status() === "idle") {
			log.log("[HMR] Checking for updates on the server...");
			check();
		}
	});
	log.log("[HMR] Waiting for update signal from WDS...");
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}
