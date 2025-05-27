const Feedback = require('../models/Feedback.js');

const sendFeedback = async (req, res) => {

    const { uid, feedbackText, subject } = req.body;

    try {

        let user = await Feedback.findOne({ uid });

        if (!user){
            await Feedback.create({
                uid,
                feedbackItem: [{subject, feedback: feedbackText, date: new Date()}]
            })

            return res.status(201).json({message: `Feedback data for user ${uid} created and feedback successfully sent`});
        }

        user.feedbackItem.push({subject, feedback: feedbackText, date: new Date()});

        await user.save();

        return res.status(200).json({message: 'Feedback successfully sent'});

    } catch(e) {
        return res.status(500).json({message: 'Error sending feedback'});
    }

}

module.exports = {
  sendFeedback
};