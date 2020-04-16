import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import Start from "./start";
import Conversation from "./conversation";

class App extends React.Component {
  render = () => {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/:id">
              <Test />
            </Route>
            <Route exact path="/">
              <Start />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };
}

function Test() {
  let { id } = useParams();
  return <Conversation conversationId={id} />;
}

export default App;
