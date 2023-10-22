import Paper from '@mui/material/Paper'
import React from 'react'

const Item = (props: any) => {
  return (
        <Paper>
            <h2>{props.item.photo}</h2>

        </Paper>
  )
}

export default Item