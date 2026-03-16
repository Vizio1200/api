CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO
    usuarios (usuario, password)
VALUES ('elian', '1234'),
    ('freddy', 'abcd'),
    ('admin', 'admin123'),
    ('test', 'test123');

CREATE TABLE guitarras (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL
);

INSERT INTO
    guitarras (marca, modelo, precio)
VALUES (
        'Fender',
        'Stratocaster',
        15000
    ),
    ('Gibson', 'Les Paul', 22000),
    ('Ibanez', 'RG', 12000),
    ('Yamaha', 'Pacifica', 8000);