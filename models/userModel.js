import mongoose, { trusted } from 'mongoose';
import bcrypt, { hash } from 'bcrypt';

const userSchema = new mongoose.Schema({
  userFullName: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// This is a Mongoose pre-save hook. The code inside this function will run before a User document is saved to the MongoDB database.
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  // checks if the password field has been modified. If it hasn't, it calls next() to skip to the next middleware or save the document without hashing the password again.
  // Hash the password using bcrypt. this.password is the plain text password, 10 is the number of salt rounds (a measure of how secure the hash is), and the callback function handles the result.
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err); // if an error occurs during hashing, it passes the error to the next middleware.
    this.password = hash; // If hashing is successful, this line replaces the plain text password with the hashed password.
    next(); // Calls the next middleware, which would typically be the saving of the document to the database.
  });
});

const UserData = mongoose.model('UserData', userSchema);

export default UserData;
