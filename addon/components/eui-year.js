import Ember from 'ember';

import layout from '../templates/components/eui-year';
import { YearMixin } from '../mixins/base-interval';

export default Ember.Component.extend(YearMixin, {
  layout,
});
