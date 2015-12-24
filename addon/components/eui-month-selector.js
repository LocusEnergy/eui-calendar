import Ember from 'ember';
import layout from '../templates/components/eui-month-selector';

export default Ember.Component.extend({
  layout,
  classNames: 'eui-month-selector',

  months: Ember.computed('year', function() {

  })
});
