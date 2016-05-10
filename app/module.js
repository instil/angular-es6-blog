import MainStyle from './main.css';

import Router from './router';

import AllowTabDirective from './directives/allow-tab/allow-tab.directive';

import CompilerService from './services/compiler/compiler.service';
import DebounceService from './services/debounce/debounce.service';
import ExamplesService from './services/examples/examples.service';

import CompilerController from './controllers/compiler/compiler.controller';

angular.module('angular-es6', ['ngRoute'])
	.config(Router)

	.directive('allowTab', () => new AllowTabDirective())

	.service('CompilerService', CompilerService)
	.service('DebounceService', DebounceService)
	.service('ExamplesService', ExamplesService)

	.controller('CompilerController', CompilerController);