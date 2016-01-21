import Ember from 'ember';
import layout from '../templates/components/eui-interval-selector';
import Moment from 'moment';
import _range from 'lodash/utility/range';

const { computed } = Ember;

const intervalShifter = {
  day: {
    shiftInterval: 'month',
    shiftValue: 1
  },
  month: {
    shiftInterval: 'year',
    shiftValue: 1
  },
  year: {
    shiftInterval: 'year',
    shiftValue: 10
  }
}

export default Ember.Component.extend({
  layout,
  classNames: ['eui-interval-selector'],

  momentRange: computed('interval', function() {
    let interval = this.get('interval');
    return this.get(`${interval}Range`);
  }),

  // monthRange: computed('selection', function() {
  //   let year = Moment(this.get('selection')).get('year');
  //   // ensures that we start with the correct month in the correct year
  //   let january = moment().year(year).month(0).startOf('month');
  //   return _range(12).map(m => january.clone().add(m, 'months'));
  // }),
  //
  // yearRange: computed('selection', function() {
  //   let year = Moment(this.get('selection'));
  //   return _range(-6, 6).map(y => year.clone().add(y, 'years'));
  // }),

  _shiftInterval(direction) {
    let interval = this.get('interval');
    let selection = this.get('selection');
    let shift = intervalShifter[interval];
    let { shiftInterval, shiftValue } = shift;
    this.set('selection', selection.clone().add(direction*shiftValue, shiftInterval));
  },

  actions: {
    zoomOut() {
      let zoomOut = this.get('on-zoom-out');
      if (isPresent(zoomOut)) {
        zoomOut();
      }
    },

    previous() {
      this._shiftInterval(-1);
    },

    next() {
      this._shiftInterval(1);
    }
  }

});

// before, we had tests for eui-day, eui-month, eui-year
// refactored one component called eui-interval
// rewrote tests so that this worked

// we still have tests for eui-day-selector, eui-month-selector, eui-year-selector
// started eui-interval-selector
//
