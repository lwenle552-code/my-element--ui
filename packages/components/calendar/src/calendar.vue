<template>
  <div :class="nsCal.b()">
    <div :class="nsCal.e('header')">
      <div :class="nsCal.e('title')">{{ currentDate }}</div>
      <div :class="nsCal.e('button-group')">
        <z-button @click="$event => selectDate('prev-year')">前一年</z-button>
        <z-button @click="$event => selectDate('prev-month')">上个月</z-button>
        <z-button @click="$event => selectDate('today')">今天</z-button>
        <z-button @click="$event => selectDate('next-month')">下个月</z-button>
        <z-button @click="$event => selectDate('next-year')">下一年</z-button>
      </div>
    </div>
    <div :class="nsCal.e('body')">
      <table :class="nsTable.b()" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rid) in rows" :key="rid">
            <td v-for="(cell, cid) in row" :key="cid" :class="[nsDay.b(), getCellClass(cell)]"
              @click="$event => handlePick(cell)">

              <slot name="date-cell" :data="getSlotDate(cell)">
                {{ cell.text }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
// BEM 规范 block element modifier (样式 scss)
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { createNamespace } from '@zi-shui/utils/create'
import ZButton from '@zi-shui/components/button'
import { calendarProps, CalendarDateType, calendarEmits, CalendarDateCellType, CalendarDateCell } from './calendar'

const nsCal = createNamespace('calendar')
const nsTable = createNamespace('calendar-table')
const nsDay = createNamespace('calendar-day')


const props = defineProps(calendarProps)
const now = dayjs()

// 根据用户的属性计算当前的日期
const date = computed<Dayjs>(() => {
  if (!props.modelValue) {
    return now.startOf('day')
  } else {
    return dayjs(props.modelValue)
  }
})

defineOptions({
  name: 'z-calendar'
})

// 表头部分
const firstDayofWeek = dayjs().startOf('week').day()
const weekMaping = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
]

const weekDays = computed(() => {
  return [
    ...weekMaping.slice(firstDayofWeek),
    ...weekMaping.slice(0, firstDayofWeek)
  ]
})

// 面板部分
const rows = computed(() => {
  let list: CalendarDateCell[] = []
  const monthStart = date.value.startOf('month')
  const firstDay = monthStart.day()

  const count = (firstDay - firstDayofWeek + 7) % 7

  const lastDayOfPrevMonth = date.value.subtract(1, 'month').endOf('month').date()

  // 修复：确保 map 回调函数中包含 (_, idx)
  const preMonthDays: CalendarDateCell[] = Array.from({ length: count })
    .map((_, idx) => lastDayOfPrevMonth - (count - idx - 1))
    .map(text => ({ // 这里的 text 是数字
      text,
      type: 'prev'
    }))

  // 本月
  const daysInCurrentMonth = date.value.daysInMonth()

  // 修复：确保 map 回调函数中包含 (_, idx)
  const currentMonthDays: CalendarDateCell[] = Array.from({ length: daysInCurrentMonth })
    .map((_, idx) => ({ // 使用 map 的索引 idx + 1 作为日期
      text: idx + 1,
      type: 'current'
    }))

  list = [...preMonthDays, ...currentMonthDays]
  let remaining = 42 - list.length

  const nextMonthDays: CalendarDateCell[] = Array.from({ length: remaining })
    .map((_, idx) => ({
      text: idx + 1,
      type: 'next'
    }))

  list.push(...nextMonthDays)

  return Array.from({ length: 6 })
    .map((_, idx) => {
      const start = idx * 7
      return list.slice(start, start + 7)
    })
})


const prevMonthDay = computed(() => date.value.subtract(1, 'month'))
const nextMonthDay = computed(() => date.value.add(1, 'month'))
const prevYearDay = computed(() => date.value.subtract(1, 'year'))
const nextYearDay = computed(() => date.value.add(1, 'year'))

// 修复：显式声明 emit 类型，以解决类型错误
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void
  (e: 'pick', value: Date): void
}>()

function pickDay(day: Dayjs) {
  emit('update:modelValue', day.toDate())
  // 如果日历组件需要触发 pick 事件：
  // emit('pick', day.toDate()) 
}

function selectDate(type: CalendarDateType) {
  // 修复：变量名统一为 dateMap
  const dateMap: Record<CalendarDateType, Dayjs> = {
    'prev-year': prevYearDay.value,
    'prev-month': prevMonthDay.value,
    'next-month': nextMonthDay.value,
    'next-year': nextYearDay.value,
    'today': now
  }

  const day = dateMap[type]

  pickDay(day)
}

function formatter(text: number, type: CalendarDateCellType): Dayjs {
  const dayOfMonth = typeof text === 'number' ? text : parseInt(String(text), 10)

  switch (type) {
    case 'prev':
      return date.value.subtract(1, 'month').date(dayOfMonth)
    case 'current':
      return date.value.date(dayOfMonth)
    case 'next':
      return date.value.add(1, 'month').date(dayOfMonth)
  }
}

const selectDay = ref<Dayjs>(dayjs(props.modelValue || now).startOf('day'))

function handlePick(cell: CalendarDateCell) {
  let day = formatter(cell.text, cell.type)

  selectDay.value = day

  pickDay(day)
}

function getCellClass(cell: CalendarDateCell) {
  const clazz: string[] = [cell.type]
  const day = formatter(cell.text, cell.type).startOf('day')

  if (selectDay.value && day.isSame(selectDay.value.startOf('day'), 'day')) {
    clazz.push(nsDay.is('selected', true))
  }

  if (day.isSame(now.startOf('day'), 'day')) {
    clazz.push(nsDay.is('today', true))
  }

  return clazz
}

const currentDate = computed(() => {
  return date.value.format('YYYY年M月')
})

function getSlotDate(cell: CalendarDateCell) {
  let day = formatter(cell.text, cell.type)
  return {
    isSelected: selectDay.value && day.isSame(selectDay.value, 'day'),
    day: day.format('YYYY-MM-DD'),
    date: day.toDate(),
    type: cell.type
  }
}
</script>
