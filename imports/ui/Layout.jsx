import { Checkbox, FormControlLabel, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Events from "./EventsComponents/Events";
import { useTracker } from "meteor/react-meteor-data";
import Swimmers from "./SwimmersComponents/Swimmers";
import { SwimmerCollection } from "../api/SwimmerCollection";
import SummaryTable from "./SummaryComponents/SummaryTable";

import PdfComponent from "./PdfComponents/PdfComponent";
const Layout = () => {
  const [selectedSwimmer, setSelectedSwimmer] = useState();
  const [canSeeSummaryTable, setCanSeeSummaryTable] = useState(false);
  return (
    <Grid justifyContent={"space-around"} width={"100%"} container>
      <Grid xs={5} item>
        <Swimmers
          setSelectedSwimmer={setSelectedSwimmer}
          selectedSwimmer={selectedSwimmer}
        />
      </Grid>
      <Grid xs={5} item>
        {selectedSwimmer && (
          <Events
            setSelectedSwimmer={setSelectedSwimmer}
            selectedSwimmer={selectedSwimmer}
          />
        )}
      </Grid>
      <Grid xs={11}>
        <FormControlLabel
          control={
            <Checkbox
              checked={canSeeSummaryTable}
              onChange={() => setCanSeeSummaryTable(!canSeeSummaryTable)}
            />
          }
          label="Show summary table"
        />
      </Grid>
      {canSeeSummaryTable && (
        <Grid item marginTop={3} xs={10}>
          <SummaryTable />
        </Grid>
      )}
    </Grid>
  );
};

export default Layout;
