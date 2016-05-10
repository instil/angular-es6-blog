export default class BaseController {
	constructor() {

	}

	static getTemplateUrl() {
		throw `No template url set for class ${this.name}, please add a getTemplateUrl() function in the ${this.name} class to return a valid template url.`;
	}

	static getControllerTemplateName() {
		return 'controller';
	}
}