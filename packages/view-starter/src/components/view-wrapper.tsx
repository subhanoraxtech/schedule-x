import { PreactViewComponent } from "../create-view";

interface Resource {
  id: string;
  name: string;
  color: string;
  avatarColor: string;
}

const resources: Resource[] = [
  { id: 'john', name: 'John', color: '#88d7f7', avatarColor: '#2196f3' },
  { id: 'maria', name: 'Maria', color: '#f7d088', avatarColor: '#ff9800' },
  { id: 'wendy', name: 'Wendy', color: '#f797d2', avatarColor: '#e91e63' },
  { id: 'amy', name: 'Amy', color: '#88f7f2', avatarColor: '#00bcd4' },
  { id: 'michael', name: 'Michael', color: '#f7bd88', avatarColor: '#ff5722' },
  { id: 'david', name: 'David', color: '#88f7bd', avatarColor: '#4caf50' },
  { id: 'sarah', name: 'Sarah', color: '#d788f7', avatarColor: '#9c27b0' },
  { id: 'jessica', name: 'Jessica', color: '#f7f788', avatarColor: '#ffeb3b' },
];

/**
 * DAY VIEW: Resources (Cols) x Time (Rows)
 */
const ResourceDayGrid = ({ $app, date }: { $app: any, date: string }) => {
  const events = $app.calendarEvents.list.value;
  const dayEvents = events.filter((event: any) => event.start.startsWith(date));

  const startHour = 0;
  const endHour = 24; 
  const hourHeight = 180;
  const totalHeight = (endHour - startHour) * hourHeight;
  const hours = Array.from({ length: endHour - startHour }, (_, i) => i + startHour);

  const getEventStyle = (start: string, end: string, resourceColor: string) => {
    const [startH, startM] = start.split(' ')[1].split(':').map(Number);
    const [endH, endM] = end.split(' ')[1].split(':').map(Number);
    
    // Calculate minutes from start of day (00:00)
    const startMinutes = (startH * 60 + startM);
    const endMinutes = (endH * 60 + endM);
    const durationMinutes = endMinutes - startMinutes;

    return {
      top: `${(startMinutes / 60) * hourHeight}px`,
      height: `${(durationMinutes / 60) * hourHeight}px`,
      backgroundColor: resourceColor,
    };
  };

  return (
    <div className="sx__resource-view" style={{ height: '100%' }}>
      <div className="resource-header-row">
        <div className="time-header-cell"></div>
        {resources.map(resource => (
          <div className="resource-header-cell" key={resource.id}>
            <div className="avatar" style={{ backgroundColor: resource.avatarColor }}>
              {resource.name[0]}
            </div>
            <div className="name">{resource.name}</div>
          </div>
        ))}
      </div>
      
      <div className="resource-body">
        <div className="time-labels-column">
           {hours.map(hour => {
             const displayHour = hour === 0 || hour === 24 ? 12 : (hour > 12 ? hour - 12 : hour);
             const ampm = hour < 12 || hour === 24 ? 'am' : 'pm';
             return (
                <div className="time-label" style={{ height: `${hourHeight}px` }} key={hour}>
                  <span>{displayHour} {ampm}</span>
                </div>
             )
           })}
        </div>

        {resources.map(resource => (
          <div className="resource-column" key={resource.id} style={{ height: `${totalHeight}px`, position: 'relative' }}>
             {hours.map(hour => (
                <div className="grid-line" style={{ height: `${hourHeight}px` }} key={hour}></div>
             ))}

             {dayEvents
               .filter((event: any) => event.calendarId === resource.id)
               .map((event: any) => (
                 <div 
                    className="event-item" 
                    key={event.id}
                    style={getEventStyle(event.start, event.end, resource.color)}
                 >
                   <div className="event-title">{event.title}</div>
                   <div className="event-time">{event.start.split(' ')[1]} - {event.end.split(' ')[1]}</div>
                 </div>
               ))
             }
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * WEEK VIEW: Days (Cols) x Resources (Rows)
 */
const ResourceWeekMatrix = ({ $app, days }: { $app: any, days: string[] }) => {
  const events = $app.calendarEvents.list.value;

  return (
    <div className="sx__week-matrix" style={{ height: '100%' }}>
      <div className="matrix-header-row">
        <div className="resource-sidebar-header"></div>
        {days.map(day => (
           <div className="day-header-cell" key={day}>
              <div className="day-name">{new Date(day).toLocaleDateString('en-US', { weekday: 'long' })}</div>
              <div className="day-number">{new Date(day).getDate()}</div>
           </div>
        ))}
      </div>
      
      <div className="matrix-body">
        {resources.map(resource => (
          <div className="matrix-resource-row" key={resource.id}>
            {/* Resource Profile Header (Left) */}
            <div className="resource-sidebar-cell">
               <div className="avatar" style={{ backgroundColor: resource.avatarColor }}>
                  {resource.name[0]}
               </div>
               <div className="name">{resource.name}</div>
            </div>

            {/* Days Grid Cells */}
            {days.map(day => {
                const datesEvents = events.filter((e: any) => e.start.startsWith(day));
                const resourceEvents = datesEvents.filter((e: any) => e.calendarId === resource.id);
                
                return (
                  <div className="matrix-cell" key={day}>
                      {resourceEvents.map((event: any) => (
                        <div className="matrix-event" key={event.id} style={{ backgroundColor: resource.color }}>
                            {event.start.split(' ')[1]} {event.title}
                        </div>
                      ))}
                  </div>
                )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}


export const ResourceDayView: PreactViewComponent = ({ $app }) => {
    const selectedDate = $app.datePickerState.selectedDate.value;
    return <ResourceDayGrid $app={$app} date={selectedDate} />;
}

export const ResourceWeekView: PreactViewComponent = (props) => {
    const range = props.$app.calendarState.range.value;
    const days = [];
    if (range) {
        let current = new Date(range.start);
        const end = new Date(range.end);
        while (current <= end) {
            days.push(current.toISOString().split('T')[0]);
             current.setDate(current.getDate() + 1);
        }
    } else {
         return <div>Loading...</div>
    }
    
    return <ResourceWeekMatrix $app={props.$app} days={days} />
}
