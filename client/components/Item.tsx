import Paper from '@mui/material/Paper'
import React, { useEffect } from 'react'

const Item = (props: { item: any }) => {
  useEffect(() => {
  }, [])
  return (
        <Paper>
            <img src={props.item.img_url} height="300" width="auto"/>
        </Paper>
  )
}

export default Item