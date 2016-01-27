import Ember from 'ember';
import Moment from 'moment';

export function momentSameDecade([a, b]) {
  const aYear = Moment(a).year();
  const bYear = Moment(b).year();
  return getDecade(aYear) === getDecade(bYear);
}

function getDecade(year) {
  return year - year % 10;
}

export default Ember.Helper.helper(momentSameDecade);
