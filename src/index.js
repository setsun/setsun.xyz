import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, Image } from 'rebass';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import wayfairLogo from './img/wayfair.png';
import hubspotLogo from './img/hubspot.png';
import jetLogo from './img/jet.png';
import frameLogo from './img/frame.png';

import Reveal from './components/Reveal';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Reveal size={256}>
          <Image width={128} src={wayfairLogo} />
        </Reveal>
        <Reveal size={256}>
          <Image width={128} src={hubspotLogo} />
        </Reveal>
        <Reveal size={256}>
          <Image width={128} src={jetLogo} />
        </Reveal>
        <Reveal size={256}>
          <Image width={128} src={frameLogo} />
        </Reveal>
      </React.Fragment>
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
