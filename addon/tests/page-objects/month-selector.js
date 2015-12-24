import Ember from 'ember';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

export default class MonthSelector {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  monthCount() {
    return this.$('.eui-month').length;
  }

  months() {
    return this.$('.eui-month').map(trimText).toArray();
  }

  isSelected(date) {
    let datetime = date.format(HTML5_DATETIME_FORMAT);
    return this.$(`.eui-month[data-datetime="${datetime}"]`).hasClass('eui-month--selected');
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
