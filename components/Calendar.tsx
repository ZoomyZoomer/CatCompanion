import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import ChevronDown from '@/assets/svgs/chevron_down.svg'
import CalendarFilled from '@/assets/svgs/calendar_filled.svg'
import ArrowRight from '@/assets/svgs/arrow-right.svg'

const Calendar = ({ dailyMoods, setIsPickingDate, month2, year2, activeDay, setActiveDay }: any) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const currentDay = today.getDate()

  const numDaysInMonth = new Date(year, month + 1, 0).getDate()
  const firstOfMonth = new Date(year, month, 1)

  const [bucket, setBucket] = useState<{ mood: string }[]>([] as any)

  useEffect(() => {
    const newBucket = new Array(32).fill(null)
    dailyMoods.forEach((mood: any) => {
      const d = new Date(mood.date).getDate()
      newBucket[d] = { mood: mood.mood }
    })
    setBucket(newBucket)
  }, [dailyMoods])

  // helper to add days
  const addDays = (date: Date, n: number) => {
    const d = new Date(date)
    d.setDate(d.getDate() + n)
    return d
  }

  // find start of current week (Sunday)
  const weekday = today.getDay()
  const startThisWeek = addDays(today, -weekday)

  // propose previous and next weeks
  const startPrevWeek = addDays(startThisWeek, -7)
  const startNextWeek = addDays(startThisWeek, 7)

  // decide which two weeks to show
  const weekStarts: Date[] =
    startPrevWeek >= firstOfMonth
      ? [startPrevWeek, startThisWeek]
      : [startThisWeek, startNextWeek]

  // flatten to 14 individual days
  const visibleDates: Date[] = []
  weekStarts.forEach(ws => {
    for (let i = 0; i < 7; i++) {
      visibleDates.push(addDays(ws, i))
    }
  })

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if ((today.getMonth() == month2) && (today.getFullYear() == year2)){
      setActiveDay(today.getDate());
    } else {
      setActiveDay(null);
    }
  }, [month2, year2])

  return (
    <View style={styles.calendarCont}>
      <View style={styles.calendarHeader}>
        <CalendarFilled />
        <Text style={{ color: 'white', fontWeight: '600', marginLeft: 8, fontSize: 16}}>Mini Cat Calendar</Text>
        <View style={{position: 'absolute', backgroundColor: 'white', left: 10, top: 10, height: 10, width: 10, borderRadius: '100%'}} />
        <View style={{position: 'absolute', backgroundColor: 'white', right: 10, top: 10, height: 10, width: 10, borderRadius: '100%'}} />
        <View />
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.monthPicker}>
          <TouchableOpacity style={styles.date_btn} onPress={() => setIsPickingDate(true)}>
            <Text style={styles.monthText}>{months[month2]} {year2}</Text>
            <ChevronDown stroke={'#52637D'} style={{marginTop: 2}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysRow}>
          {daysOfWeek.map((d, i) => (
            <Text key={i} style={styles.weekDayLabel}>{d}</Text>
          ))}
        </View>

        <View style={styles.datesGrid}>
          {visibleDates.map((dateObj, idx) => {
            const d = dateObj.getDate()
            const isCurrentMonth = dateObj.getMonth() === month
            const isActive = isCurrentMonth && d === activeDay
            const hasMood = isCurrentMonth && bucket[d]

            return (
              <View key={idx} style={styles.dateCell}>
                <TouchableOpacity
                  onPress={() => isCurrentMonth && setActiveDay(d)}
                  style={isActive ? styles.activeDay : isCurrentMonth ? styles.emptyDay : styles.missingDay}
                >
                  {hasMood && <Image source={require('@/assets/cats/happy_cat.png')} style={styles.image} />}
                </TouchableOpacity>
                <View style={[styles.dayTag, { backgroundColor: isActive ? '#FCAD72' : 'transparent' }]}>  
                  <Text style={[styles.dayText, { color: isActive ? 'white' : '#52637D' }]}> {d} </Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.moreCalendar}>
        <Text style={{color: '#52637D', marginRight: 8}}>See full calendar view</Text>
        <ArrowRight />
      </TouchableOpacity>
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  calendarCont: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16
  },
  calendarHeader: {
    width: '100%',
    height: 70,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FCAD72',
    paddingLeft: 40,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative'
  },
  bodyContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 40,
    borderColor: '#CDD8EA',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  monthPicker: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12
  },
  monthText: {
    color: '#52637D',
    fontWeight: '500',
    marginRight: 8
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 18
  },
  weekDayLabel: {
    width: 30,
    textAlign: 'center',
    color: '#8B93A0'
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16
  },
  dateCell: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '13.6%',
    marginVertical: 8
  },
  emptyDay: {
    borderColor: '#E8ECF1',
    borderWidth: 1,
    borderRadius: 42,
    backgroundColor: '#FAFAFA',
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center'
  },
  missingDay: {
    height: 42,
    width: 42,
  },
  activeDay: {
    height: 42,
    width: 42,
    borderRadius: 42,
    backgroundColor: '#FFE3CE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayTag: {
    width: 30,
    borderRadius: 40,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4
  },
  dayText: {
    fontSize: 12,
    textAlign: 'center',
    width: '100%'
  },
  date_btn: {
    borderColor: '#CDD8EA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreCalendar: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CDD8EA',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'contain',
    height: 44,
    width: 44,
    marginTop: 4
  }
})
