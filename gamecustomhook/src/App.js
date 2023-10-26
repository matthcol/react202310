import { useValues } from "./useValues.js";
import { Routes, Route, Outlet, Link } from "react-router-dom";

function Game() {
  const [numbers, toggleUse] = useValues(9);
  const [numbers2, toggleUse2] = useValues(0);
  console.log(numbers);
  return (
    <>
      <h2>Game</h2>
      {numbers.map((nb) => (
        <button
          key={nb}
          onClick={() => {
            console.log("o");
            toggleUse(nb);
            toggleUse2(nb);
          }}
        >
          {nb}
        </button>
      ))}
      <h2>Board</h2>
      {numbers2.map((nb) => (
        <button
          key={nb}
          onClick={() => {
            console.log("o");
            toggleUse2(nb);
            toggleUse(nb);
          }}
        >
          {nb}
        </button>
      ))}
    </>
  );
}

function About() {
  return <div>About ....</div>;
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Play</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Game />} />
          <Route path="about" element={<About />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
