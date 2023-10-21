import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import React from 'react'

const Item = (props: { item: { photo: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal } }) => {
  return (
        <Paper>
            <h2>{props.item.photo}</h2>

        </Paper>
  )
}

export default Item