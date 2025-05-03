const itemSet = [
    {setName: 'Morning Routine', 
        items: [
            {id: 0, itemName: 'Coffee', itemDesc: 'I drank Coffee', itemIcon: require('@/assets/pngs/itemLogs/coffee.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today was', 1]},
            {id: 1, itemName: 'Sleep', itemDesc: 'Quality of Sleep', itemIcon: require('@/assets/pngs/itemLogs/pillow.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today was', 1]},
            {id: 2, itemName: 'Breakfast', itemDesc: 'I ate Breakfast', itemIcon: require('@/assets/pngs/itemLogs/breakfast.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today tasted', 1]},
            {id: 3, itemName: 'Shower', itemDesc: 'I Showered today', itemIcon: require('@/assets/pngs/itemLogs/bathtub.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today felt', 1]},
            {id: 4, itemName: 'Journal', itemDesc: 'I Journaled plans', itemIcon: require('@/assets/pngs/itemLogs/agenda.png'), adjectives: ['nothing', 'a bit', 'some', 'a lot', 'plenty'], sentence: ['I wrote ', 1, 'in my', 0]},
            {id: 5, itemName: 'Social', itemDesc: 'Checked Socials', itemIcon: require('@/assets/pngs/itemLogs/comment.png'), adjectives: ['nothing', 'a bit', 'some', 'a lot', 'plenty'], sentence: ['I saw', 1, 'on my', 0]}
        ]
    },
    {setName: 'School & Work',
        items: [
            {id: 6, itemName: 'Test', itemDesc: 'I had an Exam', itemIcon: require('@/assets/pngs/itemLogs/test.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today went', 1]},
            {id: 7, itemName: 'Class', itemDesc: 'I had Class', itemIcon: require('@/assets/pngs/itemLogs/blackboard.png'), adjectives: ['dull', 'boring', 'okay', 'interesting', 'engaging'], sentence: ['My', 0, 'today felt', 1]},
            {id: 8, itemName: 'Work', itemDesc: 'I went to Work', itemIcon: require('@/assets/pngs/itemLogs/briefcase.png'), adjectives: ['dull', 'boring', 'okay', 'interesting', 'engaging'], sentence: [0, 'today felt', 1]},
            {id: 9, itemName: 'Deadline', itemDesc: 'I met a Deadline', itemIcon: require('@/assets/pngs/itemLogs/deadline.png'), adjectives: ['last-minute', 'barely', 'on time', 'early' , 'very early'], sentence: ['I met my', 0, 1]},
            {id: 10, itemName: 'Traffic', itemDesc: 'I saw Traffic', itemIcon: require('@/assets/pngs/itemLogs/traffic.png'), adjectives: ['plenty of', 'a lot of', 'some', 'a bit of', 'no'], sentence: ['I experienced', 1, 0]}
        ]
    },
    {setName: 'Exercise',
        items: [
            {id: 11, itemName: 'Walk', itemDesc: 'I went on a Walk', itemIcon: require('@/assets/pngs/itemLogs/shoe.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today felt', 1]},
            {id: 12, itemName: 'Stretching', itemDesc: 'I did Stretching', itemIcon: require('@/assets/pngs/itemLogs/flexibility.png'), adjectives: ['no', 'a bit of', 'some', 'a lot of', 'plenty of'], sentence: ['I did', 1, 0]},
            {id: 13, itemName: 'Workout', itemDesc: 'I Worked out', itemIcon: require('@/assets/pngs/itemLogs/weight.png'), adjectives: ['very simple', 'light', 'average', 'difficult', 'challenging'], sentence: ['I had a', 1, 0]},
            {id: 14, itemName: 'Sports', itemDesc: 'I played a Sport', itemIcon: require('@/assets/pngs/itemLogs/sports.png'), adjectives: ['hated', 'disliked', 'liked', 'enjoyed', 'loved'], sentence: ['I', 1, 'playing', 0, 'today']},
            {id: 15, itemName: 'Cardio', itemDesc: 'I did Cardio', itemIcon: require('@/assets/pngs/itemLogs/heart.png'), adjectives: ['very little', 'light', 'moderate', 'intense', 'challenging'], sentence: ['My', 0, 'training was', 1]}
        ]
    },
    {setName: 'Evening Wind-Down',
        items: [
            {id: 16, itemName: 'Dinner', itemDesc: 'I ate Dinner', itemIcon: require('@/assets/pngs/itemLogs/dinner.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'tonight was', 1]},
            {id: 17, itemName: 'Phone', itemDesc: 'Time on Phone', itemIcon: require('@/assets/pngs/itemLogs/phone.png'), adjectives: ['too much', 'a lot', 'a little', 'a bit', 'not at all'], sentence: ['I was on my', 0, 1]},
            {id: 18, itemName: 'Book', itemDesc: 'I read a Book', itemIcon: require('@/assets/pngs/itemLogs/book.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['The', 0, 'I read was', 1]},
            {id: 19, itemName: 'Show', itemDesc: 'I saw a Show', itemIcon: require('@/assets/pngs/itemLogs/tv.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['The', 0, 'I watched was', 1]},
            {id: 20, itemName: 'Nap', itemDesc: 'I took a Nap', itemIcon: require('@/assets/pngs/itemLogs/nap.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['The', 0, 'I took felt', 1]}
        ]
    }
]

export default itemSet