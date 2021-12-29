import app from './app'
import projects from './projects'
import students from './students'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
  app,
  projects,
  students,
})

export default allReducers
