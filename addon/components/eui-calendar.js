import Ember from 'ember';
import layout from '../templates/components/eui-calendar';
import Moment from 'moment';

export default Ember.Component.extend({
  layout,
  intervalSelector: 'days',
  moment: Moment(),

  actions: {
    selectDays() {
      this.set('intervalSelector', 'days');
    },

    selectMonths() {
      this.set('intervalSelector', 'months');
    },

    selectYears() {
      this.set('intervalSelector', 'years');
    }
  }
});


// state that the navigator component needs to track:
// displayed interval

// depending on that, can render the appropriate interval display
// parent?
