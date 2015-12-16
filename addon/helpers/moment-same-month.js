import Ember from 'ember';

export function momentSameMonth([month, day]){
  return month.isSame(day, 'month');
}

export default Ember.Helper.helper(momentSameMonth);
