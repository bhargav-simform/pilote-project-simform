Here's a clean and professional version of your README with improved grammar, structure, and formatting for clarity and developer-friendliness:

---

![Logo](https://www.simform.com/wp-content/uploads/2022/12/logo.svg)

# 🚀 React.js Boilerplate

A modern, batteries-included React.js boilerplate to kickstart your project with zero setup hassle. Preconfigured with essential tooling, this setup lets you focus on building features — not configuring the environment.

---

## 🛠️ Tech Stack

### **Frontend**

* [React](https://react.dev)
* [TypeScript](https://www.typescriptlang.org)
* [Vite](https://vitejs.dev) – blazing fast dev/build tool
* [React Router](https://reactrouter.com/en/main)

### **Styling**

* [Ant Design (Antd)](https://ant.design)
* [styled-components](https://styled-components.com)

### **Code Quality**

* [ESLint](https://eslint.org)
* [Prettier](https://prettier.io)

---

## 📦 Available Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start development server             |
| `npm run build`    | Build the project for production     |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Lint the codebase                    |
| `npm run lint:fix` | Auto-fix lint issues                 |
| `npm run format`   | Format code using Prettier           |

---

## 🔍 SonarQube Integration

Ensure code quality with [SonarQube](https://www.sonarsource.com/products/sonarqube/).

### 👉 To run locally:

1. Start SonarQube locally:

   ```bash
   ./sonar.sh start
   ```

2. Create a project on your local SonarQube instance and generate a token.

3. Add a `sonar-project.properties` file to the root of your project with necessary configuration.

4. Run Sonar analysis:

   ```bash
   sonar -Dsonar.host.url=http://localhost:9000 -Dsonar.token=<YOUR_TOKEN>
   ```

---
