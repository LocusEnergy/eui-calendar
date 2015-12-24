export default class Month {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  monthValue() {
    return this.$('.eui-month').text().trim();
  }

  datetime() {
    return this.$('.eui-month').attr('data-datetime');
  }

  isSelected() {
    return this.$('.eui-month').hasClass('eui-month--selected');
  }
}
