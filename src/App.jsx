import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./pages/login";
import Spots from "./pages/spots";
import SpotDetails from "./pages/spotDetails";
import CreateSpot from "./pages/createSpot";
import EditSpot from "./pages/editSpot";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/redux/store/store";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/spots/edit/:id" element={<EditSpot />} />
            <Route exact path="/spots/new" element={<CreateSpot />} />
            <Route exact path="/" element={<Spots />} />
            <Route exact path="/spots" element={<Spots />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/spots/:id"
              element={
                <>
                  <SpotDetails />
                </>
              }
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
