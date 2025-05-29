async function fetchData(query, token) {
  const endpoint = "https://api.fontawesome.com"; // Replace with your GraphQL endpoint

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchToken() {
  fetch("https://api.fontawesome.com/token", {
    method: "POST",
    headers: {
      Authorization: "Bearer 424339EA-0454-4475-B60E-65A962B2ECBB",
    },
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            data?.message || "Unknown error"
          }`
        );
      }
      return data.access_token;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
export { fetchData, fetchToken };
