CREATE DATABASE sla_test_db;

USE sla_test_db;

CREATE TABLE terms (
  term    VARCHAR(3),
  start_date  DATE,
  end_date  DATE,
  PRIMARY KEY (term)
);

INSERT INTO terms (term, start_date, end_date) VALUES
  ('A6', '2018-05-07', '2018-06-17'),
  ('A8', '2018-05-07', '2018-07-01'),
  ('B6', '2018-06-18', '2018-08-05'),
  ('B8', '2018-06-18', '2018-08-19'),
  ('C6', '2018-07-09', '2018-08-19');

CREATE TABLE sections (
  course_id   VARCHAR(10),
  section     NUMERIC,
  title       VARCHAR(50) NOT NULL,
  term        VARCHAR(3) NOT NULL,
  instructor  VARCHAR(50),
  inst_type   VARCHAR(10),
  registered  NUMERIC,
  cap         NUMERIC,
  credits     NUMERIC NOT NULL,
  PRIMARY KEY (course_id, section),
  FOREIGN KEY (term) REFERENCES terms(term)
);

CREATE TABLE fulfillment (
  intent  VARCHAR(50),
  fulfillmentText VARCHAR(500),
  fulfillmentError  VARCHAR(500),
  fulfillmentFunction NUMERIC,
  PRIMARY KEY (intent)
);

INSERT INTO fulfillment (intent, fulfillmentText, fulfillmentError, fulfillmentFunction) VALUES
  ('coursesOfferedDuringTerm', 'The courses are as follows: #@#', 'It seems that there are not any courses offered during that term.', 1),
  ('canSummerLearnCoursesBeTransferred', 'Yes. MVNU makes the process very simple to request a transcript once your grades are posted for the Summer Learn courses.', NULL, 0),
  ('whatIsTheCostPerCreditHour', 'The cost per credit hour is $200', NULL, 0);
