select * from emr_encounter
where patientid = $1
order by encounterdts asc;