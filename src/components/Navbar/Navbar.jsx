import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core'
import { useDispatch} from 'react-redux'
import decode from 'jwt-decode'
import useStyles from './styles'
import memories from '../../assets/images/memories.png'

function Navbar() {
    const history = useHistory()
    const location = useLocation()
    const dispach = useDispatch()
    const classes = useStyles()
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')))
    
    useEffect (()=>{
        const token = user?.token

        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setuser(JSON.parse(localStorage.getItem('profile')))
        // eslint-disable-next-line 
    },[location])
    const logout = ()=>{
        dispach({ type: 'LOGOUT' })

        history.push('/')
        setuser(null)
    }
  return (
    <AppBar className={classes.appBar} position='static' color='inherit' >
        <Link to='/' className={classes.brandContainer}>
            <Typography  className={classes.heading} variant='h2' align='center'>Memories</Typography>
            <img className={classes.image} src={memories} alt='memories' height="60"/>
        </Link>
        <Toolbar className={classes.toolbar}>
            { user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName}>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ): (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            ) }
        </Toolbar>
    </AppBar>
  )
}

export default Navbar