CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nick TEXT,
    nombre VARCHAR(40),
    apellidos VARCHAR(40),
    rol TEXT,
    email TEXT
);

INSERT INTO users (nick, nombre,apellidos,rol,email)
    VALUES ('Louis', 'Luis','Marin', 'Admin','luiizmc@gmail.com');

select * from users;