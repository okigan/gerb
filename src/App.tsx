import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import icon from '../assets/icon.svg';
import './App.global.css';

import { EmptyRequest, CounterInfo } from './generated/service_grpc_web_pb';
import { CounterClient } from './generated/ServiceServiceClientPb';

setTimeout(() => {
  const client = new CounterClient('https://localhost:8080');

  const request = new EmptyRequest();

  client
    .getCounter(request, null)
    .then((value: CounterInfo) => {
      console.log(value.getCount());
      return 0;
    })
    .catch((reason: any) => {
      console.log(reason);
    });

  // const xxstream: grpcWeb.ClientReadableStream<HardwareStats> = client.monitor(
  //   request,
  //   {}
  // );
  // // Start listening on the data event, this is the event that is used to notify that new data arrives
  // xxstream.on('data', (response: HardwareStats) => {
  //   // setCPU(stats.cpu);
  //   // setMemoryFree(stats.memoryFree);
  //   // setMemoryUsed(stats.memoryUsed);
  //   // replaceText(`electron-native-addon`, stats.cpu)
  //   console.log(response.getCpu());
  // });
  // xxstream.on('end', () => {
  //   // setCPU(stats.cpu);
  //   // setMemoryFree(stats.memoryFree);
  //   // setMemoryUsed(stats.memoryUsed);
  //   // replaceText(`electron-native-addon`, stats.cpu)
  //   console.log('end');
  // });
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
