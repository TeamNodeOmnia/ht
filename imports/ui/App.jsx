import React from 'react';
import HomePage from './HomePage';
import Customers from './Customers';
import Projects from './Projects';
import HTAppBar from './HTAppBar';
import Container from '@material-ui/core/Container';
import { useRoutes } from 'hookrouter';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

// our route table
const routes = {
  '/': () => <HomePage />,
  '/customers': () => <Customers />,
  '/projects': () => <Projects />,
};

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

// The main App.

export default function App() {
  const routeResult = useRoutes(routes);

  return(
    <ThemeProvider theme={theme}>
      <HTAppBar />
      <br />
      <Container maxWidth="md">
        {routeResult}
      </Container>
    </ThemeProvider>
  );
}
