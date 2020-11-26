module.exports = {
  getPatients: (req, res) => {
    const db = req.app.get('db');

    db.patient.get_patients()

    .then(patients => res.status(200).send(patients))
    .catch(err => res.status(500).send(err));
  },

  getPatient: (req, res) => {
    const db = req.app.get('db'),
          {patientid} = req.params

    db.patient.get_patient(patientid)

    .then(patient => res.status(200).send(patient))
    .catch(err => res.status(500).send(err));
  }
}