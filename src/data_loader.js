import Papa from 'papaparse'
import { useDispatch } from 'react-redux'
import { doneLoaded, loadProjects, loadStudents } from './components/actions'

const useDataLoader = (dataLoaded = true) => {
  const dispatch = useDispatch()

  if (dataLoaded) {
    return
  }

  const url =
    'https://raw.githubusercontent.com/llpll/student-dashboard/main/data.csv'

  let projects = {}
  let students = {}

  Papa.parse(url, {
    download: true,
    complete: function (results, file) {
      results.data.shift()
      for (const [
        studentName,
        course,
        funValue,
        difficultValue,
      ] of results.data) {
        // build projects
        if (!projects.hasOwnProperty(course)) {
          projects[course] = []
        }

        projects[course].push({
          name: studentName,
          course,
          funValue: parseInt(funValue),
          difficultValue: parseInt(difficultValue),
        })

        // build students
        if (!students.hasOwnProperty(studentName)) {
          students[studentName] = []
        }

        students[studentName].push({
          course,
          funValue: parseInt(funValue),
          difficultValue: parseInt(difficultValue),
        })
      }

      dispatch(doneLoaded())
      dispatch(loadProjects(projects))
      dispatch(loadStudents(students))
    },
  })
}

export { useDataLoader }
