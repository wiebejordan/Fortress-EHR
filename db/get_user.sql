select u.username, u.canedit from emr_users u
where
u.user_id = $1; 