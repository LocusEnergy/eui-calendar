export default class MonthPageObject {
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
}

function trimText() {
  return Ember.$(this).text().trim();
}
