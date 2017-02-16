async function getTemplate(templateName) {
	try {
		let template = await import(`./templates/${templateName}`);
		log.log(template);
	} catch(err) {
		log.error("template error");
		return new Error(err);
	}
}

getTemplate("foo");
getTemplate("bar");
getTemplate("baz");


