import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { changeFilters } from './actions'

export default function FormFilter(props) {
  const dispatch = useDispatch()
  const [state, setState] = React.useState({
    ...props.app.filters,
  })

  const handleChange = (event) => {
    const newState = {
      ...state,
      [event.target.name]: event.target.checked,
    }
    setState(newState)

    dispatch(changeFilters(newState))
  }

  let students = []
  for (const [name] of Object.entries(props.students)) {
    students.push(
      <FormControlLabel
        control={<Checkbox />}
        label={name}
        key={name}
        name={name}
        onChange={handleChange}
      />
    )
  }

  const { showFun, showDifficulty } = state
  return (
    <div>
      <FormGroup>
        <FormLabel component='legend'>Choose ratings to show</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={showFun}
              onChange={handleChange}
              name='showFun'
            />
          }
          label='Show Fun'
        />
        <FormControlLabel
          control={<Checkbox checked={showDifficulty} />}
          onChange={handleChange}
          label='Show Difficulty'
          name='showDifficulty'
        />
        <FormLabel component='legend'>Show data only from</FormLabel>
        {students}
      </FormGroup>
    </div>
  )
}
