import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import { useTracker } from "meteor/react-meteor-data";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { SwimmerCollection } from "../../api/SwimmerCollection";
import { SwimEventsCollection } from "../../api/SwimEventsCollection";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Events = ({ selectedSwimmer, setSelectedSwimmer }) => {
  var availableActivities = 0;
  const [enteredActivity, setEnteredActivity] = useState("");
  const [feedBack, setFeedBack] = useState("");
  const swimEvents = useTracker(() => SwimEventsCollection.find().fetch());
  const addActivityToSwimmer = (activity) => {
    SwimmerCollection.update(selectedSwimmer._id, {
      $set: {
        activeActivities: [
          ...selectedSwimmer.activeActivities,
          { ...activity, amount: 5 },
        ],
      },
    });
    setSelectedSwimmer({
      ...selectedSwimmer,
      activeActivities: [
        ...selectedSwimmer.activeActivities,
        { ...activity, amount: 5 },
      ],
    });
  };
  const increaseActivityAmount = (activity) => {
    selectedSwimmer.activeActivities.forEach((swimmerActivity) => {
      if (
        swimmerActivity.activityName == activity.activityName &&
        swimmerActivity.amount < 100
      ) {
        swimmerActivity.amount += 5;
        SwimmerCollection.update(selectedSwimmer._id, {
          $set: {
            activeActivities: selectedSwimmer.activeActivities,
          },
        });
      }
    });
  };
  const decreaseActivityAmount = (activity) => {
    selectedSwimmer.activeActivities.forEach((swimmerActivity, index) => {
      if (swimmerActivity.activityName == activity.activityName) {
        if (swimmerActivity.amount === 5) {
          selectedSwimmer.activeActivities.splice(index, 1);
        } else if (swimmerActivity.amount > 0) swimmerActivity.amount -= 5;
      }
    });
    SwimmerCollection.update(selectedSwimmer._id, {
      $set: {
        activeActivities: selectedSwimmer.activeActivities,
      },
    });
  };
  const addNewActivity = () => {
    if (!!enteredActivity) {
      SwimEventsCollection.insert({
        activityName: enteredActivity,
      });
      setFeedBack("");
      setEnteredActivity("");
    } else setFeedBack("You need to enter an activity name!");
  };
  const removeActivity = (activity) => {
    SwimEventsCollection.remove(activity._id);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">Events</Typography>
      <Card hei sx={{ padding: 3 }}>
        <Typography variant="h6">
          Selected swimmer: {selectedSwimmer.name}
        </Typography>{" "}
        <Paper
          width={"auto"}
          sx={{ maxHeight: 350, overflow: "auto", margin: 1, padding: 1 }}
        >
          <Typography>Entered</Typography>
          {!!!selectedSwimmer.activeActivities.length && (
            <Typography>No current activity</Typography>
          )}
          {selectedSwimmer.activeActivities.map((activity) => {
            return (
              <Grid item container alignItems={"center"}>
                <IconButton onClick={() => decreaseActivityAmount(activity)}>
                  <RemoveIcon />
                </IconButton>
                <Box
                  minWidth={100}
                  textTransform="capitalize"
                  textAlign="center"
                >
                  {activity.amount} {activity.activityName}
                </Box>
                <IconButton onClick={() => increaseActivityAmount(activity)}>
                  <AddIcon />
                </IconButton>
              </Grid>
            );
          })}
        </Paper>
        <Paper
          width={"auto"}
          sx={{ maxHeight: 350, overflow: "auto", margin: 1, padding: 1 }}
        >
          <Typography>Available</Typography>
          {swimEvents.map((activity) => {
            if (
              !selectedSwimmer.activeActivities.find((activeActivity) => {
                return activeActivity.activityName === activity.activityName;
              })
            ) {
              availableActivities++;
              return (
                <Grid container alignItems={"center"}>
                  <IconButton onClick={() => removeActivity(activity)}>
                    <RemoveIcon />
                  </IconButton>
                  <Box
                    minWidth={100}
                    textTransform="capitalize"
                    textAlign="center"
                  >
                    {activity.activityName}
                  </Box>
                  <IconButton
                    onClick={() => {
                      addActivityToSwimmer(activity);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              );
            }
          })}
          {!!!availableActivities && (
            <Typography>No available options</Typography>
          )}
        </Paper>
        <Paper sx={{ padding: 2, margin: 1 }}>
          <TextField
            onChange={(e) => {
              setEnteredActivity(e.target.value);
            }}
            value={enteredActivity}
            size="small"
            label="Add new activity"
          />
          <IconButton
            onClick={addNewActivity}
            sx={{
              marginLeft: 1,
              transition: ".3s ease-in-out",
              ":hover": { transform: "translate(5px)" },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>{" "}
          <Typography
            marginTop={1}
            marginLeft={0.5}
            fontSize={12}
            color={"red"}
          >
            {feedBack}
          </Typography>
        </Paper>
      </Card>
    </Box>
  );
};

export default Events;
