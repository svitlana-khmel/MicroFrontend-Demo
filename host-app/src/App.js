import React, { Suspense } from "react";

const Button = React.lazy(() => import("MicroFrontend/Button"));

function App() {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback={<div>Loading Button...</div>}>
        <Button />
      </Suspense>
    </div>
  );
}

export default App;
