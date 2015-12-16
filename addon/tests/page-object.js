export default class MonthPageObject {
  constructor(env) {
    this.env = env;
  }

  daysCount() {
    return this.env.$('.eui-month--day').length;
  }

  slotCount() {
    return this.env.$('.eui-month--slot').length;
  }

  emptySlotCount() {
    return this.env.$('.eui-month--empty').length;
  }

  deactivatedSlotCount() {
    return this.env.$('.eui-month--disabled').length;
  }

  calendar() {
    return this.env.$('.eui-month--slot').map(trimText).toArray();
  }

  headers() {
    return this.env.$('.eui-nameofday').map(trimText).toArray();
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
