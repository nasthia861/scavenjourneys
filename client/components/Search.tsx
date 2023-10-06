import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
} from "@mui/material";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [journeys, setJourneys] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const getTags = () => {
    axios.get("/tag").then((tags: { data: [] }) => {
      setTags(tags.data);
    });
  };

  const getJourneyByName = () => {
    axios.get(`journey/name/${searchInput}`)
    .then((journey: { data: [] }) => {
      setJourneys(journey.data);
    });
  };

  const getJourneyByTag = (tagName: string) => {
    axios.get(`journey/tag/${tagName}`)
      .then((journeys: { data: [] }) => {
        setJourneys(journeys.data);
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
        (tag: {
          id: number,
          name: string
        }) => {
        return <Button key={tag.id} onClick={() => getJourneyByTag(tag.name)}>{tag.name}</Button>
      })}
      </div>
      <section>
        <ImageList sx={{ width: 500, height: 450 }}>
          {journeys.map(
            (journey: {
              id: number;
              name: string;
              img_url: string;
              description: string;
              user: { username: string };
            }) => (
              <ImageListItem
                key={journey.id}
                onClick={() => navigate('/journey',{state:{journey}})}>
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
            )
          )}
        </ImageList>
      </section>
    </div>
  );
};

export default Search;
