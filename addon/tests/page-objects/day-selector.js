import Ember from 'ember';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

export default class DaySelector {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  emptyCount() {
    return this.$('.eui-interval.--is-empty').length;
  }

  notEmptyCount() {
    return this.$('.eui-interval').not('.--is-empty').length;
  }

  disabledCount() {
    return this.$('.eui-interval.--is-disabled').length;
  }

  notDisabledCount() {
    return this.$('.eui-interval').not('.--is-disabled').length;
  }

  days() {
    return this.$('.eui-interval').map(trimText).toArray();
  }

  headers() {
    return this.$('.eui-nameofday').map(trimText).toArray();
  }

  isSelected(date) {
    let datetime = date.format(HTML5_DATETIME_FORMAT);
    return this.$(`.eui-interval[data-datetime="${datetime}"]`).hasClass('--is-selected');
  }

  selectDay(day) {
    let datetime = day.format(HTML5_DATETIME_FORMAT);
    this.$(`.eui-interval[data-datetime="${datetime}"]`).click();
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
