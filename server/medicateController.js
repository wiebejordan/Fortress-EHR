module.exports = {

  getMedications: (req, res) => {
    const db = req.app.get('db'),
          {patientid} = req.params;

  db.medications.get_medications(patientid)

  .then(medication => res.status(200).send(medication))
  .catch(err => res.status(500).send(err))
  },

  newMedication: (req, res) => {
    const db = req.app.get('db'),
          {patientid, medicationnm, medicationdsc, routedsc, effectivestartdts, effectiveenddts} = req.body;
    
    db.medications.new_medication(patientid, medicationnm, medicationdsc, routedsc, effectivestartdts, effectiveenddts)

    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  }
}