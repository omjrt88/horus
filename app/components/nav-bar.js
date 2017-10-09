import Ember from 'ember';

const { inject, Component, computed } = Ember;

export default Component.extend({
  sessionManager: inject.service('session-manager'),
  isLogged: computed('sessionManager.isLogged', function() {
    return this.get('sessionManager.isLogged') || this.get('sessionManager').userInfo();
  }),
  userFullName: computed('isLogged', function() {
    return `${this.get('sessionManager').userInfo().userData.name} ${this.get('sessionManager').userInfo().userData.lastName}`;
  }),
  actions: {
    logout(){
      this.get('sessionManager').logout();
    }
  }

});
