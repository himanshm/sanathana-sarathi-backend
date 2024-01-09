import { mongoose } from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true,
  },
  subscriberName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    maxlength: [6, 'Pincode can not be more than 6 characters long!'],
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: [
      /^(?:(?:\+91|91|0)?[6789]\d{9})$/,
      'Please fill a valid phone number.',
    ],
    statusId: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    deliveryId: {
      type: String,
    },
    receiptId: {
      type: String,
    },
    paymentMode: {
      type: String,
    },
  },
});
const SubscriberData = mongoose.model('SubscriberData', subscriberSchema);
export default SubscriberData;
