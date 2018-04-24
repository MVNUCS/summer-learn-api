'use strict'

module.exports = {
  insertCourseInfo: `
    REPLACE INTO sections (course_id, section, title, term, instructor, inst_type, registered, cap, credits)
    VALUES ?
  `,
  getAllCourses: `
    SELECT *
    FROM sections
    ORDER BY course_id, section ASC
  `,
  getCourse: `
    SELECT *
    FROM sections
    WHERE course_id = ? AND section = ?
  `,
  getAllSectionsOfCourse: `
    SELECT *
    FROM sections
    WHERE course_id = ?
    ORDER BY course_id, section ASC
  `,
  getCoursesByTerm: `
    SELECT *
    FROM sections
    WHERE term = ?
    ORDER BY course_id, section ASC
  `,
  getAllTerms: `
    SELECT *
    FROM terms
    ORDER BY term ASC
  `,
  getTerm: `
    SELECT *
    FROM terms
    WHERE term = ?
  `,
  getIntent: `
    SELECT *
    FROM fulfillment
    WHERE intent = ?
  `
}
