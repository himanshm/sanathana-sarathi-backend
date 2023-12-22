import { mongoose } from 'mongoose';

const subscriberSchema = new mongoose.Schema({
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
const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber
