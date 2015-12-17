export default class DayPageObject {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  dayValue() {
    return this.$('.eui-day').text().trim();
  }

  isSelected() {
    return this.$('.eui-day').hasClass('eui-day--selected');
  }

  isToday() {
    return this.$('.eui-day').hasClass('eui-day--today');
  }

  datetime() {
    return this.$('.eui-day').attr('data-datetime');
  }

  selectDay() {
    this.$('.eui-day').click();
  }
}
