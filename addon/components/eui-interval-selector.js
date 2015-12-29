import Ember from 'ember';
import layout from '../templates/components/eui-interval-selector';

const formatDictionary = {
  day: 'MMMM',
  month: 'YYYY',
};

const { computed } = Ember;

export default Ember.Component.extend({
  layout,

  format: computed('interval', function() {
    return formatDictionary[this.get('interval')];
  }),

  moments: computed(function() {
    
  })

});
