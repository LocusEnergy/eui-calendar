import Ember from 'ember';
import moment from 'moment';

export function momentSame([date1, date2, unit]/*, hash*/) {
  if (!date1 || !date2) {
    return false;
  }
  return date1.isSame(date2, unit);
}

export default Ember.Helper.helper(momentSame);
