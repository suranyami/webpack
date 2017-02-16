function getTemplate(templateName, callback) {
	require(["../require.context/templates/"+templateName], function(tmpl) {
		callback(tmpl());
	});
}
getTemplate("a", function(a) {
	log.log(a);
});
getTemplate("b", function(b) {
	log.log(b);
});