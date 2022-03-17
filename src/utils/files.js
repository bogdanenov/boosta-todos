const readFiles = (files) => {
	return new Promise((resolve, reject) => {
		if (files.length) {
			const reader = new FileReader();
			reader.addEventListener("load", (event) => {
				const config = JSON.parse(event.target.result);
				if (
					config.hasOwnProperty("name") &&
					config.hasOwnProperty("taskList")
				) {
					resolve(config);
				}
				reject("Config is not correct!");
			});
			reader.readAsText(files[0]);
		}
	});
};

module.exports = { readFiles };
