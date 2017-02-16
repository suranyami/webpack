var cp = require('child_process');
var path = require("path");
var fs = require("fs");

var cmds = fs.readdirSync(__dirname).filter(function(dirname) {
	return fs.statSync(path.join(__dirname, dirname)).isDirectory() && dirname !== "node_modules";
}).sort().map(function(dirname) {
	return "cd " + dirname + " && node build.js";
});

var stack = function() {
	log.log("done");
};
for(var i = cmds.length-1; i >= 0; i--) {
	var cmd = cmds[i];
	stack = (function(next, cmd) {
		return function() {
			log.log(cmd);
			cp.exec(cmd, function(error, stdout, stderr) {
				if(error) log.error(error);
				else if(stderr) log.error(stderr), next();
				else next();
			});
		}
	}(stack, cmd));
}
stack();