import React, { useState, useEffect, ChangeEvent, Dispatch } from "react";
import axios from "axios";
import { SearchStyle, SearchIconWrapper, StyledInputBase } from '../styling/searchStyle'
import { Item } from '../styling/journeyStyle'
import SearchIcon from '@mui/icons-material/Search';
import { Tab, Box, Tabs, Container, Grid, Stack } from '@mui/material';
import { JourneyType } from '@this/types/Journey';
import { TagType } from '@this/types/Tag'

type IHeaderProps = {
  setJourneys: (journeys: JourneyType[]) => void;
  userLat: number;
  userLong: number;
};

const Search: React.FC<IHeaderProps> = ({setJourneys, userLat, userLong}) => {
  const [searchInput, setSearchInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tabValue, setTabValue] = useState(0)

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
    axios.get(`/journey/tag/${userLat}/${userLong}/${tagName}`)
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
    <Stack>

      <Item>
        <SearchStyle>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            inputProps={{ 'aria-label': 'search' }}
            type="text"
            placeholder="Search Journey"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getJourneyByName();
              }
            }}
            value={searchInput}
            />
        </SearchStyle>
      </Item>

      <Item>
        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
          <Tabs
            value={tabValue}
            onChange={handleScrollChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
            >
            {tags.map(
              (tag: TagType) => {
                return <Tab label={tag.name} key={tag.id} onClick={() => getJourneyByTag(tag.name)} />
              })}
          </Tabs>
        </Box>
      </Item>

    </Stack>
  );
};

export default Search;
