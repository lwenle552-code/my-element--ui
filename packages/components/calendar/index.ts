//用来整合组件，最终实现导出

import _Calendar from './src/calendar.vue'
import { withInstall } from '@zi-shui/utils/with-install'

const Calendar = withInstall(_Calendar)

export default Calendar //可以通过app.use()来使用 也可以通过import来使用

export * from './src/calendar'
export type { CalendarProps, CalendarEmits } from './src/calendar'
//这里加的类型，可以被解析
declare module 'vue' {
  export interface GlobalComponents {
    ZCalendar: typeof Calendar
  }
}
