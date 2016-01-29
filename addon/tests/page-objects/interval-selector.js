export default class IntervalSelector {
  constructor(env) {
    this.env = env;
    this.$ = this.env.$;
  }

  getName() {
    return this.$('.eui-interval-selector--name').text().trim();
  }

  zoom() {
    this.$('.eui-interval-selector--name').click();
  }

  previous() {
    this.$('.eui-interval-selector--previous').click();
  }

  next() {
    this.$('.eui-interval-selector--next').click();
  }
}
