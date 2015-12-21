export default class CalendarPageObject {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  calendar() {
    return this.$('.eui-day').map(trimText).toArray();
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
