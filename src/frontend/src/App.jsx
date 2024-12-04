import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Layout/HomePage.jsx";
import { routes } from "./routes/index.jsx";
import { RateProvider } from "./context/index.jsx";

function App() {
  return (
    <RateProvider>
      <Router>
        <div className="App">
          <Routes>
            {routes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <HomePage>
                      <Page />
                    </HomePage>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </RateProvider>
  );
}

export default App;
