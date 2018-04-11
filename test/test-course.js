'use strict'

/* global describe it */
require('dotenv').config()
const expect = require('chai').expect
const Course = require('../controllers/course')

const testObject = new Course('SCI-3012', 1, 'Science and the Modern Mind', 'A6', 'P. Madtes', 2)

const testSection = [new Course('SCI-3012', 1, 'Science and the Modern Mind', 'A6', 'P. Madtes', 2),
  new Course('SCI-3012', 2, 'Science and the Modern Mind', 'B6', 'P. Madtes', 2),
  new Course('SCI-3012', 3, 'Science and the Modern Mind', 'C6', 'P. Madtes', 2)]

describe('getCourse()', () => {
  it('should return the correct course if given a valid courseId and sectionId', async () => {
    expect(await Course.getCourse('SCI-3012', '1')).to.deep.equal(testObject)
  })

  it('should return all sections of a course if given just a courseId', async () => {
    expect(await Course.getCourse('SCI-3012')).to.have.deep.members(testSection)
  })

  it('should return an empty set if given an unknown courseId', async () => {
    expect(await Course.getCourse('invalid')).to.have.lengthOf(0)
  })
})
