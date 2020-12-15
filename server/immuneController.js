module.exports= {
  
  getImmunes: async (req, res) => {
    const db= req.app.get('db'),
      {patientid} = req.params;

  db.immunization.get_immunizations(patientid)

  .then(immunes => res.status(200).send(immunes))
  .catch(err => res.status(500).send(err));
  }
  
}
