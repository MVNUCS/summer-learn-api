Summer Learn API
===
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.com/esingletary/summer-learn-api.svg?token=dpZKQvZ35SThaa5qxMB1&branch=master)](https://travis-ci.com/esingletary/summer-learn-api)

Summer Learn API is the backend that powers Summer Learn Bot, a chatbot that can answer questions about the Summer Learn program at Mount Vernon Nazarene University. This project was created as a part of a class called Software and Systems Engineering. This backend can be adapted to any bot built using the Dialogflow platform, with some modifications (namely removing the Courses API).

How to run
---
1. Run `yarn` to download all of the dependencies
2. Add a `.env` file to the root directory for the environment variables. They're listed in `config/keys.js`
3. Add a file called `apikeys.json` and create a structure that mimics the example below

```
[
  {
  "owner": "",
  "key": ""
  }
]
```
4. Setup the database using MySQL with the included `setup.sql` file in the `sql` directory
5. Run with `node app`
