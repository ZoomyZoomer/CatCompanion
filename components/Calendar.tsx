import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Calendar = ({dailyMoods} : any) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const numDaysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const [activeDay, setActiveDay] = useState(9)

  const totalCells = firstDayOfWeek + numDaysInMonth

  const [bucket, setBucket] = useState(new Array(32).fill(null));


  useEffect(() => {
    const newBucket = new Array(32).fill(null);
  
    dailyMoods.forEach((mood : any) => {
      const day = new Date(mood.date).getDate();
      newBucket[day] = { mood: mood.mood };
    });
  
    setBucket(newBucket);
  }, [dailyMoods]);

  return (
    <View style={styles.calendarCont}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity></TouchableOpacity>
      </View>

      <View style={{ height: '82%', alignItems: 'center', width: '100%' }}>
        <View style={{ width: '100%', marginTop: 40, padding: 10 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {Array.from({ length: totalCells }).map((_, index) => {
              const isDayCell = index >= firstDayOfWeek
              const dayNumber = index - firstDayOfWeek + 1

              return (
                <View style={{ alignItems: 'center' }} key={index}>
                  <View style={{position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={[activeDay == (index + 1 + (-firstDayOfWeek)) ? styles.activeDay : (isDayCell ? styles.emptyDay : styles.missingDay), {margin: 2, marginTop: 8, position: 'relative', justifyContent: 'center', alignItems: 'center'}]}>
                        {bucket[index + 1 + (-firstDayOfWeek)] ? <Image source={require('@/assets/cats/happy_cat.png')} style={styles.image}/> : <></>}
                    </TouchableOpacity>
                    {index < 7 && (
                        <Text style={{ color: '#8B93A0', position: 'absolute', bottom: '128%' }}>
                            {daysOfWeek[index]}
                        </Text>
                    )}
                  </View>
                  {isDayCell ? (
                    <View
                      style={[
                        styles.dayTag,
                        { backgroundColor: activeDay == (index + 1 + (-firstDayOfWeek)) ? '#FCAD72' : 'transparent' }
                      ]}
                    >
                      <Text
                        style={{
                          color: activeDay == (index + 1 + (-firstDayOfWeek)) ? 'white' : '#52637D',
                          fontWeight: '500',
                          fontSize: 12
                        }}
                      >
                        {dayNumber}
                      </Text>
                    </View>
                  ) : (
                    <View style={{ height: 20 }} /> 
                  )}
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  calendarCont: {
    borderColor: '#CDD8EA',
    borderWidth: 1,
    borderRadius: 16,
    height: 520,
    width: '100%',
    backgroundColor: 'white'
  },
  calendarHeader: {
    width: '100%',
    height: '14%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FCAD72',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  emptyDay: {
    borderColor: '#E8ECF1',
    borderWidth: 1,
    borderRadius: '100%',
    backgroundColor: '#FAFAFA',
    height: 42,
    width: 42
  },
  missingDay: {
    height: 42,
    width: 42,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  activeDay: {
    height: 42,
    width: 42,
    borderWidth: 1,
    borderRadius: '100%',
    backgroundColor: '#FFE3CE',
    borderColor: '#FFE3CE'
  },
  dayTag: {
    width: 30,
    borderRadius: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 42,
    width: 42,
    marginTop: 4
  }
})
