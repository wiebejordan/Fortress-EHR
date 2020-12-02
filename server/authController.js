const bcrypt = require('bcryptjs');

module.exports = {
  login: async (req, res) => {
    const {email, password} = req.body,
          db = req.app.get('db');

    const foundUser = await db.user.check_user({email});
    if(!foundUser[0]){
      return res.status(400).send('Username does not exist');
    }

    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
      if(!authenticated){
        return res.status(401).send('Password incorrect')
      }

    // if(password !== foundUser[0].password){
    //   return res.status(401).send('Password incorrect')
    // }

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

  newUser: async (req, res) => {
    const db = req.app.get('db'),
          {firstnm, lastnm, email, password, canedit} = req.body; 

    const foundUser = await db.user.check_user({email});
    if(foundUser[0]){
      return res.status(400).send('Username already exists.')
    }

    let salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(password, salt);

        const newUser = await db.user.new_user({password: hash, canedit, firstnm, lastnm, email});
        req.session.userid = newUser[0];
        res.status(201).send(req.session.userid)
  },

  newUserAdmin: async (req, res) => {
    const db = req.app.get('db'),
          {firstnm, lastnm, email, password, canedit, adminPass} = req.body; 

          const foundUser = await db.user.check_user({email});
          if(foundUser[0]){
            return res.status(400).send('User with that email already exists.')
          }

          let salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(password, salt);

    if(adminPass === '12345'){
      const newUser = await db.user.new_user({firstnm, lastnm, email, password: hash, canedit});
      req.session.userid = newUser[0];
      res.status(201).send(req.session.userid)

    }
  }
}