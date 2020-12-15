select * from emr_allergy
where patientid = $1
order by createdts asc;