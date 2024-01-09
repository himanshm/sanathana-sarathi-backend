import SubscriberData from '../models/subscriberModel.js';

const subscriberDataController = async (req, res) => {
  try {
    const newSubscriber = new SubscriberData(req.body);
    await newSubscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default subscriberDataController;