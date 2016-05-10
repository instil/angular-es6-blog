export default class AllowTabDirective {
  constructor () {
    'ngInject';

    let linkFunction = (scope, element) => {
      element.bind('keydown keyup', (event) => {
        let element = event.target;
        if (!event.shiftKey && event.keyCode === 9 && event.type === 'keydown') {
          let previousSelectionStart = element.selectionStart;
          
          element.value = `${element.value.substring(0, element.selectionStart)}\t${element.value.substring(element.selectionEnd)}`;
          element.selectionStart = element.selectionEnd = previousSelectionStart + 1;

          scope.$digest();
          event.preventDefault();
          return false;
        } else if (event.shiftKey && event.keyCode === 9 && event.type === 'keydown') {
          if (element.selectionStart === 0) {
            return;
          }

          let previousSelectionStart = element.selectionStart;
          
          if (element.value[element.selectionStart - 1] === "\t") {
            element.value = `${element.value.substring(0, element.selectionStart - 1)}${element.value.substring(element.selectionEnd)}`;
            element.selectionStart = element.selectionEnd = previousSelectionStart - 1;
          } else if (element.value[element.selectionStart - 4] === " " && element.value[element.selectionStart - 3] === " " && element.value[element.selectionStart - 2] === " " && element.value[element.selectionStart - 1] === " ") {
            element.value = `${element.value.substring(0, element.selectionStart - 4)}${element.value.substring(element.selectionEnd)}`;
            element.selectionStart = element.selectionEnd = previousSelectionStart - 4;
          }

          scope.$digest();
          event.preventDefault();
          return false;
        }
      })
    };

    let directive = {
      restrict: 'A',
      link: linkFunction
    };

    return directive;
  }
}