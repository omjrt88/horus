import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['panel', 'panel-default', 'heightFixed'],
  listName: '',
  items: [],
  root: ''
});
