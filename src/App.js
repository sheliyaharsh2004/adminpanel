import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Doctor from "./container/Doctor/Doctor";
import Medicine from "./container/Medicine/Medicine";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path={"/medicine"} component={Medicine} />
          <Route exact path={"/doctor"} component={Doctor} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
