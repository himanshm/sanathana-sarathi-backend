import UserData from '../models/userModel.js';

const initialiseAdminUser = async () => {
  try {
    const exists = await UserData.findOne({ username: 'himanshu' });
    if (!exists) {
      const adminUser = new UserData({
        userFullName: 'Himanshu Mishra',
        userPhone: '9853001199',
        username: 'himanshu',
        password: process.env.ADMIN_PASSWORD || 'Himansh@1199',
      });
        await adminUser.save();
    }
  } catch (error) {
      console.error('Failed to initialise admin user: ', error);
  }
};

export default initialiseAdminUser;