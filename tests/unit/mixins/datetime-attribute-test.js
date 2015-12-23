import Ember from 'ember';
import DatetimeAttributeMixin from '../../../mixins/datetime-attribute';
import { module, test } from 'qunit';

module('Unit | Mixin | datetime attribute');

// Replace this with your real tests.
test('it works', function(assert) {
  let DatetimeAttributeObject = Ember.Object.extend(DatetimeAttributeMixin);
  let subject = DatetimeAttributeObject.create();
  assert.ok(subject);
});
