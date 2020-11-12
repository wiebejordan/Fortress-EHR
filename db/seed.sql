create table if not exists EMR_users (
    user_id serial primary key,
    username varchar(20),
    password text,
    canEdit boolean
);