export default class Interval {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  selector() {
    return this.$('.eui-interval');
  }

  value() {
    return this.selector().text().trim();
  }

  datetime() {
    return this.selector().attr('data-datetime');
  }

  isSelected() {
    return this.selector().hasClass('--is-selected');
  }

  isNow() {
    return this.selector().hasClass('--is-now');
  }

  selectMoment() {
    this.selector().click();
  }
}
