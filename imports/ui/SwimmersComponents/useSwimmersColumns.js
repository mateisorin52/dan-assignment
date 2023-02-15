import { useMemo } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { SwimEventsCollection } from "../../api/SwimEventsCollection";
export const useSwimmersColumns = () => {
  const swimEvents = useTracker(() => SwimEventsCollection.find().fetch());
  return useMemo(() => {
    const swimEventsColumns = swimEvents.map((event) => {
      return {
        field: event.activityName,
        headerName: event.activityName,
      };
    });

    return [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Swimmer" },
      ...swimEventsColumns,
    ];
  }, [swimEvents]);
};
