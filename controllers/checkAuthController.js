const checkAuthController = async (req, res) => {
  if (req.session.user) {
    // This line checks if there's a user object in the req.session. The req.session object is where session data is stored (provided by the session middleware you're using in Express). This condition essentially checks if the user is logged in (i.e., a session exists for the user).
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
};

export default checkAuthController;
