export default class DebounceService {
	constructor() {

	}

	debounce() {
		let timeout;
		return (func, timeToWait) => {			
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, arguments), timeToWait);
		};
	};
}