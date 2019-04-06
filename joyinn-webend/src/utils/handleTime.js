import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const fromNow = time => moment(time).fromNow();

export { fromNow };
