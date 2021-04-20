import React from 'react';
import FeedCard from "./FeedCard.js"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    base: {
        marginTop: "50px",
        marginRight:'auto',
        marginLeft: 'auto',
        maxWidth: 600,
    },
  });

const Feed = (props) => {
    const classes = useStyles();
    console.log(`logged in ${props.loggedIn}`)

    return (
        <div className={classes.base}>
            <FeedCard/>
            <FeedCard/>
        </div>
    )
}
export default Feed