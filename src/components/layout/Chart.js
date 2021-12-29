import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import Title from './Title'

// Generate Sales Data
const createData = (projects, studentsToShow = []) => {
  let data = []
  for (const [key, ratings] of Object.values(projects).entries()) {
    let projectName = ratings[0].course
    let sumFun = 0
    let sumDifficulty = 0

    let i = 0
    ratings.forEach((rating) => {
      i++
      if (studentsToShow.length > 0 && studentsToShow.includes(rating.name)) {
        sumFun += rating.funValue
        sumDifficulty += rating.difficultValue
      }
    })

    data.push({
      name: projectName,
      funValue: sumFun,
      funAvgValue: sumFun / i,
      difficultyValue: sumDifficulty,
      difficultyAvgValue: sumDifficulty / i,
    })
  }

  return data
}

const createDataStudent = (studentName, students) => {
  let data = []
  if (!students[studentName]) {
    return data
  }

  students[studentName].forEach((rating) => {
    data.push({
      name: rating.course,
      funValue: rating.funValue,
      difficultyValue: rating.difficultValue,
    })
  })

  return data
}

export default function Chart(props) {
  const theme = useTheme()

  let data = {}
  let avgChart = ''
  if (!props.studentName) {
    let studentsToShow = []
    for (const filterName of Object.keys(props.app.filters)) {
      if (filterName == 'showFun' || filterName == 'showDifficulty') {
        continue
      }

      if (props.app.filters[filterName]) {
        studentsToShow.push(filterName)
      }
    }
    if (studentsToShow.length == 0) {
      for (const name of Object.keys(props.students)) {
        studentsToShow.push(name)
      }
    }

    data = createData(props.projects, studentsToShow)

    avgChart = (
      <React.Fragment>
        <Title>Projects Averages</Title>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            {props.app.filters.showFun ? (
              <Line type='monotone' dataKey='funAvgValue' stroke='#8884d8' />
            ) : (
              ''
            )}
            {props.app.filters.showDifficulty ? (
              <Line
                type='monotone'
                dataKey='difficultyAvgValue'
                stroke='#82ca9d'
              />
            ) : (
              ''
            )}
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    )
  } else data = createDataStudent(props.studentName, props.students)

  return (
    <React.Fragment>
      <Title>Ratings</Title>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          {props.app.filters.showFun ? (
            <Bar dataKey='funValue' fill='#8884d8' />
          ) : (
            ''
          )}
          {props.app.filters.showDifficulty ? (
            <Bar dataKey='difficultyValue' fill='#82ca9d' />
          ) : (
            ''
          )}
        </BarChart>
      </ResponsiveContainer>
      {avgChart}
    </React.Fragment>
  )
}
