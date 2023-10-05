import React, {useState, useEffect, ChangeEvent} from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const Search = () => {
  const [searchInput, setSearchInput] = useState(''); 
  const [journeys, setJourneys] = useState([]);
  const [tags, setTags] = useState([]);

  const getTags = () => {
    axios.get('/tag')
      .then((tags: {data: []}) => {
        setTags(tags.data)
      })
  }
  
  const getJourneyByName = () => {
    axios.get(`journey/name/${searchInput}`)
      .then((journey: {data: []}) => {
        setJourneys(journey.data)
      })
  }

  const getJourneyByTag = () => {

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  useEffect(() => {
    getTags();
  })


  return (
    <div>
      <input type="text"
        placeholder='Search Journey'
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            getJourneyByName();
          }
        }}
        value={searchInput}/>
      <section>
        {
          tags.map((tag) => {

          })
        }
      </section>
      <section>
        <ImageList sx={{ width: 500, height: 450 }}>
        {journeys.map((journey: {id: number, name: string, img_url: string, description: string, user: {username: string}}) => (
          <ImageListItem key={journey.id}>
            <img
              srcSet={journey.img_url}
              src={journey.img_url}
              alt={journey.description}
              loading="lazy"
            />
            <ImageListItemBar
              title={journey.name}
              subtitle={<span>by: {journey.user.username}</span>}
              // position="below"
            />
          </ImageListItem>
        ))}
        </ImageList>
      </section>
    </div>
  )
}

export default Search;