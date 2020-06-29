import React, {Component} from 'react';
import './Login.css';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));



const StyledButton = withStyles({
    root: {
        margin: '5px',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);


const FormPanel = (props) => {
    const classes = useStyles();


    const clickedButton = ()=>{
        props.buttonClick(true);
    }

    return (
        <div id="container">
            <form id="formContainer"  className={classes.root} noValidate autoComplete="off">
                <TextField id="email" label="Username*"/>
                <TextField id="password" label="Password*"/>
            </form>
            <StyledButton onClick={clickedButton} variant="contained" color="primary">
                LOGIN
            </StyledButton>
        </div>
    )
}



class Login extends Component {

    constructor(props) {
        // Remember that if we "extend" a "class" of a "class" we have to call the "super()" method. Just pass it "props" as well.
        super(props);
        // class-based Components allow us to have "state"! And this is why/when we use class-based components.
        this.state = {
            isLoggedIn: false,
        };
    }

    sendBackData = (clicked) => {
        this.props.loginCallback(clicked);
    }




    render() {
        return (
            <FormPanel buttonClick={this.sendBackData}></FormPanel>
        );
    }
}

export default Login;