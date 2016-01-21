import Ember from 'ember';
import layout from '../templates/components/eui-calendar';
import Moment from 'moment';
import _range from 'lodash/utility/range';

const { computed } = Ember;


export default Ember.Component.extend({
  layout,
  intervalSelector: 'days',
  selection: Moment(),

  actions: {
    selectMoment(moment) {
      this.set('selection', Moment(moment));
    },

    selectDays(moment) {
      // this.send('selectMoment', moment);
      this.set('intervalSelector', 'days');
    },

    selectMonths(moment) {
      // this.send('selectMoment', moment);
      this.set('intervalSelector', 'months');
    },

    selectYears() {
      this.set('intervalSelector', 'years');
    },

    nullAction() {
      Em.K
    }
  }
});
