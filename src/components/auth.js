class Auth {
	constructor() {
		this.authendicated = false;
	}

	login(cb) {
		//axios ajax call gets here
		this.authendicated = true;
		cb();
	}

	logout(cb) {
		this.authendicated = false;
		cb();
	}

	isAuthenticated() {
		return this.authendicated;
	}
}

export default new Auth();
