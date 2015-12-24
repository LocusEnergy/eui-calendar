import Ember from 'ember';
import layout from '../templates/components/eui-day';
import { DayMixin } from '../mixins/base-interval';

export default Ember.Component.extend(DayMixin, {
  layout: layout,
});
