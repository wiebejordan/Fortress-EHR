module.exports = {

    getEncounters: async (req, res) => {
      const db= req.app.get('db'),
            {patientid} = req.params;

      db.encounter.get_encounters(patientid)

      .then(encounters => res.status(200).send(encounters))
      .catch(err => res.status(500).send(err));
    }

}