import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import UserData from '../models/userModel.js';

const authUserController = async (req, res) => {
  // Extract data from the request body. This is typically data sent by the client during the login process.
  const { username, password } = req.body;
  console.log(req.body);

  try {
    // Asynchronously searches the database for a user with the provided username. The await keyword pauses execution until the promise is resolved.
    const user = await UserData.findOne({ username });
    if (!user) return res.status(401).send('Authentication Failed!');

    // Uses bcrypt to compare the provided password with the hashed password stored in the database.
    const match = await bcrypt.compare(password, user.password);
    // if (!match) return res.status(401).send('Authentication Failed!');
    if (match) {
      req.session.user = { id: user._id, username: user.username };
      res.status(200).send('Logged In Successfully!');
    } else return res.status(401).send('Authentication Failed!');

    // Return a jwt Token in the future after successful authentication
    // const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });
    // res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default authUserController;
