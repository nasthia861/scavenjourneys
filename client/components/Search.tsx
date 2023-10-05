import React, {useState, useEffect, ChangeEvent} from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Search = () => {
  const [searchInput, setSearchInput] = useState(''); 
  const [journeys, setJourneys] = useState([]);

  const getJourney = () => {
    axios.get(`journey/name/${searchInput}`)
      .then((journey: {data: {}}) => {
        setJourneys([journey.data])
      })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };


  return (
    <div>
      <input type="text"
        placeholder='Search Journey'
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            getJourney();
          }
        }}
        value={searchInput}/>
      <section>
        <ImageList sx={{ width: 500, height: 450 }}>
        {journeys.map((journey: {id: number, name: string, img_url: string, description: string, userId: number}) => (
          <ImageListItem key={journey.id}>
            <img
              src={journey.img_url}
              alt={journey.description}
              loading="lazy"
            />
            <ImageListItemBar
              title={journey.name}
              subtitle={<span>by: {journey.userId}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
        </ImageList>
      </section>
    </div>
  )
}

export default Search;