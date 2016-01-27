import Ember from 'ember';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

export default class YearSelector {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  years() {
    return this.$('.eui-interval').map(trimText).toArray();
  }

  getDisabledCount() {
    return this.$('.--is-disabled').length;
  }

  isSelected(date) {
    let datetime = date.format(HTML5_DATETIME_FORMAT);
    return this.$(`.eui-interval[data-datetime="${datetime}"]`).hasClass('--is-selected');
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
