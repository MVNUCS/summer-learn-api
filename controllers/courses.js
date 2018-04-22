'use strict'

const database = require('../services/database')
const Course = require('../models/Course')

class Courses {
  /**
   * Get all courses
   * @return {Array.Course} An array of courses in the cache
   */
  static async getAllCourses () {
    try {
      let courseInfo = await database.getAllCourses()
      if (courseInfo.length === 0 || typeof courseInfo === 'undefined') {
        return {msg: `The request did not return any results`}
      } else {
        let courses = courseInfo.map(e => new Course(e.course_id, e.section, e.title, e.term, e.instructor, e.credits))
        return courses
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Get all courses with the specified courseId and sectionId
   * @param {string} courseId The ID of the course requested
   * @param {string} [sectionId] The ID of the section of the course requested
   * @return {Array.Course} An array of courses with the specified courseId and sectionId
   */
  static async getCourse (courseId, sectionId) {
    if (sectionId === undefined) {
      try {
        let courseInfo = await database.getAllSectionsOfCourse(courseId)
        if (courseInfo.length === 0 || typeof courseInfo === 'undefined') {
          return {msg: `The request did not return any results`}
        }
        let courses = courseInfo.map(e => new Course(e.course_id, e.section, e.title, e.term, e.instructor, e.registered, e.cap, e.credits))
        return courses
      } catch (error) {
        throw error
      }
    } else {
      try {
        let courseInfo = await database.getCourse(courseId, sectionId)
        if (courseInfo.length === 0 || typeof courseInfo === 'undefined') {
          return {msg: `The request did not return any results`}
        }
        return new Course(courseInfo[0].course_id, courseInfo[0].section, courseInfo[0].title, courseInfo[0].term, courseInfo[0].instructor, courseInfo[0].registered, courseInfo[0].cap, courseInfo[0].credits)
      } catch (error) {
        throw error
      }
    }
  }

  /**
   * Get all courses offered in the specified term
   * @param {string} term The ID of the term requested
   * @return {Array.Course} An array of courses offered in the specified term
   */
  static async getCoursesByTerm (term) {
    try {
      let courseInfo = await database.getCoursesByTerm(term)
      if (courseInfo.length === 0 || typeof courseInfo === 'undefined') {
        return {msg: `The request did not return any results`}
      } else {
        let courses = courseInfo.map(e => new Course(e.course_id, e.section, e.title, e.term, e.instructor, e.registered, e.cap, e.credits))
        return courses
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = Courses
