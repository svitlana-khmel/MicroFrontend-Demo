Here’s a step-by-step guide to creating a **Microfrontend Demo** using **Module Federation** in Webpack.

---

### **Step 1: Set Up Two React Applications**
We will create:
1. **Host App** - This will load the remote Microfrontend.
2. **Microfrontend App** - A separate app exposing components.

Run these commands to create both apps:

```bash
npx create-react-app host-app (npx create-react-app@latest host-app)
npx create-react-app micro-app (npx create-react-app@latest micro-app)
```

Move into each directory and install Webpack dependencies:

```bash
cd host-app
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader @babel/core @babel/preset-react @babel/plugin-proposal-class-properties --save-dev
```

Repeat this for the `micro-app`.

---

### **Step 2: Configure Webpack for Both Apps**

#### **Configure `webpack.config.js` in Microfrontend App**
Inside `micro-app`, create `webpack.config.js`:

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: { loader: "babel-loader" }
    }]
  },
  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: "MicroFrontend",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button"
      },
      shared: { react: { singleton: true, eager: true }, "react-dom": { singleton: true, eager: true } }
    })
  ]
};
```

**Create `src/Button.js` in Microfrontend**
```javascript
import React from "react";

const Button = () => {
  return <button style={{ padding: "10px", background: "blue", color: "white" }}>Microfrontend Button</button>;
};

export default Button;
```

**Modify `src/index.js`**
```javascript
import("./Button");
```

---

#### **Configure `webpack.config.js` in Host App**
Inside `host-app`, create `webpack.config.js`:

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
    historyApiFallback: { index: "/public/index.html" },
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: { loader: "babel-loader" }
    }]
  },
  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: "Host",
      filename: "remoteEntry.js",
      remotes: {
        MicroFrontend: "MicroFrontend@http://localhost:3000/remoteEntry.js"
      }
    })
  ]
};
```

---

### **Step 3: Use the Microfrontend Component in Host**
Modify `src/App.js` in **Host App**:

```javascript
import React, { Suspense } from "react";

const RemoteButton = React.lazy(() => import("MicroFrontend/Button"));

function App() {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteButton />
      </Suspense>
    </div>
  );
}

export default App;
```

---

### **Step 4: Run the Apps**
Run **Microfrontend App**:
```bash
cd micro-app
npm start
```

Run **Host App**:
```bash
cd host-app
npm start
```

Visit `http://localhost:3001` and you should see the **Button** from `micro-app` loaded into `host-app`.

---

### **Final Thoughts**
- **Microfrontend** allows independent deployments.
- **Module Federation** in Webpack enables runtime component sharing.
- Each Microfrontend can be developed and updated separately.

Would you like to enhance it with **authentication** or **state management**? 🚀



To define port `3002` by default for your microfrontend (`micro-app`), you can update the `package.json` or use environment variables.

### **Option 1: Define Port in `package.json`**
Modify the `scripts` section of `micro-app/package.json`:

```json
"scripts": {
  "start": "PORT=3002 react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

For Windows (if using CMD), modify it as:

```json
"start": "set PORT=3002 && react-scripts start"
```

Now, when you run `npm start`, it will default to port `3002`.

---

### **Option 2: Use `.env` File**
Create a `.env` file in the root of your `micro-app` and add:

```
PORT=3002
```

Then restart your app.

---

### **Restart the App**
If the app is already running on another port (`3000`), stop it with:

```bash
lsof -i :3000
kill -9 <PID>   # Replace <PID> with the process ID from lsof output
```

Then run:

```bash
npm start
```

Now, your micro-app should run on `3002` by default. 🚀

### --------------------- OR WITHOUT CREATE REACT ---------------------
✅ Step 1: Create a New React Project
Open your terminal and run:

sh
Copy
Edit
mkdir appreact2
cd appreact2
npm init -y
This initializes a new Node.js project with a package.json file.

✅ Step 2: Install Dependencies
Install React and ReactDOM:

sh
Copy
Edit
npm install react react-dom
Install Webpack and required loaders/plugins:

sh
Copy
Edit
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
Install Babel and necessary presets/plugins:

sh
Copy
Edit
npm install --save-dev @babel/core @babel/preset-react babel-loader
Install CSS and style loaders:

sh
Copy
Edit
npm install --save-dev css-loader style-loader
✅ Step 3: Create Project Structure
Inside the appreact2 folder, create the following structure:

pgsql
Copy
Edit
appreact2/
│── public/
│   └── index.html
│── src/
│   ├── index.js
│   ├── App.js
│── package.json
│── webpack.config.js
│── .babelrc
✅ Step 4: Configure Babel
Create a .babelrc file in the project root and add:

json
Copy
Edit
{
  "presets": ["@babel/preset-react"]
}
✅ Step 5: Configure Webpack
Create a webpack.config.js file and add:

js
Copy
Edit
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
✅ Step 6: Create index.html
Inside the public folder, create an index.html file:

html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Webpack App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
✅ Step 7: Create src/index.js
js
Copy
Edit
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
✅ Step 8: Create src/App.js
js
Copy
Edit
import React from "react";

const App = () => {
  return <h1>Hello from React Webpack App!</h1>;
};

export default App;
✅ Step 9: Update package.json Scripts
Modify the scripts section in package.json:

json
Copy
Edit
"scripts": {
  "start": "webpack serve --config webpack.config.js",
  "build": "webpack --mode production"
}
✅ Step 10: Run the App
Start the development server:

sh
Copy
Edit
npm start
You should see your React Webpack App running at:

arduino
Copy
Edit
http://localhost:3000

## -------------------------------------------------------------------------

To expose a Button component using Module Federation, follow these steps.

✅ Step 1: Install Module Federation Plugin
Run the following command inside your project:

sh
Copy
Edit
npm install --save-dev @module-federation/webpack
✅ Step 2: Update webpack.config.js
Modify your webpack.config.js to use Module Federation:

js
Copy
Edit
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "http://localhost:3000/",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "appreact2",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
✅ Step 3: Create the Button Component
Create a new file src/Button.js and add the following code:

js
Copy
Edit
import React from "react";

const Button = () => {
  return <button style={{ padding: "10px", fontSize: "16px" }}>Click Me</button>;
};

export default Button;
✅ Step 4: Update src/App.js
Modify App.js to use the Button component:

js
Copy
Edit
import React from "react";
import Button from "./Button";

const App = () => {
  return (
    <div>
      <h1>Hello from React Webpack App!</h1>
      <Button />
    </div>
  );
};

export default App;
✅ Step 5: Run the App
Start the development server:

sh
Copy
Edit
npm start
Now your Button component is exposed at:

bash
Copy
Edit
http://localhost:3000/remoteEntry.js
You can now consume the Button component in another Microfrontend app using Module Federation.

==============================================
### TROUBLESHOOOTING
==============================================

## 🧩 The Core Error

```
Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react
```

This is a **Webpack Module Federation runtime error**.

It means:

> Your app tried to “eagerly” load a shared dependency (in this case, `react`) before the Module Federation runtime made it available.

---

## ⚙️ Why It Happens

This usually occurs when:

1. **You’re using `shared` React modules in Module Federation**,
2. **But your app is running standalone (not as a host or remote consumer)**, and
3. **Webpack is trying to eagerly consume shared modules before the federation container initializes.**

---

### 🔍 Common Scenarios That Cause It

#### 1. The local microfrontend is trying to `consume` shared modules even though it’s not being consumed.

* Your app at `localhost:3005` defines:

  ```js
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0", strictVersion: false },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0", strictVersion: false },
  }
  ```
* But **no host is actually consuming it**, so when the app starts, Webpack’s sharing runtime looks for those shared modules **and can’t find them yet** — resulting in that error.

---

#### 2. The shared module is loaded “eagerly.”

Webpack tries to optimize startup by preloading shared modules, but if one isn’t yet provided, it throws.

This can happen even if React is installed locally.

---

## 🧠 The Fix

You have **three possible solutions**, depending on what you’re doing:

---

### ✅ **Option 1: Disable eager consumption for dev**

Since this microfrontend is running standalone (not actually loaded by a host yet), disable sharing **for local development**:

```js
shared: {
  react: { singleton: true, eager: true, requiredVersion: false },
  "react-dom": { singleton: true, eager: true, requiredVersion: false },
},
```

Or if that still fails, make it **not shared at all** when running standalone:

```js
shared: {}
```

This ensures React is bundled normally — no federation runtime needed.

---

### ✅ **Option 2: Add `shareScope` initialization**

If you must keep Module Federation enabled (e.g. for integrated dev):

Before you render React, initialize the share scope manually:

```js
import("./bootstrap");

```

Then in a new file, `bootstrap.js`:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

And in `index.js`, instead of directly rendering, just call:

```js
import("./bootstrap");
```

This ensures Module Federation’s shared scope is properly initialized before React is required.

---

### ✅ **Option 3: Use `async` `shared` setup**

Webpack recommends that any module using federation load **asynchronously**, so that the `__webpack_share_scopes__` can initialize before usage.

This is the same idea as Option 2 — just a more general form.

---

### 🚫 The Other Error:

```
Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
```

That’s unrelated — it’s just a Chrome extension (usually React DevTools or Redux DevTools) failing to connect while reloading in dev mode. You can safely ignore it.

---

## ✅ TL;DR

**The error means React was requested via Module Federation before the share scope was ready.**

Fix it by either:

* Making your entry asynchronous (`import("./bootstrap")`), **or**
* Setting `eager: true` or removing sharing for React during standalone dev.

---

Define:

* whether this app is supposed to be a **remote** or **standalone**,
* and whether you’re **running it inside a host yet**,


