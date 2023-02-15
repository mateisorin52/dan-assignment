import { Card, FormControlLabel, Grid, Switch } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTracker } from "meteor/react-meteor-data";
import { useSwimmersColumns } from "../SwimmersComponents/useSwimmersColumns";
import { SwimmerCollection } from "../../api/SwimmerCollection";
import PdfComponent from "../PdfComponents/PdfComponent";
import { SwimEventsCollection } from "../../api/SwimEventsCollection";
const SummaryTable = () => {
  const [canSeePdf, setCanSeePdf] = useState(false);
  const summaryTableColumns = useSwimmersColumns();
  const swimmers = useTracker(() => SwimmerCollection.find().fetch());
  const swimEvents = useTracker(() => SwimEventsCollection.find().fetch());
  const dataGridData = [];
  swimmers.map((swimmer, index) => {
    let activityObject = {};
    swimmer.activeActivities.forEach((activity) => {
      activityObject = {
        ...activityObject,
        [activity.activityName]: activity.amount,
      };
    });
    dataGridData.push({ id: index, name: swimmer.name, ...activityObject });
  });
  const pdfCols = [
    "id",
    "name",
    ...swimEvents.map((event) => event.activityName),
  ];

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={canSeePdf}
            onChange={() => setCanSeePdf(!canSeePdf)}
          />
        }
        label="Switch to PDF"
      />
      {!canSeePdf ? (
        <Card>
          <Grid></Grid>
          <DataGrid
            autoHeight
            columns={summaryTableColumns}
            rows={dataGridData}
          />
        </Card>
      ) : (
        <Grid height={"100vh"} width={"100vw"} xs={12}>
          <PdfComponent columns={pdfCols} data={dataGridData} />
        </Grid>
      )}
    </>
  );
};

export default SummaryTable;
