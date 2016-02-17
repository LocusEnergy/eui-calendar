import Ember from 'ember';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

export default class MonthSelector {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  monthCount() {
    return this.$('.eui-interval').length;
  }

  months() {
    return this.$('.eui-interval').map(trimText).toArray();
  }

  isSelected(date) {
    let datetime = date.format(HTML5_DATETIME_FORMAT);
    return this.$(`.eui-interval[data-datetime="${datetime}"]`).hasClass('--is-selected');
  }

  selectMonth(month) {
    let datetime = month.format(HTML5_DATETIME_FORMAT);
    this.$(`.eui-interval[data-datetime="${datetime}"]`).click();
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
