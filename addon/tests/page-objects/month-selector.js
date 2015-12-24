import Ember from 'ember';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

export default class MonthSelector {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  daysCount() {
    return this.$('.eui-day').length;
  }

  emptyCount() {
    return this.$('.eui-day--empty').length;
  }

  notEmptyCount() {
    return this.$('.eui-day').not('.eui-day--empty').length;
  }

  disabledCount() {
    return this.$('.eui-day--disabled').length;
  }

  notDisabledCount() {
    return this.$('.eui-day').not('.eui-day--disabled').length;
  }

  calendar() {
    return this.$('.eui-day').map(trimText).toArray();
  }

  headers() {
    return this.$('.eui-nameofday').map(trimText).toArray();
  }

  isSelected(date) {
    let datetime = date.format(HTML5_DATETIME_FORMAT);
    return this.$(`.eui-day[data-datetime="${datetime}"]`).hasClass('eui-day--selected');
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
