import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { JourneyType } from "@this/types/Journey";
import { StepType } from "@this/types/Step";
import { JourneyProgressType } from "@this/types/JourneyProgress";
import Grid from "@mui/material/Grid";

const Journey: React.FC = () => {
  const location: { state: { journey: JourneyType; userId: number } } =
    useLocation();
  let journey = location.state.journey;
  const userId = location.state.userId;
  const [alreadyStarted, setAlreadyStarted] = useState([]);
  const [steps, setSteps] = useState<StepType[]>([]);
  const [buttonName, setButtonName] = useState("Assign Journey");

  const [journeyProgressId, setJourneyProgressId] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     journey = await axios.get()
  //   }
  // }, []);

  const assignJourney = async () => {
    // POST to assign journey to user
    if (buttonName === "Go to Journey") {
      setJourneyProgressId(alreadyStarted[0].id);
    } else {
      const steps: { data: [] } = await axios.get(
        `/step/journey/${journey.id}`
      );
      axios
        .post(`/journey/progress`, {
          userId: userId,
          journeyId: journey.id,
        })
        .then(async (response) => {
          let promises: Promise<any>[] = [];
          steps.data.forEach((step: { id: number }) => {
            promises.push(
              axios
                .post("/step/progress", {
                  journey_progress: response.data.id,
                  step: step.id,
                })
                .catch((error) => console.error("Error assigning steps", error))
            );
          });

          // Fetch the user's data to calculate "Journeys Taken"
          axios
            .get(`/userdata/byUserId/${userId}`)
            .then(async (userDataResponse) => {
              const existingUserData = userDataResponse.data;
              const journeysTaken = existingUserData.journeysTaken + 1; // Increment "Journeys Taken"

              // Increment "Journeys Taken" in user data
              const updatedUserData = {
                ...existingUserData,
                journeysTaken,
              };
              axios.put(`/userdata/${existingUserData.id}`, updatedUserData);

              // Check for achievements if the user has any
              const userAchievementsResponse = await axios.get(
                `/userachievements/byUserId/${userId}`
              );
              const userAchievements = userAchievementsResponse.data;

              // Function to create a new user achievement if it doesn't exist
              const createNewUserAchievement = async (
                achievementId: number
              ) => {
                await axios.post("/userachievements", {
                  user: { id: userId },
                  achievement: { id: achievementId },
                });
              };

              // Check if the user needs an achievement based on "Journeys Taken"
              if (journeysTaken >= 2) {
                if (Array.isArray(userAchievements)) {
                  // Check if the user has achievement ID for "Journeys Taken"
                  const achievementId = 7;
                  const hasAchievement = userAchievements.some(
                    (achievement) =>
                      achievement.achievement.id === achievementId
                  );
                  // If they don't have it, create a new user achievement
                  if (!hasAchievement) {
                    createNewUserAchievement(achievementId);
                  }
                }
              }

              if (journeysTaken >= 10) {
                if (Array.isArray(userAchievements)) {
                  // Check if the user has achievement ID for "Journeys Taken"
                  const achievementId = 8;
                  const hasAchievement = userAchievements.some(
                    (achievement) =>
                      achievement.achievement.id === achievementId
                  );
                  // If they don't have it, create a new user achievement
                  if (!hasAchievement) {
                    createNewUserAchievement(achievementId);
                  }
                }
              }

              if (journeysTaken >= 20) {
                if (Array.isArray(userAchievements)) {
                  // Check if the user has achievement ID for "Journeys Taken"
                  const achievementId = 9;
                  const hasAchievement = userAchievements.some(
                    (achievement) =>
                      achievement.achievement.id === achievementId
                  );
                  // If they don't have it, create a new user achievement
                  if (!hasAchievement) {
                    createNewUserAchievement(achievementId);
                  }
                }
              }
            });

          Promise.all(promises).then(() =>
            setJourneyProgressId(response.data.id)
          );
        })
        .catch((error) => {
          console.error("Error assigning journey:", error);
        });
    }
  };

  const grabProgress = async () => {
    const result = await axios.get(`/journey/progress/${userId}`);
    let idArray = result.data.filter((progress: JourneyProgressType) => {
      return progress.journey.id === journey.id;
    });
    if (idArray.length > 0) {
      setButtonName("Go to Journey");
    }
    setAlreadyStarted(idArray);
  };

  useEffect(() => {
    // get steps for the selected journey
    grabProgress();
    axios
      .get(`/step/journey/${journey.id}`)
      .then((stepAndJourney: { data: [] }) => {
        setSteps(stepAndJourney.data);
      })
      .catch((error) => {
        console.error("Error getting steps for journey:", error);
      });
  }, []);

  useEffect(() => {
    if (journeyProgressId) {
      navigate(`/profile/${userId}`, { state: { journeyProgressId } });
    }
  }, [journeyProgressId]);

  // Check if the journey data is available, otherwise display a loading message.
  if (!journey) {
    return (
      <div>
        Loading journey data...
      </div>
    );
  } else {
    // Render the journey details and steps if the journey data is available.
    return (
      <Grid
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Journey: {journey.name}
          </Typography>
          <Card
            sx={{
              background: "#f8e5c8",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
            }}
            elevation={3}
          >
            <CardMedia
              component="img"
              alt={journey.name}
              height="140"
              image={journey.img_url}
              sx={{ objectFit: "contain" }}
            />
            <Typography
              variant="h6"
              component="div"
              alignContent="center"
              alignItems="center"
              textAlign="center"
              padding="10px"
            >
              {journey.description}
            </Typography>
          </Card>
          <Button
            onClick={assignJourney}
            variant="contained"
            type="button"
            sx={{ borderRadius: "20px" }}
            size="small"
            fullWidth={false}
            color="primary"
          >
            {buttonName}
          </Button>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Steps:
          </Typography>
          {steps.map((step) => {
            return (
              <Card
                key={step.id}
                sx={{
                  background: "#f8e5c8",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                }}
                elevation={3}
              >
                <CardContent>
                  <Typography variant="h6" component="div" textAlign="center">
                    <p>{step.hint}</p>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Grid>
    );
  }
};


export default Journey;
