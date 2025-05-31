const Habits = require('../models/Habits.js');

const sendHabit = async(req, res) => {

    const { uid, habit } = req.body;

    try {

        let user = await Habits.findOne({ uid });

        if (!user){
            await Habits.create({
                uid,
                habits: [habit]
            });
            return res.status(201).json({message: 'Habit schema created and was habit created.'})
        }

        user.habits.push(habit);
        await user.save();

        return res.status(200).json({message: 'Habit was created.'});


    } catch(e) {
        return res.status(500).json({message: 'Error sending habit.'});
    }

}

const fetchHabits = async(req, res) => {

    const { uid } = req.query;

    try {

        let user = await Habits.findOne({ uid });

        if (!user) {
            return res.status(200).json([]);
        }

        return res.status(200).json(user.habits);

    } catch(e){
       return res.status(500).json({message: 'Error retrieving habits.'}); 
    }

}

module.exports = {
  sendHabit,
  fetchHabits
};