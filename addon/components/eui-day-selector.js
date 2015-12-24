import Ember from 'ember';
import layout from '../templates/components/eui-day-selector';
import moment from 'moment';
import _range from 'lodash/utility/range';

const { computed } = Ember;
const DAY_COUNT = 42;

export default Ember.Component.extend({
  layout,
  classNames: 'eui-month',
  month: null,

  init() {
    this._super(...arguments);
    Ember.assert('You must provide a month to eui-month', this.get('month'));
  },

  days: computed('month', function() {
    const monthStart = moment(this.get('month')).startOf('month');
    const dayOfWeek = monthStart.day();
    const dayRange = _range((-1)*dayOfWeek, DAY_COUNT - dayOfWeek);
    return dayRange.map(d => monthStart.clone().add(d, 'days'));
  }),
});
