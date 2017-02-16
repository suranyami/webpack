require(["./a"], function(a) {
	log.log(a + require("./b"));
});