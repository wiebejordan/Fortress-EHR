insert into emr_encounter (
  patientid, encounterdts, weight_lbs, height_inch, systolic_bp, diastolic_bp, heart_rate, respirations_min, commenttxt
) values (
  $1, $2, $3, $4, $5, $6, $7, $8, $9
)

