import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Doctor from "./container/Doctor/Doctor";
import Medicine from "./container/Medicine/Medicine";
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from "./container/Counter/Counter";
import { Provider } from "react-redux";
import { counterStore } from "./container/Redux/Store";

function App() {

  let store = counterStore()

  return (
    <>
    <Provider store={store}>
      <Layout>
        <Switch>
          <Route exact path={"/medicine"} component={Medicine} />
          <Route exact path={"/doctor"} component={Doctor} />
          <Route exact path={"/counter"} component={Counter} />
        </Switch>
      </Layout>
    </Provider>
    </>
  );
}

export default App;
