import Ember from 'ember';

export function containsMonth([selection, month]) {
  selection = selection || [];
  let found = selection.find(item => {
    return item.isSame(month, 'month');
  });
  return Ember.isPresent(found);
}

export default Ember.Helper.helper(containsMonth);
