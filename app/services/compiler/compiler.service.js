import * as Babel from '../../../node_modules/babel-standalone/babel.min';
import * as BabelPollyfil from '../../../node_modules/babel-polyfill/dist/polyfill.min'

export default class CompilerService {
	constructor(DebounceService) {
		this.debounceCompileFailure = DebounceService.debounce();
		this.debounceEvalFailure = DebounceService.debounce();

		this.babelPreset = {presets: ['es2015', 'stage-0']};
	}

	compile(es6Code) {
		return new Promise((success, fail) => {
			if (!es6Code || es6Code === '') {
				success('');
				return;
			}

			try {
				let compiledCode = Babel.transform(es6Code, this.babelPreset).code;
				success(compiledCode);
			} catch (exception) {
				this.debounceCompileFailure(() => fail(`Error at ${exception.loc.line}:${exception.loc.column}\n${exception.codeFrame}`), 500);
			}
		});
	}

	eval(javascriptCode) {
		return new Promise((success, fail) => {
			try {
				let result = eval(javascriptCode);
				success(result);
			} catch (exception) {
				this.debounceEvalFailure(() => fail(`Error occured during execution:\n ${exception}`), 500);
			}
		});
	}
}