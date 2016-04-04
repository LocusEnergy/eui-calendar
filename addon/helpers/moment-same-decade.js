import Ember from 'ember';
import Moment from 'moment';

export function momentSameDecade([a, b]) {
  const aYear = new Moment(a).year();
  const bYear = new Moment(b).year();
  return getDecade(aYear) === getDecade(bYear);
}

function getDecade(year) {
  return year - year % 10;
}

export default Ember.Helper.helper(momentSameDecade);
