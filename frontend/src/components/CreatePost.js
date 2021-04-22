import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import { ADD_RATING, PLACEHOLDER, GET_TOKEN } from "../constants";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreatePost() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [movieId, setMovieId] = useState(0);
  let history = useHistory();

  function postMovie() {
    let req = {
        media_id: movieId,
        rating: value
    }
    history.push("/home")
    axios.post(ADD_RATING,(req))
        .then(res => console.log(JSON.stringify(res)));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Make Post
        </Typography>
        <form className={classes.form} noValidate onSubmit={postMovie}>
          <TextField
            variant="outlined"
            margin="normal"
            value={movieId}
            onInput={ e=>setMovieId(e.target.value)}
            required
            fullWidth
            id="id"
            label="Movie ID"
            name="movieID"
            autoComplete="Movie ID"
          />
          <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Your Rating:</Typography>
                <Rating
                name="controlledStars"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                />
            </Box>
          </div>  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Post Media
          </Button>      
    </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}