import Ember from 'ember';

export function containsDay([selection, day]) {
  selection = selection || [];
  let found = selection.find(item => {
    return item.isSame(day, 'day');
  });
  return Ember.isPresent(found);
}

export default Ember.Helper.helper(containsDay);
