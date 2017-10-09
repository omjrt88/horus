import Ember from 'ember';

const { Mixin, inject } = Ember;

export default Mixin.create({
  sessionManager: inject.service('session-manager'),
  beforeModel() {
    let sessionManager = this.get('sessionManager');
    if (!sessionManager.userInfo()) {
      return this.transitionTo('login');
    }
  }
});