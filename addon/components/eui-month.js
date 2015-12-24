import Ember from 'ember';
import layout from '../templates/components/eui-month';
import { MonthMixin } from '../mixins/base-interval';

export default Ember.Component.extend(MonthMixin, {
  layout: layout,
});
