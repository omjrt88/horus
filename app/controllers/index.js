import Ember from 'ember';
import SpinnerMixin from 'horus/mixins/spinner-mixin';

const { Controller, inject, computed } = Ember;

export default Controller.extend(SpinnerMixin, {
  store: inject.service(),
  sessionManager: inject.service('session-manager'),
  searchTerm: '',
  errorMsg: '',
  showErrorMsg: false,
  dropdownOpen: false,
  lastReports: computed('currentReport', 'searchTerm', 'sessionManager', function() {
    let userInfoReports = this.get('sessionManager').userInfo().reports.sortBy('principalEmail');
    return userInfoReports.mapBy('principalEmail');
  }),
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
  nameList: computed.mapBy('currentReport.names', 'full'),
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
  init() {
    this._super(...arguments);
    this.set('sessionManager.currentReport', {});
    this.setProperties({searchTerm: '', dropdownOpen: false});
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$().off('hide.bs.dropdown');
    this.$().off('show.bs.dropdown');
    this.setProperties({searchTerm: '', dropdownOpen: false});
    this.set('sessionManager.currentReport', {});
  },
  actions: {
    search() {
      this.showSpinner();
      if (!this.searchIsValid()) {
        this.hideSpinner();
        return;
      }
      let sessionManager = this.get('sessionManager');
      let searchTerm = this.get('searchTerm');
      return this.get('store').query('email', { email: searchTerm }).then((users) => {
        let userFinded = users.get('firstObject');
        sessionManager.saveReport(userFinded);
        this.set('sessionManager.currentReport', userFinded);
        this.set('searchTerm', '');
        this.hideSpinner();
      });
    },
    toggleDropdown() {
      this.toggleProperty('dropdownOpen');
    },
    savedReportSelected(report) {
      this.setProperties({searchTerm: report, dropdownOpen: false});
      this.send('search');
    }
  }
});
