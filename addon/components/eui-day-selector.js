import Ember from 'ember';
import layout from '../templates/components/eui-day-selector';
import moment from 'moment';
import _range from 'lodash/utility/range';

const { computed } = Ember;
const DAY_COUNT = 42;

export default Ember.Component.extend({
  layout,
  classNames: 'eui-day-selector',
  month: null,

  init() {
    this._super(...arguments);
    Ember.assert('You must provide a month to eui-month', this.get('month'));
  },

  days: computed('month', function() {
    let monthStart = moment(this.get('month')).startOf('month');
    let dayOfWeek = monthStart.day();
    let dayRange = _range((-1)*dayOfWeek, DAY_COUNT - dayOfWeek);
    return dayRange.map(d => monthStart.clone().add(d, 'days'));
  }),
});
