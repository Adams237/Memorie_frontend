import React, { useState } from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { gapi } from 'gapi-script'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import Input from './Input'
import Icon from './icon'
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName:'', email:'', password:'', confirmPasswor:'' }
function Auth() {
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const[formData, setFormData] = useState(initialState)
    const dispach = useDispatch()
    const history = useHistory()

    const handleSubmit = (e)=>{
        e.preventDefault()
       if(isSignup){
            dispach(signup(formData, history))
       }else{
            dispach(signin(formData, history))
       }
    }
    const handleChange =(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleShowPassword = ()=>{
        setShowPassword(!showPassword)
    }
    const swichtMode = () =>{
        setIsSignup(!isSignup)
        console.log(isSignup);
    }
    window.gapi.load('client:auth2', ()=>{
        window.gapi.client.init({
            clientId: "636963187326-sshc5646ulqo2o4m4c5srktqatuqbprs.apps.googleusercontent.com",
            plugin_name : "socialmedia"
        })
    })
    const googleSucces = async (res)=>{
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispach({ type:'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure=(error)=>{
        console.log(error);
        console.log("Google sign In was not successful. try again");
    }
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>{ isSignup ? 'Sign Up' : 'Sign In' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )
                    }
                    <Input name='email' label="Email Adress" handleChange={handleChange} type="email" />
                    <Input name='password' label="Password" handleChange={handleChange} type={ showPassword ? 'text' : "password" } handleShowPassword={handleShowPassword}  />
                    { isSignup &&  <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type={ showPassword ? 'text' : "password" } handleShowPassword={handleShowPassword}  />}
                </Grid> 
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin 
                        clientId='636963187326-sshc5646ulqo2o4m4c5srktqatuqbprs.apps.googleusercontent.com'
                        render={(renderProps)=>(
                            <Button 
                            className={ classes.googleButton } 
                            color='primary' 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disable = {renderProps.disable} 
                            startIcon={<Icon/>} 
                            variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSucces}
                        onFailure={googleFailure}
                        cookiePolicy = "single_host_origin"
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={swichtMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account Sign up" }
                            </Button>
                        </Grid>
                    </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth