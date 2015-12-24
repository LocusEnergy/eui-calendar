import Ember from 'ember';
import moment from 'moment';
import _range from 'lodash/utility/range';

import layout from '../templates/components/eui-year';

export default Ember.Component.extend({
  layout,
  classNames: 'eui-year',

  months: Ember.computed('year', function() {
    let yearStart = moment(this.get('year')).startOf('year');
    return _range(12).map(m => yearStart.clone().add(m, 'months'));
  })
});
