import Ember from 'ember';

const { Controller, inject } = Ember;

export default Controller.extend({
  sessionManager: inject.service('session-manager'),
  routing: inject.service('-routing'),
	name: '',
	lastName: '',
	username: '',
	password: '',
  confirmPassword: '',
  showErrorMsg: false,
  errorMsg: '',
  isVisible: false,
  passwordVerification() {
    return this.get('password') === this.get('confirmPassword');
  },
  clearFields() {
    this.set('username', '');
    this.set('name', '');
    this.set('lastName', '');
    this.set('password', '');
    this.set('confirmPassword', '');
    this.set('showErrorMsg', false);
  },
	actions: {
		register() {
      this.set('showErrorMsg', false);

      if (!this.passwordVerification()) {
        this.set('showErrorMsg', true);
        this.set('errorMsg', 'Password doesn`t match.');
        return;
      }

			let username = this.get('username');
			let name = this.get('name');
			let lastName = this.get('lastName');
      let password = this.get('password');
      let sessionManager=this.get('sessionManager');

      if (!sessionManager.hasUserCreated(username)) {
        sessionManager.addUser(name, lastName, username, password);
        this.set('isVisible', true);
        this.clearFields();

        setTimeout(() => {
          this.get('routing').transitionTo('login');
        }, 3000);
      } else {
        this.set('showErrorMsg', true);
        this.set('errorMsg', 'User already exists.');
      }
    }
	}
});
