import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import useSyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import imageCompression from 'browser-image-compression'; 

import { createPost, updatePost } from '../../actions/posts'
function Form({ currentId, setCurrentId }) {
    const dispach = useDispatch()
    const history = useHistory()
    const post = useSelector((state)=>currentId ? state.posts.posts.find((p)=>p._id === currentId): null)
    const [postData, setPostData] = useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    })

    const classes = useSyles()
    const user = JSON.parse(localStorage.getItem('profile'))
    useEffect(()=>{
        if(post) setPostData(post)
    },[post])
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(postData.selectedFile);
        if(currentId){
            dispach(updatePost(currentId, {...postData, name: user?.result?.name}))
            clear()
        }else{
            console.log('ici');
             dispach(createPost({...postData, name: user?.result?.name}, history))
             clear()
        }

       
       
    }
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    please create sign in for create a memories or like the post
                </Typography>

            </Paper>
        )
    }
    const compressImags = async function(event){
        console.log(event.target.files[0]);
        const imageFile = event.target.files[0]
        const option = {
            maxSizeMB:0.05,
            maxWidthOrHeight:1000
        }
        try {
            const compressedFile = await imageCompression(imageFile, option)
            var reader = new FileReader()
            reader.readAsDataURL(compressedFile)
            reader.onload = () =>{
                console.log(reader.result);
                setPostData({...postData,selectedFile: reader.result})
            }
            reader.onerror = error => {
                console.log("Error: ", error);
              };
        } catch (error) {
                console.log(error);
        }   
    }
    const clear =()=>{
        setCurrentId(null)
        setPostData({
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        })
    }
  return (
    <Paper className={classes.paper} elevation={6} >
        <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant='h6' >
                { currentId ? ('editing memorie'):('creating memorie') }
            </Typography>
            <TextField 
            name='title' 
            variant='outlined' 
            label='Title' 
            fullWidth
            value={postData.title}
            onChange={(e)=>setPostData({...postData,title: e.target.value})}
            />
            <TextField 
            name='message' 
            variant='outlined' 
            label='Message' 
            fullWidth
            value={postData.message}
            onChange={(e)=>setPostData({...postData,message: e.target.value})}
            />
            <TextField 
            name='tags' 
            variant='outlined' 
            label='Tags' 
            fullWidth
            value={postData.tags}
            onChange={(e)=>setPostData({...postData,tags: e.target.value.split(',')})}
            />
            <div className={classes.fileInput}>
                <input
                    type="file"
                    accept='image/*'
                    // onDone = {({base64})=>setPostData({...postData,selectedFile: base64})}
                    onChange={(e) => { compressImags(e) }}
                />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color='primary' size='large' type='submit' fullWidth>Submit</Button>
            <Button  variant="contained" color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
        </form>
    </Paper>
  )
}

export default Form