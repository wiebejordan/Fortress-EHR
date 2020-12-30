select * from emr_medications
where patientid = $1
order by effectivestartdts asc;