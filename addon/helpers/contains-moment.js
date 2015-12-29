import Ember from 'ember';

export function containsMoment([selection, moment, interval]) {
  selection = selection || [];
  let found = selection.find(item => {
    return item.isSame(moment, interval);
  });
  return Ember.isPresent(found);
}

export default Ember.Helper.helper(containsMoment);
