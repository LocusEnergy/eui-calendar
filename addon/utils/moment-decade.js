import Moment from 'moment';
import _range from 'lodash/utility/range';

export default function momentDecade(moment) {
  let year = new Moment(moment).year();
  let firstYear = year - (year % 10) - 1;
  let beginningOfDecade = new Moment(firstYear, 'YYYY');
  return _range(12).map(y => beginningOfDecade.clone().add(y, 'year'));
}
