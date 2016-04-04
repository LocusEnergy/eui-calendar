import Ember from 'ember';
import layout from '../templates/components/eui-interval-selector';
import Moment from 'moment';
import momentDecade from 'eui-calendar/utils/moment-decade';

const EUIIntervalSelector = Ember.Component.extend({
  layout,
  classNames: ['eui-interval-selector'],
  interval: 'month',
  moment: Ember.computed(function() {
    return new Moment();
  }),

  name: Ember.computed('moment', 'interval', function() {
    const moment = this.get('moment');
    const interval = this.get('interval');
    if (interval === 'year') {
      return new Moment(moment).format('YYYY');
    }

    if (interval === 'decade') {
      const [ , first, , , , , , , , , last ] = momentDecade(moment).map(m => m.year());
      return `${first} - ${last}`;
    }

    return new Moment(moment).format('MMMM YYYY');
  }),

  _shiftMoment(direction) {
    const amount = direction === 'previous' ? -1 : 1;
    const moment = this.get('moment');
    const interval = this.get('interval');
    if (interval === 'decade') {
      return new Moment(moment).clone().add(amount * 10, 'year');
    }
    return new Moment(moment).clone().add(amount, interval);
  },

  actions: {
    onZoom() {
      this.sendAction('on-zoom', this.get('interval'));
    },

    onPrevious() {
      this.sendAction('on-previous', this._shiftMoment('previous'));
    },

    onNext() {
      this.sendAction('on-next', this._shiftMoment('next'));
    }
  }
});

EUIIntervalSelector.reopenClass({
  positionalParams: ['moment', 'interval']
});

export default EUIIntervalSelector;
