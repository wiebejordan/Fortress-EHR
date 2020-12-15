select * from emr_immunizations
where patientid = $1
order by createdts asc;