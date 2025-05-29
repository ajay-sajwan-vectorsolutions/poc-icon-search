import React, { useEffect, useState } from "react";
import { fetchData } from "../graphql/query";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJGb250YXdlc29tZSIsImV4cCI6MTc0ODAzMzMyMSwiaWF0IjoxNzQ4MDI5NzIxLCJpc3MiOiJGb250YXdlc29tZSIsImp0aSI6IjRjMGU5YWIyLWI1OWItNDI2Mi1iZjY0LTJiY2EwMzg3ZTU0YSIsIm5iZiI6MTc0ODAyOTcyMCwic3ViIjoiVG9rZW46MjEwMjY5NiIsInR5cCI6ImFjY2VzcyJ9.SBrrE3quKMukBUh_BggmafaLXn2PFSkllg7u5FO0H9BFFI2Et5krpBAYawSIjq0cgkutXUHE_RRBmlJD4JcrGw"; // Replace with your actual token

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `
        {
          release(version: "6.x") {
            icons {
              id
              svgs(
                filter: {
                  familyStyles: [
                    { family: SHARP, style: LIGHT }
                    { family: DUOTONE, style: SOLID }
                  ]
                }
              ) {
                width
                height
                pathData
              }
            }
          }
        }
    `;

    fetchData(query, ACCESS_TOKEN)
      .then((result) => {
        setData(result.data?.release?.icons || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item.id}</li>
      ))}
    </ul>
  );
};

export default DataList;
