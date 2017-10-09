import Ember from 'ember';

const { Controller, inject, computed } = Ember;

export default Controller.extend({
  store: inject.service(),
  sessionManager: inject.service('session-manager'),
  searchTerm: '',
  errorMsg: '',
  showErrorMsg: false,
  currentReport: computed.oneWay('sessionManager.currentReport'),
  currentReportEmpty: computed('currentReport', function() {
    return !this.get('currentReport.__ember_meta__.parent');
  }),

  phoneListEmpty: computed.empty('currentReport.phones'),
  phoneList: computed.map('currentReport.phones', function(phone) {
    return `${phone.number}(${phone.type})`;
  }),

  userNamesListEmpty: computed.empty('currentReport.usernames'),

  emailListEmpty: computed.empty('currentReport.emails'),
  emailList: computed.mapBy('currentReport.emails', 'email_address'),

  nameListEmpty: computed.empty('currentReport.names'),
  nameInfoColumns: [{name: 'first_name', path: 'parts.'}, {name: 'middle_name', path: 'parts.'}, {name: 'last_name', path: 'parts.'}],

  educationListEmpty: computed.empty('currentReport.educations'),
  educationTodosSorting: ['attended.start'],
  educationInfoColumns: [{name: 'school', path: ''}, {name: 'degree', path: ''}, {name: 'start', path: 'attended.'}, {name: 'end', path: 'attended.'}],
  educationDataColumns: computed.sort('currentReport.educations', 'educationTodosSorting'),

  jobListEmpty: computed.empty('currentReport.jobs'),
  jobTodosSorting: ['period.start'],
  jobInfoColumns: [{name: 'company', path: ''}, {name: 'title', path: ''}, {name: 'start', path: 'period.'}, {name: 'end', path: 'period.'}],
  jobDataColumns: computed.sort('currentReport.jobs', 'jobTodosSorting'),

  socialListEmpty: computed.empty('currentReport.social'),
  socialData: computed('currentReport.social', 'currentReport.images', function() {
    let socialNetworks = this.get('currentReport.social');
    return socialNetworks.map((socialNetwork) => {
      let socialName = socialNetwork.type || socialNetwork.domain;
      let principaImage = '';
      this.get('currentReport.images').forEach((image) => {
        if (image.source.toLowerCase().indexOf(socialName.toLowerCase()) >= 0) {
          principaImage = image.url;
        } else if (image.url.toLowerCase().indexOf(socialName.toLowerCase()) >= 0) {
          principaImage = image.url;
        }
      });
      socialNetwork.image = principaImage;
      return socialNetwork;
    });
  }),
  searchIsValid() {
    return this.get('searchTerm') !== '';
  },
  actions: {
    search() {
      if (!this.searchIsValid()) {
        return;
      }
      let sessionManager = this.get('sessionManager');
      let searchTerm = this.get('searchTerm');
      // temporal
      // if (sessionManager.getSavedReport(searchTerm)) {
      //   return sessionManager.getSavedReport(searchTerm);
      // }
      return this.get('store').query('email', { email: searchTerm }).then((users) => {
        let userFinded = users.get('firstObject');
        sessionManager.saveReport(userFinded);
        this.set('sessionManager.currentReport', userFinded);
        this.set('searchTerm', '');
      });
    }
  }
});
