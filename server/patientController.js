module.exports = {
  getPatients: async (req, res) => {
    const db = req.app.get('db');

    db.patient.get_patients()

    .then(patients => res.status(200).send(patients))
    .catch(err => res.status(500).send(err));
  },

  getPatient: async (req, res) => {
    const db = req.app.get('db'),
          {patientid} = req.params

    db.patient.get_patient(patientid)

    .then(patient => res.status(200).send(patient))
    .catch(err => res.status(500).send(err));
  },

  newPatient: (req, res) => {
    const db = req.app.get('db'),
          {activeflg, birthdts, ethnicitydsc, firstnm, genderdsc, hispanicflg, lastnm, race01dsc, race02dsc, race03dsc} = req.body;

    db.patient.new_patient(activeflg, birthdts, ethnicitydsc, firstnm, genderdsc, hispanicflg, lastnm, race01dsc, race02dsc, race03dsc)

    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  },

  editHistory: (req, res) => {
    const {patientid} = req.params,
          {history} = req.body,
          db = req.app.get('db');

    db.patient.edit_history({patientid, history})
      .then(() => res.status(200).send('history updated!'))
      .catch(err => res.status(500).send(err))
  }
}