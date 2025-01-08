import React, { useEffect, useState } from "react";
import { getPullRequests } from "../api";

const PullRequestList = () => {
  const [pullRequests, setPullRequests] = useState([]);

  useEffect(() => {
    getPullRequests().then((response) => setPullRequests(response.data));
  }, []);

  return (
    <div>
      <h1>Pull Requests</h1>
      <ul>
        {pullRequests.map((pr) => (
          <li key={pr._id}>{pr.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PullRequestList;
