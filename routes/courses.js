'use strict'

const express = require('express')
const router = express.Router()

// const logger = require('../config')

const database = require('../data/database')

router.get('/', async (req, res, next) => {
  try {
    let courseInfo = await database.getAllCourses()
    res.json(courseInfo)
  } catch (err) {
    console.log(err)
    res.send({msg: `An error has occured`})
  }
})

module.exports = router
