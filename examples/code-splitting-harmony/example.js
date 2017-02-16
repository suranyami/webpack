import a from "a";

import("b").then(function(b) {
	log.log("b loaded", b);
})

function loadC(name) {
	return import("c/" + name);
}

Promise.all([loadC("1"), loadC("2")]).then(function(arr) {
	log.log("c/1 and c/2 loaded", arr);
});
