function getTemplate(templateName) {
	return require("./templates/"+templateName);
}
log.log(getTemplate("a"));
log.log(getTemplate("b"));