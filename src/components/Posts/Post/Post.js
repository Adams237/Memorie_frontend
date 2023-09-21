import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useSyles from './style'
import { deletePost, likePost } from '../../../actions/posts'

function Post({ post, setCurrentId }) {
  const classes = useSyles()
  const dispach = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const history = useHistory()
  const [likes, setLikes] = useState(post?.likes)

 
  const userId = user?.result?.googleId || user?.result?._id
  const hasLikedPost = post.likes.find((like) => like === userId)


  const handleClick = ()=>{
    dispach(likePost(post._id))
    if (hasLikedPost){
      setLikes(post.likes.filter((id)=> id !== userId))
    }else{
      setLikes([...post.likes, userId])
    }
  }

  const Like = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ?
        (
          <><ThumbUpAltIcon fontSize='small' /> &nbsp;  {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltIcon fontSize='small' /> &nbsp;   {likes.length} {likes.length === 1 ? 'Like' : 'Likes'} </>
        )
    }
    return <><ThumbUpAltIcon fontSize='small' />  &nbsp;  Like</>
  }
  const openPost = () => history.push(`/posts/${ post._id }`)
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={ classes.cardAction } onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button
              style={{ color: 'white' }}
              size='small'
              onClick={(e) => {
                e.stopPropagation()
                setCurrentId(post._id)
              }}
            >
              <MoreHorizIcon fontSize='medium' />
            </Button>
          )}

        </div>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag}`)}</Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component="p">{post.message}</Typography>
        </CardContent>
        </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={handleClick}>
          <Like />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispach(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}

      </CardActions>
    </Card>
  )
}

export default Post