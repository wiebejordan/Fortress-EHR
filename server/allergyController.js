module.exports = {

  getAllergies: (req, res) => {
    const db = req.app.get('db'),
          {patientid} = req.params;

    db.allergy.get_allergies(patientid)

    .then(allergies => res.status(200).send(allergies))
    .catch(err => res.status(500).send(err))
  },

  newAllergy: (req, res) => {
    const db = req.app.get('db'),
          {patientid, typedsc, allergydsc, severitydsc, reactiondsc} = req.body;

    db.allergy.new_allergy(patientid, typedsc, allergydsc, severitydsc, reactiondsc)

    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  }
}