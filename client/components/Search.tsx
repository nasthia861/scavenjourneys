import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { SearchStyle } from "../styling/searchStyle";

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import { JourneyType } from '@this/types/Journey';
import { TagType } from '@this/types/Tag'
import TextField from "@mui/material/TextField";

type IHeaderProps = {
  setJourneys: (journeys: JourneyType[]) => void;
  getJourneys: () => Promise<void>
  userLat: number;
  userLong: number;
  alignment: number
};
const Search: React.FC<IHeaderProps> = ({setJourneys, userLat, userLong, alignment, getJourneys}) => {
  const [searchInput, setSearchInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tabValue, setTabValue] = useState(0)
  // const [alignment, setAlignment] = useState(3);
  const getTags = () => {
    axios.get("/tag").then((tags: { data: [] }) => {
      setTags(tags.data);
    });
  };
  const getJourneyByName = () => {
    axios.get(`journey/name/${searchInput}`)
    .then((journeys: { data: [] }) => {
      setJourneys(journeys.data);
      setSearchInput('')
    })
  };
  const getJourneyByTag = async (tagName: string) => {
    axios.get(`/journeytag/name/${userLat}/${userLong}/${alignment}/${tagName}`)
      .then((response) => {
        response.data.sort((journeyA: {latitude: number}, journeyB: {latitude: number}) => {
          return (userLat - journeyA.latitude) - (userLat - journeyB.latitude)
      })
      setJourneys(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent journeys:', error);
      });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };
  const handleScrollChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
        <SearchStyle>
          <TextField
            inputProps={{ 'aria-label': 'search' }}
            type="text"
            fullWidth
            placeholder="Search Journey"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getJourneyByName();
              }
            } }
            value={searchInput}
            />
            {/* <SearchIcon /> */}
        </SearchStyle>
        <br/>

        <Box sx={{  maxWidth: { xs: 342, sm: 480 } , bgcolor: '#f8e5c8', borderRadius: '10px' }}>
          <Tabs
            value={tabValue}
            onChange={handleScrollChange}
            variant="scrollable"

            >
            <Tab label="All" onClick={getJourneys}/>
            {tags.map(
              (tag: TagType) => {
                return <Tab label={tag.name} key={tag.id} onClick={() => getJourneyByTag(tag.name)} />
              })}
          </Tabs>
        </Box>
    </div>
  )
};
export default Search;