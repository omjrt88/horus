import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['panel', 'panel-default', 'card'],
  listName: '',
  items: [],
  root: '',
  notImage: computed.empty('socialNetwork.image')
});
