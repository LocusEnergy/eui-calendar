export default class DayPageObject {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  isSelected() {
    return this.$('.eui-month--day').hasClass('.eui-month--selected');
  }
}
