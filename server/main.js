import { Meteor } from "meteor/meteor";
import { SwimEventsCollection } from "../imports/api/SwimEventsCollection";
import { SwimmerCollection } from "../imports/api/SwimmerCollection";
import {
  initialSwimmers,
  possibleActivities,
} from "../imports/ui/SwimmerMeetEntries ";

Meteor.startup(() => {
  if (!SwimEventsCollection.find().fetch().length)
    possibleActivities.forEach((activity) => {
      SwimEventsCollection.insert(activity);
    });
  if (!SwimmerCollection.find().fetch().length)
    initialSwimmers.forEach((swimmer) => {
      SwimmerCollection.insert(swimmer);
    });
});
