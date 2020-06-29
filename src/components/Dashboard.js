import React, {Component} from 'react';
import './Dashboard.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        margin:"10px",
        width: "250px"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 17,
        textAlign:"start",
        fontWeight: "bold"
    },
    secondText: {
        textAlign:"start"
    },
    sound: {
        width:"100%"
    },
    pos: {
        marginBottom: 12,
    },
});


const NotificationPanel = (props) => {
    const [notifications, setNotifications] = React.useState(props.notifs);

    return (
        <div id="notificationContainer">
            <h5>Systems Notifications:</h5>
            {notifications.map((user, index) => (
                <div>{notifications[index]}</div>
            ))}

        </div>
    )
}

const SoundCard = (props) => {
    const classes = useStyles();
    const [volume, setVolume] = React.useState(1);


    const handleChange = (event) => {
        setVolume(event.target.value);
        props.soundChanged(event.target.value);

    };

    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} >
                    Sound Quality
                </Typography>
                <Typography className={classes.secondText} >
                  Manually control the music quality in event of poor connection
                </Typography>
            </CardContent>
            <CardActions>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={volume}
                onChange={handleChange}
                className={classes.sound}
                >
                <MenuItem value={1}>Normal</MenuItem>
                <MenuItem value={2}>Low</MenuItem>
                <MenuItem value={3}>High</MenuItem>
            </Select>
            </CardActions>
        </Card>
    )
}

const MasterCard = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, val) => {
        setValue(val);
        props.masterChanged(val);
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography  className={classes.title} >
                    Master Volume
                </Typography>


                <Typography className={classes.secondText}>
                  Overrides all other sound settings in this application
                </Typography>
            </CardContent>
            <CardActions>
                <Slider
                    onChange={handleChange}
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                />

            </CardActions>
        </Card>
    )
}

const OnlineCard = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(  event.target.checked );
        props.onlineChanged(event.target.checked);
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} >
                    Online
                </Typography>
                <Typography className={classes.secondText} >
                  Is this application connected to the internet?
                </Typography>
            </CardContent>
            <CardActions>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />

            </CardActions>
        </Card>
    )
}

class Dashboard extends Component {
    constructor(props) {
        // Remember that if we "extend" a "class" of a "class" we have to call the "super()" method. Just pass it "props" as well.
        super(props);
        // class-based Components allow us to have "state"! And this is why/when we use class-based components.
        this.state = {
            notifications: ["","",""],
            online: true,
            master: 0,
            sound: 1,
        };
    }

    setOnline = (onlineState) => {
        this.state = {
            online: onlineState,
        };

        let text = "";
        if(!onlineState){
            text = "Your application is offline. You won't be able to share or stream music to other devices.";
        }

        this.setState(state => {
            const updatedList = this.state.notifications;
            updatedList[0] = text;
            return {
                notifications: updatedList
            };
        });
    }

    setMaster = (masterState) => {
        this.state = {
            master: masterState,
        };


        let text = "";
        if(masterState > 80){
            text = "Listening to music at a high volume could cause long-term hearing loss.";
        }

        this.setState(state => {
            const updatedList = this.state.notifications;
            updatedList[1] = text;

            return {
                notifications: updatedList
            };
        });
    }

    setSound = (soundState) => {
        this.state = {
            soundState: soundState,
        };

        let text = "";
        if(soundState === 2){
            text = "Music quality is degraded. Increase quality if your connection allows it.";
        }

        this.setState(state => {
            const updatedList = this.state.notifications;
            updatedList[2] = text;

            return {
                notifications: updatedList
            };
        });
    }


    render() {
        return (
            <div id="dashContainer">
                <h4>Welcome User!</h4>
                <div id="cardContainer">
                    <OnlineCard onlineChanged={this.setOnline} checked={this.state.online}></OnlineCard>
                    <MasterCard masterChanged={this.setMaster}></MasterCard>
                    <SoundCard soundChanged={this.setSound}></SoundCard>
                </div>
                <NotificationPanel notifs={this.state.notifications}></NotificationPanel>
            </div>
        );
    }
}

export default Dashboard;