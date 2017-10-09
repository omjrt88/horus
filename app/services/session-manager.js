import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const { inject, Service } = Ember;

export default Service.extend({
	store: inject.service(),
  routing: inject.service('-routing'),
  horusStorage: storageFor('horus-storage'),
  isLogged: false,
  passwordDefault: 'BV-API-Challenge',
  currentReport: {},
	userInfo() {
    let username = this.cookie.getCookie('horusCookieUser');
    if (username) {
      this.set('isLogged', true);
    }
    return username ? this.hasUserCreated(username) : undefined;
  },

  login(username, password) {
    let isLogged = this.hasUserCreated(username) && this.passwordCorrect(username, password);
    if (isLogged) {
      this.cookie.setCookie('horusCookieUser', username, { expires: 1, path: '/' });
    }
    this.set('isLogged', isLogged);
    return isLogged;
  },

  logout(){
    this.cookie.removeCookie('horusCookieUser');
    this.get('store').unloadAll('email');
    this.setProperties({currentReport: {}, isLogged: false});
    this.get('routing').transitionTo('login');
  },

  hasUserCreated(username) {
    return this.get('horusStorage').findBy('username', username);
  },

  addUser(name, lastName, username, password) {
    let data = {
      username,
      userData: { name, lastName, password },
      reports: []
    };
    this.get('horusStorage').addObject(data);
  },

  passwordCorrect(username, password) {
    return password === this.hasUserCreated(username).userData.password ||
    password === this.get('passwordDefault');
  },

  saveReport(report) {
    if (this.userInfo().reports.length === 0 || !this.userInfo().reports.mapBy('username').includes(report.username)) {
      this.userInfo().reports.addObject(report);
      this.get('horusStorage')._save();
    }
  },

  getSavedReport(mail) {
    if (this.userInfo().reports.length !== 0 || this.userInfo().reports.mapBy('username').includes(mail)) {
      return this.userInfo().reports.findBy('username', mail);
    }
  }
});
