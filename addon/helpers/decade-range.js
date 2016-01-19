import Ember from 'ember';
import _last from 'lodash/array/last';

function yearFormat(year) {
  return year.format('YYYY');
}

export function decadeRange([momentRange]) {
  let [ first ] = momentRange;
  let last = _last(momentRange);
  return `${yearFormat(first)} - ${yearFormat(last)}`;

}

export default Ember.Helper.helper(decadeRange);
