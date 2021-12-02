import AuthProvider from "./auth/AuthProvider";
import AppRouter from "./routers/AppRouter";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App container">
      <div className="m-5">
        <div className=" border p-5 ">
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
