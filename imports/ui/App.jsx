import React, { useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

import Layout from "./Layout";
import { SwimmerCollection } from "../api/SwimmerCollection";
export const App = () => {
  const swimmers = useTracker(() =>
    SwimmerCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  return (
    <>
      <Layout />
    </>
  );
};
