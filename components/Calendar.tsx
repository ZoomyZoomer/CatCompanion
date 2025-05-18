
import React, { useEffect, useState, useRef } from "react"
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native"

import ChevronDown from '@/assets/svgs/chevron_down.svg'
import CalendarFilled from '@/assets/svgs/calendar_filled.svg'
import ArrowRight from '@/assets/svgs/arrow-right.svg'

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const ROW_HEIGHT = 72 // adjust to match one row's total height (cell + tag + margins)

const Calendar = ({
  dailyMoods,
  setIsPickingDate,
  month2,
  year2,
  activeDay,
  setActiveDay,
}: any) => {
  const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const [bucket, setBucket] = useState<{ mood: string }[]>([])
  const [expanded, setExpanded] = useState(false)

  // build bucket from moods
  useEffect(() => {
    const b = new Array(32).fill(null)
    dailyMoods.forEach((m: any) => {
      const d = new Date(m.date).getDate()
      b[d] = { mood: m.mood }
    })
    setBucket(b)
  }, [dailyMoods])

  // Animate container pop
  const scaleAnim = useRef(new Animated.Value(1)).current
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.05, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, easing: Easing.in(Easing.ease), useNativeDriver: true }),
    ]).start()
  }, [])

  // Animated height
  const heightAnim = useRef(new Animated.Value(ROW_HEIGHT * 2)).current

  // helper: add days
  const addDays = (d: Date, n: number) => {
    const x = new Date(d); x.setDate(x.getDate() + n); return x
  }

  // compute dates for grid and count rows
  const computeGrid = () => {
    let dates: (Date|null)[] = []
    let rows = 0

    if (!expanded) {
      // collapsed state
      if (month2 === currentMonth && year2 === currentYear) {
        // snapshot around today
        const wd = today.getDay()
        const startThis = addDays(today, -wd)
        const startPrev = addDays(startThis, -7)
        const firstOfMonth = new Date(currentYear, currentMonth, 1)
        const weekStarts = startPrev >= firstOfMonth
          ? [startPrev, startThis]
          : [startThis, addDays(startThis, 7)]
        weekStarts.forEach(ws => {
          for (let i = 0; i < 7; i++) dates.push(addDays(ws, i))
        })
        rows = 2
      } else {
        // first 14 days of other month
        const start = new Date(year2, month2, 1)
        for (let i = 0; i < 14; i++) dates.push(addDays(start, i))
        rows = 2
      }
    } else {
      // expanded: full-month with offset blanks
      const firstDay = new Date(year2, month2, 1)
      const offset = firstDay.getDay()
      const dim = new Date(year2, month2+1, 0).getDate()
      for (let i = 0; i < offset; i++) dates.push(null)
      for (let d = 1; d <= dim; d++) dates.push(new Date(year2, month2, d))
      rows = Math.ceil(dates.length / 7)
    }

    return { dates, rows }
  }

  const { dates: visibleDates, rows } = computeGrid()

  // animate height when collapsed/expanded or month change
  useEffect(() => {
    const toValue = ROW_HEIGHT * rows
    Animated.timing(heightAnim, { toValue, duration: 300, easing: Easing.out(Easing.ease), useNativeDriver: false }).start()
  }, [expanded, rows])

  // reset active day & collapse when switching month/year
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(false)
    if (currentMonth === month2 && currentYear === year2) setActiveDay(today.getDate())
    else setActiveDay(null)
  }, [month2, year2])

  const onToggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded(x => !x)
  }

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]

  const catMap = {
    'Upset': require('@/assets/cats/angry_cat.png'),
    'Sad': require('@/assets/cats/sad_cat.png'),
    'Okay': require('@/assets/cats/okay_cat.png'),
    'Happy': require('@/assets/cats/happy_cat.png')
  }

  const [activeDayNumber, setActiveDayNumber] = useState(null);

  return (
    <Animated.View style={[styles.calendarCont, { transform: [{ scale: scaleAnim }] }]}>      
      <View style={styles.calendarHeader}>
        <CalendarFilled/>
        <Text style={styles.headerText}>{expanded ? 'Mega' : 'Mini'} Cat Calendar</Text>
        <View style={styles.decorDotLeft}/>
        <View style={styles.decorDotRight}/>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.monthPicker}>
          <TouchableOpacity style={styles.date_btn} onPress={()=>setIsPickingDate(true)}>
            <Text style={styles.monthText}>{months[month2]} {year2}</Text>
            <ChevronDown stroke='#52637D' style={{marginTop:2}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysRow}>
          {daysOfWeek.map((d,i)=><Text key={i} style={styles.weekDayLabel}>{d}</Text>)}
        </View>

        <Animated.View style={[styles.datesGrid,{height:heightAnim,overflow:'hidden'}]}>          
          {visibleDates.map((dt,idx)=>{
            if(!dt) return <View key={idx} style={styles.dateCell}><View style={styles.missingDay}/></View>
            const day = dt.getDate()
            const isCurr = dt.getMonth()===month2 && dt.getFullYear()===year2
            const isActive = isCurr && day===activeDay
            const isFuture = dt.getTime()>today.getTime()
            const hasMood = isCurr && Boolean(bucket[day])

            let styleDay = styles.missingDay
            if (isActive) styleDay=styles.selectedDay
            else if(hasMood) styleDay=styles.activeDay
            else if(isFuture && isCurr) styleDay=styles.futureDay
            else if(isCurr) styleDay=styles.emptyDay

            return <View key={idx} style={styles.dateCell}>
              <TouchableOpacity onPress={()=>!isFuture && setActiveDay(day)} style={styleDay}>
                {hasMood && <Image source={catMap[bucket[day].mood]} style={styles.image}/>}
              </TouchableOpacity>
              <View style={[styles.dayTag,{backgroundColor:isActive?'#FCAD72':'transparent'}]}>
                <Text style={[styles.dayText,{color:isActive?'white':'#52637D'}]}>{day}</Text>
              </View>
            </View>
          })}
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.moreCalendar} onPress={onToggleExpand}>
        <Text style={styles.moreText}>{expanded?'Show mini calendar view':'See full calendar view'}</Text>
        <ArrowRight style={{transform:[{rotate:expanded?'180deg':'0deg'}]}}/>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Calendar


const styles = StyleSheet.create({
  calendarCont: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
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
    position: 'relative',
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  decorDotLeft: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    top: 10,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  decorDotRight: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 10,
    top: 10,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  bodyContainer: {
    padding: 10,
    borderColor: '#CDD8EA',
    borderWidth: 1,
    borderTopWidth: 0,
    paddingBottom: 40,
  },
  monthPicker: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  date_btn: {
    borderColor: '#CDD8EA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    color: '#52637D',
    fontWeight: '500',
    marginRight: 8,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  weekDayLabel: {
    width: 30,
    textAlign: 'center',
    color: '#8B93A0',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  dateCell: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '14.28%', // 100% / 7
    marginVertical: 4,
  },
  emptyDay: {
    borderColor: '#E8ECF1',
    borderWidth: 1,
    borderRadius: 42,
    backgroundColor: '#FAFAFA',
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  futureDay: {
    borderColor: '#D1D4D8',
    borderWidth: 1,
    borderRadius: 42,
    backgroundColor: '#EEEEEE',
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  dayTag: {
    width: 30,
    borderRadius: 40,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  dayText: {
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
  },
  moreCalendar: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CDD8EA',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    width: '100%',
    borderTopWidth: 0,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  moreText: {
    color: '#52637D',
    marginRight: 8,
  },
  image: {
    resizeMode: 'contain',
    height: 44,
    width: 44,
    marginTop: 4,
  },
  selectedDay: {
    height: 42,
    width: 42,
    borderRadius: 42,
    backgroundColor: '#FFE3CE',
    borderWidth: 1,
    borderColor: '#FFC69C',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
