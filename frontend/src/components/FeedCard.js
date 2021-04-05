import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    marginTop: "50px",
    marginBottom: "50px",
  },
  media: {
    height: 600,
    display:"flex",
    justifyContent: "center",
  },
});

const FeedCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardHeader
        avatar={
          <Avatar aria-label="Kenan Rustamov" className={classes.avatar}>
            KR
          </Avatar>
        }
        title="User's Name"
        subheader="September 14, 2016"
      />
        <CardMedia
          className={classes.media}
          title="Movie Poster"
        ><img src={require("../images/budapestHotel.jpg")} alt="recipe thumbnail"/></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Media Title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Description for the media/description made by user
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default FeedCard