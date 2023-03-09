import Router, { Route } from "preact-router";
import { DraftPage } from "./pages/DraftPage";
import { HomePage } from "./pages/HomePage";

export function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/draft/:id" component={DraftPage} />
    </Router>
  );
}
