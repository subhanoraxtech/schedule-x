import {createPreactView, setRangeForDay, setRangeForWeek} from '@schedule-x/calendar'
import {addDays} from '@schedule-x/shared'
import {ResourceDayView} from './components/view-wrapper'
import {ResourceWeekView} from './components/view-wrapper'

const addWeeks = (date: string, n: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + (n * 7));
  return d.toISOString().split('T')[0];
}

type PreactView = ReturnType<typeof createPreactView>

type ViewFactory = () => PreactView;

export type PreactViewComponent = ReturnType<
  typeof createPreactView
>['Component']

export const createTeamDayView: ViewFactory = () => createPreactView({
  name: 'team-day',
  label: 'Team Day',
  Component: ResourceDayView,
  hasWideScreenCompat: true,
  hasSmallScreenCompat: true,
  backwardForwardFn: addDays,
  backwardForwardUnits: 1,
  setDateRange: setRangeForDay,
})

export const createTeamWeekView: ViewFactory = () => createPreactView({
  name: 'team-week',
  label: 'Team Week',
  Component: ResourceWeekView,
  hasWideScreenCompat: true,
  hasSmallScreenCompat: true,
  backwardForwardFn: addWeeks,
  backwardForwardUnits: 1,
  setDateRange: setRangeForWeek,
})
