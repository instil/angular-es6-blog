import CompilerController from './controllers/compiler/compiler.controller';

export default function routerConfig ($provide, $routeProvider) {
  $provide.factory('$routeProvider', function () {
      return $routeProvider;
  });

  $routeProvider
    .when('/', {
      name: 'compiler',
      templateUrl: CompilerController.getTemplateUrl(),
      controllerAs: CompilerController.getControllerTemplateName(),
      controller: CompilerController,
    })
    .otherwise({
      redirectTo: '/'
    });
}
