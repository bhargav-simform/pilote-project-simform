![Logo](https://www.simform.com/wp-content/uploads/2022/12/logo.svg)
# React Js Boilerplate
This boilerplate is starting point of any project with all batteries included. you can directly start development without spending time on project setup.
## Tech Stack
**Client:** [React](react.dev), [Typescript](https://www.typescriptlang.org), [Vite](https://vitejs.dev/), [Redux (RTK-Query)](https://redux.js.org/), [React Router](https://reactrouter.com/en/main), 
 

**Styling:** [Antd](https://ant.design/), [Storybook](https://storybook.js.org/), 

**Code Formatter:** [Prettier](https://prettier.io/),   [Eslint](https://eslint.org/) 


### Developer Guide

1. To begin, set your Git username and email using the following commands:
   - `git config user.name "{username}"`
   - `git config user.email "{email}"`

2. Avoid pushing or committing directly to the `main` branch.

3. When creating a new branch, use one of the following naming conventions:
   - `feature/feature-name`
   - `bug/bug-details`
   - `design/design-details`

4. Format your commit messages as `Ticket number : Title` only. For example: `T-101 : Deploy site on production environment.`

5. Prior to committing, ensure you verify and resolve linting issues by running the following commands:
   - `npm run lint`
   - `npm run lint:fix`

6. Each Pull Request (PR) should contain only a single commit. If you've made multiple commits, rebase them into a single commit before submitting the PR.

7. Add comments when necessary for better understanding, and make further improvements as needed.

8. Customize the ESLint rules in the .eslintrc.cjs file to meet your project's specific requirements.

### Other useful scripts
- `pnpm build` to build a project
- `pnpm dev` to run (dev) a project
- `pnpm build` to build a project
- `pnpm preview` to run preview a project
- `pnpm lint` to lint a project 
 - `pnpm lint:fix` to lint:fix a project
- `pnpm format` to format a project
- `pnpm storybook` to start storybook dev server 
 - `pnpm build-storybook` to build storybook