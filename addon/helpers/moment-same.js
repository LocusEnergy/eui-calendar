import Ember from 'ember';

export function momentSame([date1, date2, unit]/*, hash*/) {
  return date1 ? date1.isSame(date2, unit) : false;
}

export default Ember.Helper.helper(momentSame);
