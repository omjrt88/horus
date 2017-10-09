import Ember from 'ember';
import SpinnerMixinMixin from 'horus/mixins/spinner-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | spinner mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let SpinnerMixinObject = Ember.Object.extend(SpinnerMixinMixin);
  let subject = SpinnerMixinObject.create();
  assert.ok(subject);
});
