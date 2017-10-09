import Ember from 'ember';

const { Controller, inject } = Ember;

export default Controller.extend({
	sessionManager: inject.service('session-manager'),
	loginFailed: false,
	username: '',
	password: '',
	actions: {
		login() {
			this.set('loginFailed', false);
			let username = this.get('username');
      let password = this.get('password');
			let sessionManager = this.get('sessionManager');
			let isLogged = sessionManager.login(username,password);
			if (!isLogged) {
				this.set('loginFailed', true);
				return;
			}
			this.set('loginFailed', false);
			this.transitionToRoute('index');
		}
	}
});
