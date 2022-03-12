import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";

const App = () => (
  <>
    <Navbar />
    <Switch>
      {/* <Route path="/" exact component={Home} /> */}
      {/* <Route path="/search" component={Search} /> */}
      {/* <Route path="/add-song" component={AddSong} /> */}
      {/* <Redirect to="/" /> */}
    </Switch>
  </>
);

export default App;
