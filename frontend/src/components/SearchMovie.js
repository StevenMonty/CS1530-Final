import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';


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

const SearchMovie = () => {  
    const classes = useStyles();
  const [myOptions, setMyOptions] = useState([])
  const [movieName, setMovieName] = useState("");
  
  const getDataFromAPI = (event) => {
    console.log(movieName)
    event.preventDefault();
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=86c55e3a1810413caf10a4f40dc26944&language=en-US&query=${movieName}&page=1&include_adult=false`)
      .then(res => {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
            myOptions.push(res.data[i].employee_name)
        }
        setMyOptions(myOptions)
      })
  }
  
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Search Movie
      </Typography>
      <form className={classes.form} noValidate onSubmit={getDataFromAPI}>
        <TextField
            value={movieName}
            onInput={ e=>setMovieName(e.target.value)}
            variant="outlined"
            label="Search Box"
            />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            Submit
        </Button>  
      </form>
    </div>
    <Box mt={8}>
    </Box>
  </Container>
  );
}
  
export default SearchMovie