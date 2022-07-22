import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Doctor from "./container/Doctor/Doctor";
import Medicine from "./container/Medicine/Medicine";
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from "./container/Counter/Counter";
import { Provider } from "react-redux";
import { counterStore } from "./Redux/Store";
import { PersistGate } from 'redux-persist/integration/react'
import Promise_Example from "./container/Promise_Example/Promise_Example";
import UseMemo from "./container/Hook_Example/UseMemo";
import UseCallBack from "./container/Hook_Example/UseCallBack";

function App() {

  let {store, persistor} = counterStore()

  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Switch>
            <Route exact path={"/medicine"} component={Medicine} />
            <Route exact path={"/doctor"} component={Doctor} />
            <Route exact path={"/counter"} component={Counter} />
            <Route exact path={"/promise_example"} component={Promise_Example} />
            <Route exact path={"/usememo"} component={UseMemo} />
            <Route exact path={"/usecallback"} component={UseCallBack} />
          </Switch>
        </Layout>
      </PersistGate>
    </Provider>
    </>
  );
}

export default App;
