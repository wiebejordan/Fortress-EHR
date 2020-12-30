insert into emr_medications (
  patientid, medicationnm, medicationdsc, routedsc, effectivestartdts, effectiveenddts
)
values (
  $1, $2, $3, $4, $5, $6
)