export default class ExamplesService {
	constructor() {
		this.examples = {
			default:
			`
				(() => {
					// The code is wrapped in a function in order to return an execution result.
					return 10;
				})();
			`,
			let:
			`
				(() => {
					// In ES5 javascript vars are only function scoped, so we would have to rename the inner scoped variable.

					// We have an outer scoped value 'scopedValue'.
					let scopedValue = 10;
					let sum = 20;
					// Conditional logic to enter a if scope.
					let useScopedValue = true;

					if (useScopedValue) {
						// Create a new variable with the same name 'scopedValue'.
					    let scopedValue = 20;
					    sum += scopedValue;
					}

					// Will return {10, 40}.
					return {scopedValue, sum};
				})();
			`,
			arrowFunctions:
			`
				(() => {
					// Refer to compiled javascript to see how this looks in ES5.
					let square = (x) => x * x;
					let add = (x, y) => x + y;

					return square(add(10, 20));
				})();
			`,
			defaultParams:
			`
				(() => {
					// ES6 allows for default values to be set to parameters.
					function hello(name = 'World') {
						return 'Hello ' + name + '!';
					}

					// Should return {default: 'Hello World!', name: 'Hello Neil!'}.
					return {
						default: hello(),
						name: hello('Neil')
					};
				})();
			`,
			variadicParams:
			`
				(() => {
					// Allows for any number of paramters to be added to a function, and it is treated as a single array.
					function addNumbers(...numbers) {
						let sum = 0;
						numbers.forEach(number => sum += number);
						return sum;
					}

					return addNumbers(10, 15, 20, 50);
				})();
			`,
			simpleObjects:
			`
				(() => {
					let myValue = 10;
					let myOtherValue = 'Angular is Fun';

					// Object keys are automaticly infered from the variable names.
					return {myValue, myOtherValue};
				})();
			`,
			methodProperties:
			`
				(() => {
					// Objects can have functions defined in the same way as a class definition.
					let myFunctionObject = {
						sum(a, b) {
							return a + b;
						},
						multiply(a, b) {
							return a * b;
						},
						subtract(a, b) {
							return a - b;
						},
						divide(a, b) {
							return a / b;
						}
					}

					return myFunctionObject.sum(10, 20);
				})();
			`,
			destructuring:
			`
				(() => {
					let myObject = {
						a: 'a',
						b: 'b',
						c: () => 'c'
					}

					// ES6 allow for keys to be declared seperated in one line. Very useful for imports.
					let {a, b, c} = myObject;

					return a + ' ' + b + ' ' + c();
				})();
			`,
			imports:
			`
				// Can't showcase imports in the browser, but this is an example of how it could be used...
				import * as _ from './lib/lodash';

				_.each([1, 2, 3], (number) => console.log(number));
			`,
			classes:
			`
				(() => {
					class Shape {
						constructor (x, y) {
							this.x = x;
							this.y = y;
						}

						translate (x, y) {
							this.x += x;
							this.y += y;
						}
					}

					class Rectangle extends Shape {
						constructor(x, y, width, height) {
							super(x, y);
							this.width = width;
							this.height = height;
						}

						area() {
							return this.width * this.height;
						}
					}

					let rectangle = new Rectangle(10, 20, 20, 40);
					rectangle.translate(40, -60);

					return {
						x: rectangle.x,
						y: rectangle.y,
						area: rectangle.area()
					}
				})();
			`,
			staticFunctions:
			`
				(() => {
					class Pacman {
						constructor (lives = 10, startingLevel = 0, score = 0) {
							this.lives = lives;
							this.startingLevel = startingLevel;
							this.score = score;
						}

						static easyMode() {
							return new Pacman(20);
						}

						static normalMode() {
							return new Pacman(10);
						}

						static hardMode() {
							return new Pacman(5);
						}

						static cheatingMode() {
							return new Pacman(100000, 60);
						}
					}

					return Pacman.cheatingMode();
				})();
			`,
			iterables:
			`
				(() => {
					let iterable = ["Red", "Blue", "Green", "Alpha"].entries();

					let asString = "";
					// Infinite loop.
					for (;;) {
						let current = iterable.next();
						if (current.done) {
							break;
						}

						asString = asString + ' ' + current.value;
					}

					return asString;
				})();
			`,
			generatorFunctions:
			`
				(() => {
					function* infiniteNumbers() {
						let currentNumber = 0;
						for (;;) {
							yield currentNumber++;
						}
					}

					let generator = infiniteNumbers();

					// Add as many numbers as you want, the generator will never stop supplying (though it will overflow eventually).
					return [generator.next().value, generator.next().value, generator.next().value]
				})();
			`,
			sets:
			`
				(() => {
					// Some browsers already have this collection so the compiled code will be no different.
					let set = new Set();
					set.add("First value")
						.add("Second value")
						.add("First value");

					return {
						size: set.size,
						setHasFirstValue: set.has("First value"),
						values: set
					}
				})();
			`,
			propertyAssignment:
			`
				(() => {
					// Allows for easy merging of two complex objects.
					let myObject = {
						value: 10
					}

					let myOtherObject = {
						values: [
							{
								id: 1, 
								value: 20
							},
							{
								id: 2, 
								value: 50
							},
						]
					}

					let mySuperObject = Object.assign(myObject, myOtherObject);

					return mySuperObject;
				})();
			`,
			arraysFind:
			`
				(() => {
					return [1, 2, 3, 4, 5].find(value => value === 3);
				})();
			`,
			stringRepeating:
			`
				(() => {
					return 'Much Spam '.repeat(200);
				})();
			`,
			promises: 
			`
				(() => {
					// Try commenting out the 'success' callback and uncommenting the 'fail' callback.
					let promise = new Promise((success, fail) => {
						setTimeout(() => {
							success("It worked!");
							// fail("It failed!");
						}, 250);
					});

					return promise;
				})();
			`
		}
	}

	getExample(example) {
		return this.examples[example]
			.replace("\n", "")
			.replace(/\t\t\t\t/g, "");
	}
}