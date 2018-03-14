CREATE TABLE sections (
  course_id   VARCHAR(10),
  section     NUMERIC,
  title       VARCHAR(50) NOT NULL,
  term        VARCHAR(3) NOT NULL,
  instructor  VARCHAR(50),
  inst_type   VARCHAR(10),
  registered  NUMERIC,
  cap         VARCHAR(50),
  credits     NUMERIC NOT NULL,
  PRIMARY KEY (course_id, section)
);

CREATE TABLE terms (
  term    VARCHAR(3),
  dates   VARCHAR(50),
  PRIMARY KEY term
);
