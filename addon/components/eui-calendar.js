import Ember from 'ember';
import layout from '../templates/components/eui-calendar';
import Moment from 'moment';

const { computed } = Ember;


const EUICalendar = Ember.Component.extend({
  layout,

  interval: computed(function() {
    return 'month'
  }),

  date: computed(function() {
    return Moment();
  }),

  actions: {
    onZoom(interval) {
      if (interval === 'month') {
        this.set('interval', 'year')
      }

      if (interval === 'year') {
        this.set('interval', 'decade')
      }
    }
    // selectMoment(moment) {
    //   this.set('selection', Moment(moment));
    // },
    //
    // selectDays(moment) {
    //   // this.send('selectMoment', moment);
    //   this.set('intervalSelector', 'days');
    // },
    //
    // selectMonths(moment) {
    //   // this.send('selectMoment', moment);
    //   this.set('intervalSelector', 'months');
    // },
    //
    // selectYears() {
    //   this.set('intervalSelector', 'years');
    // },
    //
    // nullAction() {
    //   Em.K
    // }
  }
});

EUICalendar.reopenClass({
  positionalParams: ['date']
});

export default EUICalendar;
