// const bcrypt = require('bcryptjs');

module.exports = {
  login: async (req, res) => {
    const {username, password} = req.body,
          db = req.app.get('db');

    const foundUser = await db.user.check_user({username});
    if(!foundUser[0]){
      return res.status(400).send('Username does not exist');
    }

    // const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    //   if(!authenticated){
    //     return res.status(401).send('Password incorrect')
    //   }

    if(password !== foundUser[0].password){
      return res.status(401).send('Password incorrect')
    }

    delete foundUser[0].password;
    req.session.userid = foundUser[0];
    res.status(202).send(req.session.userid);
    console.log(req.session.userid)
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
    console.log('logged out!')
  },

  keepUser: (req, res) => {
    const db = req.app.get('db');
        

    db.user.get_user(req.session.userid)

    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
    // console.log(req.session.userid)
  },

  newUser: (req, res) => {
    const db = req.app.get('db'),
          {firstnm, lastnm, email, password, canedit} = req.body; 


    db.user.new_user(firstnm, lastnm, email, password, canedit)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
  }
}