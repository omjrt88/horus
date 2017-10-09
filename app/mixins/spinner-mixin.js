import Ember from 'ember';

const { Mixin, inject } = Ember;

export default Mixin.create({
  spinner: inject.service('spinner'),
  showSpinnerWithTimeout() {
    this.get('spinner').show('horusWaiting', {
      timeout: 3000
    });
  },
  showSpinner() {
    this.get('spinner').show('horusWaiting');
  },
  hideSpinner() {
    this.get('spinner').hide('horusWaiting');
  },
  actions: {
  }
});