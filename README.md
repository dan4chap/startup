# Expenses Easy

[My Notes](notes.md)

This app will allow you to connect your bank accounts and track your expenses. For whatever reason, other apps that do this are hard to follow, only show one graph at a time and don't allow you to just see the basic transcation information that you want to. This app will focus on tracking expenses, allowing you to see your transactions on graphs; showing daily transactions or whatever time frequency the user desires. 

## 🚀 Specification Deliverable

Expenses Easy lets you easily access your financial accounts, track expenses, and provide budgeting tools.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Worried about tracking your expenses? But every app makes no sense and you can't actually see what you want? Yeah I agree. Expenses Easy will let you see useful information about your bank accounts with a focus on your transaction history which will help you to track your expenses, and if wanted, start budgeting.

### Design

![alt text](image.png)

Simple diagram showing that the user will login, then access Plaid (the api that allows you to access your banking information), then see their charts and budgeting tools, and finally be able to use the chat to communicate with other users.

```mermaid
sequenceDiagram
    actor User
    User->>Login: Enter login information
    Login->>Account Connecting: See about connecting your financial accounts
    Account Connecting-->>Login: Login
    Account Connecting->>Account Connecting: Login to Plaid
    Login->>Dashboard: View charts of your expenses
    Dashboard->>Dashboard: Interact with charts and input budgeting info
    Dashboard-->>Login: Logout
    Login-->>Chat: talk with other users about finances
```

### Key features

- Login and logout features to allow you to access your same information different devices.
- Connect your bank and investment accounts
- Interactive graphs that allow for easy access to track your expenses
- Ability to set and track budgeting goals

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Have just two pages. One where you access your banking stuff with Plaid and the other page with the graphs and budegeting tools.
- **CSS** - I want to have interactive and beautiful graphs that help you see easily your daily expenses.
- **React** - Description here
- **Service** - Endpoints for authenticationn and storing user inputted data. Also, access to Plaid, an API that lets you access your banking data.
- **DB/Login** - Store user inputted budgeting data as well as keeping accesss to their Plaid API key.
- **WebSocket** - Provide the chat to allow users to talk to each other

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
