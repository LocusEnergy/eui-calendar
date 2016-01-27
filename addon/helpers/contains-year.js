import Ember from 'ember';

export function containsYear([selection, year]) {
  selection = selection || [];
  let found = selection.find(item => {
    return item.isSame(year, 'year');
  });
  return Ember.isPresent(found);
}

export default Ember.Helper.helper(containsYear);
