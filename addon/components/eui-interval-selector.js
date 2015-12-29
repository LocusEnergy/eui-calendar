import Ember from 'ember';
import layout from '../templates/components/eui-interval-selector';
import Moment from 'moment';

const { computed } = Ember;

const formatDictionary = {
  day: 'MMMM',
  month: 'YYYY',
};

export default Ember.Component.extend({
  layout,
  classNames: ['eui-interval-selector'],

  format: computed('interval', function() {
    return formatDictionary[this.get('interval')];
  })

});
