import Ember from 'ember';
import SpinnerMixin from 'horus/mixins/spinner-mixin';

const { Controller, inject } = Ember;

export default Controller.extend(SpinnerMixin, {
	sessionManager: inject.service('session-manager'),
	loginFailed: false,
	username: '',
	password: '',
	actions: {
		login() {
			this.showSpinner();
			this.set('loginFailed', false);
			let username = this.get('username');
      let password = this.get('password');
			let sessionManager = this.get('sessionManager');
			let isLogged = sessionManager.login(username,password);
			if (!isLogged) {
				this.set('loginFailed', true);
				this.hideSpinner();
				return;
			}
			this.set('loginFailed', false);
			this.hideSpinner();
			this.transitionToRoute('index');
		}
	}
});
