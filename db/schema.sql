CREATE TABLE events
(
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category    VARCHAR(255),
    title       VARCHAR(255),
    description TEXT,
    location    VARCHAR(255),
    date        DATE,
    time        TIME,
    petsAllowed BOOLEAN,
    organizer   VARCHAR(255)
);