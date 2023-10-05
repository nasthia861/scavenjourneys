import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import { styled, alpha} from '@mui/material/styles';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchBase = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(10),
    width: 'auto',
  },
}));

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [journeys, setJourneys] = useState([]);

  const getJourney = () => {
    axios.get(`/journey/name/${searchInput}`)
      .then((journey: {}) => {
        setJourneys([journey])
      })
  }

  const handleChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    setSearchInput(e.target.textContent);
  };

  useEffect(() => {

  }, [journeys])

  return (
    <div>
      <SearchBase>
            <StyledInputBase
              placeholder="Journey Search"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                getJourney();
                }
              }}
              value={searchInput}
              />
      </SearchBase>
    </div>
  )
}

export default Search;