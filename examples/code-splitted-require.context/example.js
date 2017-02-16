function getTemplate(templateName, callback) {
	require.ensure([], function(require) {
		callback(require("../require.context/templates/"+templateName)());
	});
}
getTemplate("a", function(a) {
	log.log(a);
});
getTemplate("b", function(b) {
	log.log(b);
});