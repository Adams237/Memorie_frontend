import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'

import useSyles from './style'


function Posts({ setCurrentId }) {
    const { posts, isLoading } = useSelector((state)=>state.posts)
    const classes = useSyles()


    if(!posts.length && !isLoading) return 'No posts'

  return (
    <>
        { isLoading ? <CircularProgress/>:(
          <Grid className={classes.container} container alignItems='stretch' spacing={3}>
            {posts.map((post)=>{
              return(
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={ setCurrentId }/>
                </Grid>
              )
            })}
          </Grid>
        )}
    </>
  )
}

export default Posts