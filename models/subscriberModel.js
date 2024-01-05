import { mongoose } from 'mongoose';

const subscriberDataSchema = new mongoose.Schema({
  subscriberName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});
const SubscriberData = mongoose.model('SubscriberData', subscriberDataSchema);
export default SubscriberData
