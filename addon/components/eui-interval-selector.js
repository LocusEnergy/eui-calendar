import Ember from 'ember';
import layout from '../templates/components/eui-interval-selector';
import Moment from 'moment';

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

  _shiftInterval(direction) {
    let interval = this.get('interval');
    let selection = this.get('selection');
    let shift = intervalShifter[interval];
    let { shiftInterval, shiftValue } = shift;
    this.set('selection', selection.clone().add(direction*shiftValue, shiftInterval));
  },

  actions: {
    previous() {
      this._shiftInterval(-1);
    },

    next() {
      this._shiftInterval(1);
    }
  }

});
