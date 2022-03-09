import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

const App = () => (
  <>
    <Navbar />
    <Switch>{/* ...Routes */}</Switch>
  </>
);

export default App;
