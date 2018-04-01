import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, Card, Box, BackgroundImage, Subhead, Small } from 'rebass';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red' };
  }

  render() {
    return (
      <Box width={256}>
        <Card>
          <Box p={2}>
            <Subhead>Card</Subhead>
            <Small>Small meta text</Small>
          </Box>
        </Card>
      </Box>
    );
  }
}

ReactDOM.render(
  <Provider>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
);
