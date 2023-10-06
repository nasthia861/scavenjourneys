import React, { useState, useEffect, ChangeEvent, Dispatch } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { JourneyType } from '@this/types/Journey';
import { TagType } from '@this/types/Tag'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
} from "@mui/material";

type IHeaderProps = {
  setJourneys: (journeys: JourneyType[]) => void;
};

const Search: React.FC<IHeaderProps> = ({setJourneys}) => {
  const [searchInput, setSearchInput] = useState("");
  // const [journeys, setJourneys] = useState([]);
  const [tags, setTags] = useState([]);

  const getTags = () => {
    axios.get("/tag").then((tags: { data: [] }) => {
      setTags(tags.data);
    });
  };

  const getJourneyByName = () => {
    axios.get(`journey/name/${searchInput}`)
    .then((journeys: { data: [] }) => {
      console.log(journeys.data)
      setJourneys(journeys.data);
      setSearchInput('')
      // navigate('/home', {state: journey.data})
    })

  };

  const getJourneyByTag = async (tagName: string) => {
    await axios.get(`journey/tag/${tagName}`)
      .then((journeys: { data: [] }) => {
        console.log(journeys.data)
        setJourneys(journeys.data);
        // navigate('/home', {state: journeys.data})
      })
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
      <input
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
      <div>
      {tags.map(
        (tag: TagType) => {
        return <Button key={tag.id} onClick={() => getJourneyByTag(tag.name)}>{tag.name}</Button>
      })}
      </div>
    </div>
  );
};

export default Search;
