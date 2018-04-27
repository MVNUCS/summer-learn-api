CREATE DATABASE sla_dev;

USE sla_dev;

CREATE TABLE terms (
  term    VARCHAR(3),
  start_date  DATE,
  end_date  DATE,
  deadline  VARCHAR(50),
  PRIMARY KEY (term)
);

INSERT INTO terms (term, start_date, end_date, deadline) VALUES
  ('A6', '2018-05-07', '2018-06-17', 'April 23rd'),
  ('A8', '2018-05-07', '2018-07-01', 'April 23rd'),
  ('B6', '2018-06-18', '2018-08-05', 'June 11th'),
  ('B8', '2018-06-18', '2018-08-19', 'June 11th'),
  ('C6', '2018-07-09', '2018-08-19', 'July 2nd');

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
  ('whatIsTheCostPerCreditHour', 'The cost per credit hour is $200', NULL, 0),
  ('whenIsTheRegistrationDeadline', 'The registration deadline for that term is  #@#', 'It seems that there is not a registration deadline for that term!', 1),
  ('learnAboutSummerLearn', 'I can help answer any questions you might have about summer learn. A few examples might be: "How do I register for summer learn", or "What classes are offered this summer?", or "What is the cost per credit hour?"', NULL, 0),
  ('whatCoursesAreOffered', 'Summer Learn offers a wide variety of courses, including popular ones like Narrative of Scripture, Western Tradition, Science and the Modern Mind, and Christian Beliefs. Would you like to hear the complete list?', NULL, 0),
  ('completeListOfCoursesOffered', 'There are a lot of courses! Here they are along with the terms they are offered in. #@#. Whew!', 'Uh oh, it looks like we encountered an issue on our end. Please try again later.', 1),
  ('whatAreTheTermDates', 'They are as follows: #@#', 'Uh oh, it looks like we encountered an issue on our end. Please try again later.', 1),
  ('whatDoesSummerLearnCost', 'Summer Learn is a great opportunity for savings. The cost per credit hour is only $200. This is less than half the price of credit hours for fall or spring semester, making these classes an ideal way to earn your degree faster and save money.', NULL, 0),
  ('howToRegisterForCourses', 'Registration is a simple process. Select the Register Now button on the main page and you can pay immediately with a credit card or pay later via one of the other methods listed. Bear in mind that courses fill quickly and that your spot is not held until you pay!', NULL, 0),
  ('canYouLiveOnCampusDuringSummerLearn', 'Yes, if you are a current MVNU student. Summer weekly rates and daily housing rates are available on the Summer Learn website at mvnu.edu/summerlearn', NULL, 0),
  ('doYouNeedInternetAccess', 'Summer Learn courses are designed with flexibility in mind. However, the majority of courses require that you contribute or provide active engagement online two-three times a week during the scheduled term.', NULL, 0),
  ('whoIsSummerLearnFor', 'Summer Learn is great for freshmen who want a head start, athletes who need extra time during busy seasons, students who wish to graduate early, or even students who just want to save money on general education credits!', NULL, 0),
  ('whatIsSummerLearn', 'Summer Learn is a program that provides competitively priced online summer courses for bright traditional undergraduate students.', NULL, 0),
  ('whenIsTheDeadlineToDropCourses', 'Courses can be dropped before they start or within 3 days of the start date to receive a full refund and no academic record. If you do it after that, you will not receive a refund and will receive a grade of W.', NULL, 0);
