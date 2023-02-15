import React, { useEffect } from "react";
import { SwimmerCollection } from "../../api/SwimmerCollection";
import { useTracker } from "meteor/react-meteor-data";
import { DataGrid } from "@mui/x-data-grid";
import { useSwimmersColumns } from "./useSwimmersColumns";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

const Swimmers = ({ setSelectedSwimmer, selectedSwimmer }) => {
  const swimmersColumns = useSwimmersColumns();
  const swimmers = useTracker(() => SwimmerCollection.find().fetch());

  const selectSwimmer = (swimmer) => {
    setSelectedSwimmer(swimmer);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">Swimmers</Typography>
      {swimmers.map((swimmer) => (
        <Card
          elevation={3}
          sx={{
            background:
              selectedSwimmer?._id == swimmer?._id ? "lightblue" : "white",
            padding: 2,
            marginY: 3,
            transition: ".3s ease-in-out",
            "&:hover": {
              cursor: "pointer",
              transform: "translate(0,-10px)",
              background: "#f0f0f0",
            },
          }}
          onClick={() => selectSwimmer(swimmer)}
        >
          <Typography>{swimmer.name}</Typography>
        </Card>
      ))}
    </Box>
  );
};

export default Swimmers;
