import { List, ListItem, ListItemText, Link, Typography } from '@mui/material'

export default function Students(props) {
  const list = []
  for (const [name] of Object.entries(props.students)) {
    list.push(
      <ListItem button key={name}>
        <Link href={name}>{name}</Link>
      </ListItem>
    )
  }
  return (
    <List>
      <Typography
        component='h2'
        variant='h6'
        color='inherit'
        noWrap
        sx={{ flexGrow: 1 }}
      >
        Contributing students
      </Typography>
      {list}
    </List>
  )
}
