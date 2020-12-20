module.exports= {
  
  getImmunes: async (req, res) => {
    const db= req.app.get('db'),
      {patientid} = req.params;

  db.immunization.get_immunizations(patientid)

  .then(immunes => res.status(200).send(immunes))
  .catch(err => res.status(500).send(err));
  },

  newImmune: (req, res) => {
    const db = req.app.get('db'),
      {patientid, createdts, immunizationtypedsc, routedsc} = req.body;

    db.immunization.new_immunization(patientid, createdts, immunizationtypedsc, routedsc)

    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  }
  
}
