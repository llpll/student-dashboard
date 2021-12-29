export const doneLoaded = () => {
  return {
    type: 'DATA_LOADED',
  }
}

export const loadProjects = (projects) => {
  return {
    type: 'LOAD_PROJECTS',
    payload: projects,
  }
}

export const loadStudents = (students) => {
  return {
    type: 'LOAD_STUDENTS',
    payload: students,
  }
}

export const changeFilters = (filters) => {
  return {
    type: 'CHANGE_FILTERS',
    payload: filters,
  }
}
