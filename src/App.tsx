import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import { EmptyRequest, HardwareStats } from './gen/service_grpc_web_pb';
import { HardwareMonitorClient } from './gen/ServiceServiceClientPb';

setTimeout(() => {
  const client = new HardwareMonitorClient('https://localhost:8080');

  const request = new EmptyRequest();

  const stream = client.monitor(request, {});
  // Start listening on the data event, this is the event that is used to notify that new data arrives
  stream.on('data', (response: HardwareStats) => {
    // setCPU(stats.cpu);
    // setMemoryFree(stats.memoryFree);
    // setMemoryUsed(stats.memoryUsed);
    // replaceText(`electron-native-addon`, stats.cpu)
    console.log(response.getCpu());
  });
}, 1000);

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
