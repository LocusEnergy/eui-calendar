import Ember from 'ember';
import { DayMixin } from 'eui-calendar/mixins/base-interval';
import { module, test } from 'qunit';

module('Unit | Mixin | datetime attribute');

test('it works', function(assert) {
  let DatetimeAttributeObject = Ember.Object.extend(DayMixin);
  let subject = DatetimeAttributeObject.create();
  assert.ok(subject);
});
