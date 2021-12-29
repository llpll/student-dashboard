const projects = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return action.payload

    default:
      return state
  }
}

export default projects
