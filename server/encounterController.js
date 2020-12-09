module.exports = {

    getEncounters: async (req, res) => {
      const db= req.app.get('db'),
            {patientid} = req.params;

      db.encounter.get_encounters(patientid)

      .then(encounters => res.status(200).send(encounters))
      .catch(err => res.status(500).send(err));
    },

    newEncounter: (req, res) => {
      const db = req.app.get('db'),
            {patientid, encounterdts, weight_lbs, height_inch, systolic_bp, diastolic_bp, heart_rate, respirations_min, commenttxt} = req.body;

      db.encounter.new_encounter(patientid, encounterdts, weight_lbs, height_inch, systolic_bp, diastolic_bp, heart_rate, respirations_min, commenttxt)

      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
    }

}