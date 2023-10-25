import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import React from 'react'

const Item = (props: { item: any }) => {
  return (
        <Paper>
            <h2>{props.item.photo}</h2>
            <img src={props.item.img_url} height="300" width="auto"/>
        </Paper>
  )
}

export default Item