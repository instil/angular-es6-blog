import BaseController from '../base.controller';

export default class CompilerController extends BaseController {
  constructor ($scope, CompilerService, ExamplesService, DebounceService) {
    super();

    this.$scope = $scope;
    this.CompilerService = CompilerService;
    this.ExamplesService = ExamplesService;
    this.debounceCodeChange = DebounceService.debounce();

    this.executionInstructions = "Wrap in ES6 in a function to show result, e.g.\n(() => {\n\treturn 10;\n});"
    this.showExample('default');
  }

  showExample(selectedExample) {
    this.es6Code = this.ExamplesService.getExample(selectedExample);
    this.es6CodeChanged();
  }

  es6CodeChanged() {
    this.compilerLoading = true;
    this.debounceCodeChange(() => {
      let displayCompiledJavascript = compiledJavascript => {
        this.$scope.$apply(() => {
          this.compileErrorMessage = '';
          this.compiledJavascript = compiledJavascript;
          this.compilerLoading = false;
        });
        this.executeJavascript();
      };

      let displayCompileError = compileErrorMessage => {
        this.$scope.$apply(() => {
          this.compileErrorMessage = compileErrorMessage;
          this.compilerLoading = false;
        });
      };

    	this.CompilerService.compile(this.es6Code).then(displayCompiledJavascript, displayCompileError);
    }, 500);
  }

  executeJavascript() {
    this.executionLoading = true;
    let displayResult = executeResult => {
      this.$scope.$apply(() => {
        this.executeErrorMessage = '';
        if (executeResult !== 'use strict') {
          this.executeResult = executeResult;
        } else {
          this.executeResult = '';
        }
        this.executionLoading = false;
      });
    };

    let displayExecuteError = executeErrorMessage => {
      this.executeErrorMessage = executeErrorMessage;
        this.executionLoading = false;
    };

    this.CompilerService.eval(this.compiledJavascript).then(displayResult, displayExecuteError);
  }

  static getTemplateUrl() {
    return 'app/controllers/compiler/compiler.html';
  }
}
