export default class MonthPageObject {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  daysCount() {
    return this.$('.eui-month--day').length;
  }

  slotCount() {
    return this.$('.eui-month--slot').length;
  }

  emptySlotCount() {
    return this.$('.eui-month--empty').length;
  }

  deactivatedSlotCount() {
    return this.$('.eui-month--disabled').length;
  }

  calendar() {
    return this.$('.eui-month--slot').map(trimText).toArray();
  }

  headers() {
    return this.$('.eui-nameofday').map(trimText).toArray();
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
