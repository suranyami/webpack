/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var log = require('picolog');
log.level = log.NONE;

module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});

	if(unacceptedModules.length > 0) {
		log.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log.warn("[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log.log("[HMR] Nothing hot updated.");
	} else {
		log.log("[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			log.log("[HMR]  - " + moduleId);
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log.log("[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};
