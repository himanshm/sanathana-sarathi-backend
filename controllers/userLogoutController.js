const userLogoutController = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Could not logout. Please try again!');
    } else {
      res.send('Logged out successfully.');
    }
  });
};

export default userLogoutController;