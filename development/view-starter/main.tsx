import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import {
  createCalendar,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import '../app.css'
import {createTeamDayView, createTeamWeekView} from "../../packages/view-starter/src";
import '../../packages/view-starter/src/styles/index.scss'

const calendarElement = document.getElementById('calendar') as HTMLElement
 
let teamDayView = createTeamDayView();
let teamWeekView = createTeamWeekView();

const calendar = createCalendar({
  selectedDate: '2024-05-11',
  calendars: {
    personal: {
      colorName: 'personal',
      lightColors: {
        main: '#f9d71c',
        container: '#fff5aa',
        onContainer: '#594800',
      },
      darkColors: {
        main: '#fff5c0',
        onContainer: '#fff5aa',
        container: '#a29742',
      },
    },
    work: {
      colorName: 'work',
      lightColors: {
        main: '#f91c45',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
      darkColors: {
        main: '#ffc0cc',
        onContainer: '#ffdee6',
        container: '#a24258',
      },
    },
  },
  events: [
    {
      id: '1',
      title: 'Brenda Massey - Blow Dry',
      start: '2024-05-11 08:00',
      end: '2024-05-11 09:00',
      calendarId: 'john',
    },
    {
      id: '2',
      title: 'Alena Geidt - Hair cut',
      start: '2024-05-11 08:00',
      end: '2024-05-11 09:00',
      calendarId: 'maria',
    },
    {
      id: '3',
      title: 'Phillip Dorwart - Beard Grooming',
      start: '2024-05-11 09:00',
      end: '2024-05-11 10:15',
      calendarId: 'wendy',
    },
    {
      id: '4',
      title: 'James Herwitz - Balinese Massage',
      start: '2024-05-11 08:30',
      end: '2024-05-11 09:45',
      calendarId: 'amy',
    },
    {
      id: '5',
      title: 'Craig Mango - Yoga session',
      start: '2024-05-11 10:00',
      end: '2024-05-11 10:35',
      calendarId: 'john',
    },
    {
      id: '6',
      title: 'Marilyn Carder - Hair and Beard Cut',
      start: '2024-05-11 10:00',
      end: '2024-05-11 10:35',
      calendarId: 'maria',
    },
    {
      id: '7',
      title: 'Long Strategy Meeting',
      start: '2024-05-11 12:00',
      end: '2024-05-11 16:00',
      calendarId: 'john',
    },
    {
      id: '8',
      title: 'Full Body Treatment',
      start: '2024-05-11 11:00',
      end: '2024-05-11 14:00',
      calendarId: 'amy',
    },
    {
      id: '9',
      title: 'Staff Training',
      start: '2024-05-11 13:00',
      end: '2024-05-11 18:00',
      calendarId: 'wendy',
    },
  ],
  views: [teamDayView, teamWeekView],
  defaultView: teamDayView.name,
})
calendar.render(calendarElement)
