if(ENV === "mobile") {
	require("./mobile-stuff");
}
log.log("Running " + ENV + " build");