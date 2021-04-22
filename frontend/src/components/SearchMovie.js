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
import { DataGrid } from '@material-ui/data-grid';
import { ADD_FRIEND, SEARCH, PLACEHOLDER } from "../constants";

const columns = [
  { field: 'id', headerName: 'Movie ID', width: 200 },
  { field: 'title', headerName: 'Movie Title', width: 700 },
  { field: 'rating', headerName: 'Rating', width: 300 },
];

const rows = [
  {id:1, movieTitle: "The King", rating: 5 ,},
  {id:2, movieTitle: "King Kong", rating: 5 ,},
  {id:3, movieTitle: "Godzilla: King of the Monsters", rating: 5 ,},
  {id:4, movieTitle: "The Lion King", rating: 5 ,},
  {id:5, movieTitle: "Outlaw King", rating: 5 ,},
  {id:6, movieTitle: "King Kong vs. Godzilla", rating: 5 ,},
  {id:7, movieTitle: "King Kong", rating: 5 ,},
  {id:8, movieTitle: "The Lion King 1½", rating: 5 ,},
  {id:9, movieTitle: "King of Staten Island", rating: 5 ,},
];

const addFriend = (username) => {
    console.log('add friend called, event:')
    console.log(username)
    axios.post(ADD_FRIEND.replace(PLACEHOLDER, username))
}

const userColumns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'username', headerName: 'User Name', width: 180 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('first_name') || ''} ${params.getValue('last_name') || ''}`,
  },

  { field: 'email', headerName: 'Email', width: 180 },
  { field: 'lib_size', headerName: 'Library Size', width: 150 },
  { field: 'friend_count', headerName: 'Friends', width: 150 },
    {
        field: '',
        headerName: 'Add Friend',
        valueGetter: (params) => {
          params.getValue('username')
        },
        renderCell: () => (
          <button onClick={event => addFriend("montalbano")}>
            Send Request
          </button>
        ),
         width: 180
    },

];

const userRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', username: "Test123"},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', username: "Test123"},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', username: "Test123"},
  { id: 4, lastName: 'Stark', firstName: 'Arya', username: "Test123"},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', username: "Test123"},
  { id: 6, lastName: 'Melisandre', firstName: null, username: "Test123"},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', username: "Test123"},
  { id: 8, lastName: 'Frances', firstName: 'Rossini', username: "Test123"},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', username: "Test123"},
];

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
  const [results, setResults] = useState(<div></div>);
  
  const getDataFromAPI = (event) => {
    console.log(movieName)
    event.preventDefault();
    // axios.get(`https://api.themoviedb.org/3/search/movie?api_key=86c55e3a1810413caf10a4f40dc26944&language=en-US&query=${movieName}&page=1&include_adult=false`)

    axios.all([
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=86c55e3a1810413caf10a4f40dc26944&language=en-US&query=${movieName}&page=1&include_adult=false`),
        axios.get(SEARCH.replace(PLACEHOLDER, movieName))
    ]).then(axios.spread((movieRes, backendRes) => {
        // console.log(`backend res:`)
        // console.log(backendRes.data)
        console.log(`movie api res:`)
        console.log(movieRes.data)

        let userRows = []
        backendRes.data.users.forEach(u => {userRows.push(u.details)})

        let movieRows = []
        movieRes.data.results.forEach(m => { movieRows.push( { 'id': m.id, 'title': m.title, 'rating': m.vote_average }) })

        setResults(
          <div>
            <div style={{ height: 40, width: '80%', margin:"auto"}}>Users</div>
            <div style={{ height: 400, width: '80%', margin:"auto"}}>
              <DataGrid rows={userRows} columns={userColumns} pageSize={5}/>
            </div>
            <div style={{ height: 40, width: '80%', margin:"auto"}}>Movies</div>
            <div style={{ height: 400, width: '80%', margin:"auto"}}>
            <DataGrid rows={movieRows} columns={columns} pageSize={5} />
          </div>
        </div>
        )
    }));

    // axios.get(`https://api.themoviedb.org/3/search/movie?api_key=86c55e3a1810413caf10a4f40dc26944&language=en-US&query=${movieName}&page=1&include_adult=false`)
    //   .then(res => {
    //     console.log(res.data)
    //     // for (var i = 0; i < res.data.length; i++) {
    //     //     myOptions.push(res.data[i].employee_name)
    //     // }
    //     // setMyOptions(myOptions)
    //     setResults(
    //       <div>
    //         <div style={{ height: 40, width: '80%', margin:"auto"}}>Users</div>
    //         <div style={{ height: 400, width: '80%', margin:"auto"}}>
    //           <DataGrid rows={userRows} columns={userColumns} pageSize={5} />
    //         </div>
    //         <div style={{ height: 40, width: '80%', margin:"auto"}}>Movies</div>
    //         <div style={{ height: 400, width: '80%', margin:"auto"}}>
    //         <DataGrid rows={rows} columns={columns} pageSize={5} />
    //       </div>
    //     </div>
    //     )
    //   })
  }
  
  return (
    <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Search Movie
        </Typography>
        <form className={classes.form} noValidate onSubmit={getDataFromAPI}>
          <TextField
              value={movieName}
              fullWidth
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
    <div>
      {results}
    </div>
  </div>
  );
}
  
export default SearchMovie