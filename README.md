# poc-icon-search

This repo contains code for fontawesome icon search. Utilizing the Graph QL query provided by fontawesome to fetch icon information. Its a simple React application that fetches data fromusing GraphQL API and display the results.

## Project Structure

```
graphql-react-app
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── components
│   │   └── DataList.jsx    # Component that fetches and displays data
│   ├── graphql
│   │   └── query.js        # Contains the fetchData function for GraphQL queries
│   ├── App.jsx             # Main App component that renders the DataList component
│   └── index.js            # Entry point of the React application
├── package.json            # Configuration file for npm
└── README.md               # Documentation for the project
```

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd graphql-react-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Features

- Fetches data from a GraphQL API.
- Displays the fetched data in a user-friendly unordered list format.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.