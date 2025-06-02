const Habits = require('../models/Habits.js');

function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

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

const fetchHabits = async (req, res) => {
  const { uid, day } = req.query;

  try {
    let user = await Habits.findOne({ uid });

    if (!user) {
      return res.status(200).json([]);
    }

    const rel = user.habits.filter(
      (habit) => habit.availability === day || habit.availability === 'Day'
    );

    return res.status(200).json(rel);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error retrieving habits.' });
  }
};


const recordHabit = async(req, res) => {

    const { uid, hid, habitDetails } = req.body;

    try {

        let user = await Habits.findOne({ uid });

        if (!user) {
            return res.status(500).json({error: 'Could not find user Habit Schema.'});
        }

        const rel = user.habits.find((habit) => habit._id == hid);

        if (!rel){
            return res.status(500).json({message: 'Error finding habit.'});
        }

        const relHabitLog = rel.habit_logs.find((log) => isSameDay(log.date, new Date()));

        if (!relHabitLog){
            rel.habit_logs.push({date: new Date(), amount_completed: habitDetails.amount_completed});
        } else {
            relHabitLog.amount_completed = habitDetails.amount_completed;
        }

        if (habitDetails.amount_completed === rel.amount_required){
            rel.num_claimed += 1;
        }

        await user.save();

        return res.status(200).json({message: 'Habit successfully recorded.'});

    } catch(e){
        return res.status(500).json({message: 'Error recording habits.'}); 
    }

}

const deleteHabit = async (req, res) => {
  const { uid, hid } = req.body;

  try {
    let user = await Habits.findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: "User Habit schema not found." });
    }

    const habitIndex = user.habits.findIndex(habit => habit._id == hid);

    if (habitIndex === -1) {
      return res.status(404).json({ message: 'Habit not found.' });
    }

    user.habits.splice(habitIndex, 1);

    await user.save();

    return res.status(200).json({ message: "Habit successfully deleted." });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error deleting habit." });
  }
};


module.exports = { deleteHabit };


module.exports = {
  sendHabit,
  fetchHabits,
  recordHabit,
  deleteHabit
};