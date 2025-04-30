const itemSet = [
    {setName: 'Morning Routine', 
        items: [
            {itemName: 'Coffee', itemDesc: 'I drank Coffee', itemIcon: require('@/assets/pngs/itemLogs/coffee.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today was', 1]},
            {itemName: 'Sleep', itemDesc: 'Quality of Sleep', itemIcon: require('@/assets/pngs/itemLogs/pillow.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today was', 1]},
            {itemName: 'Breakfast', itemDesc: 'I ate Breakfast', itemIcon: require('@/assets/pngs/itemLogs/breakfast.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today tasted', 1]},
            {itemName: 'Shower', itemDesc: 'I Showered today', itemIcon: require('@/assets/pngs/itemLogs/bathtub.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today felt', 1]},
            {itemName: 'Journal', itemDesc: 'I Journaled plans', itemIcon: require('@/assets/pngs/itemLogs/agenda.png'), adjectives: ['nothing', 'a bit', 'some', 'a lot', 'plenty'], sentence: ['I wrote ', 1, 'in my', 0]},
            {itemName: 'Social', itemDesc: 'Checked Socials', itemIcon: require('@/assets/pngs/itemLogs/comment.png'), adjectives: ['nothing', 'a bit', 'some', 'a lot', 'plenty'], sentence: ['I saw', 1, 'on my', 0]}
        ]
    },
    {setName: 'School & Work',
        items: [
            {itemName: 'Test', itemDesc: 'I had an Exam', itemIcon: require('@/assets/pngs/itemLogs/test.png'), adjectives: ['bad', 'poor', 'okay', 'good', 'great'], sentence: ['My', 0, 'today went', 1]},
            {itemName: 'Class', itemDesc: 'I had Class', itemIcon: require('@/assets/pngs/itemLogs/blackboard.png'), adjectives: ['dull', 'boring', 'okay', 'interesting', 'engaging'], sentence: ['My', 0, 'today felt', 1]},
            {itemName: 'Work', itemDesc: 'I went to Work', itemIcon: require('@/assets/pngs/itemLogs/briefcase.png'), adjectives: ['dull', 'boring', 'okay', 'interesting', 'engaging'], sentence: [0, 'today felt', 1]},
            {itemName: 'Deadline', itemDesc: 'I met a Deadline', itemIcon: require('@/assets/pngs/itemLogs/deadline.png'), adjectives: ['last-minute', 'barely', 'on time', 'early' , 'very early'], sentence: ['I met my', 0, 1]},
            {itemName: 'Traffic', itemDesc: 'I saw Traffic', itemIcon: require('@/assets/pngs/itemLogs/traffic.png'), adjectives: ['plenty of', 'a lot of', 'some', 'a bit of', 'no'], sentence: ['I experienced', 1, 0]}
        ]
    }
]

export default itemSet