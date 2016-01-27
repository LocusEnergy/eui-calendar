import Ember from 'ember';
import layout from '../templates/components/eui-year-selector';
import momentDecade from 'eui-calendar/utils/moment-decade';

export default Ember.Component.extend({
  layout,

  years: Ember.computed('decade', function() {
    return momentDecade(this.get('decade'), 'YYYY');
  })
});
