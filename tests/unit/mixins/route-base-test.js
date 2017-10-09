import Ember from 'ember';
import RouteBaseMixin from 'horus/mixins/route-base';
import { module, test } from 'qunit';

module('Unit | Mixin | route base');

// Replace this with your real tests.
test('it works', function(assert) {
  let RouteBaseObject = Ember.Object.extend(RouteBaseMixin);
  let subject = RouteBaseObject.create();
  assert.ok(subject);
});
