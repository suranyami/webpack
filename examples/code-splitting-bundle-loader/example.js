require("bundle-loader!./file.js")(function(fileJsExports) {
	log.log(fileJsExports);
});
