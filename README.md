
# WebdriverIO Test Suite

A project using [WebdriverIO](https://webdriver.io/) to automate browser-based tests with support for both TDD and BDD frameworks.

---

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)
- [Reporting](#reporting)
- [BDD with Cucumber.js](#bdd-with-cucumberjs)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

This repository contains automated tests to ensure application quality and functionality across browsers. The tests are structured using both TDD (Test-Driven Development) and BDD (Behavior-Driven Development) frameworks for maximum flexibility.

---

## Prerequisites

Before running the tests, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version >= 16)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Web browsers (e.g., Chrome, Firefox)

---

## Installation

Clone this repository and install the required dependencies:

```bash
git clone <repository_url>
cd <repository_name>
npm install
```

---

## Available Scripts

| Script                          | Description                                   |
|---------------------------------|-----------------------------------------------|
| `npm run test:wdio:tdd`         | Run TDD tests.                               |
| `npm run test:wdio:tdd:chrome`  | Run TDD tests specifically on Chrome.        |
| `npm run test:wdio:tdd:firefox` | Run TDD tests specifically on Firefox.       |
| `npm run test:wdio:bdd`         | Run BDD tests.                               |


---

## Configuration

### WebdriverIO Configuration Files
- **`wdio.conf.js`**: Configuration file for TDD tests.
- **`wdio.bdd.conf.js`**: Configuration file for BDD tests.

### Browser-Specific Capabilities
The default configuration includes support for Chrome and Firefox. Additional capabilities can be added or modified in the respective `.conf.js` files.

---

## Running Tests

Run tests using the scripts defined in the `package.json` file:

- **General TDD Tests**:
  ```bash
  npm run test:wdio:tdd
  ```

- **TDD Tests on Chrome**:
  ```bash
  npm run test:wdio:tdd:chrome
  ```

- **TDD Tests on Firefox**:
  ```bash
  npm run test:wdio:tdd:firefox
  ```

- **BDD Tests**:
  ```bash
  npm run test:wdio:bdd
  ```

---

## Folder Structure

```plaintext
├── node_modules            # Dependencies installed via npm
├── src
│   ├── configs             # WebdriverIO configuration files
│   │   ├── wdio.bdd.conf.js   # Configuration for BDD tests
│   │   ├── wdio.conf.js       # Configuration for TDD tests
│   ├── features            # BDD feature files
│   │   ├── login.feature    # Scenarios for login functionality
│   ├── po                  # Page Object model implementation
│   │   ├── components      # Reusable UI components
│   │   │   ├── common      # Common/shared components
│   │   │   ├── login       # Components for the login page
│   │   │   ├── products    # Components for the products page
│   │   ├── pages           # Full-page objects
│   │   │   ├── index.js       # Entry point for page objects
│   │   │   ├── login.page.js  # Login page-specific methods
│   │   │   ├── products.page.js # Products page-specific methods
│   │   ├── step-definitions # Step definitions for BDD tests
│   │   │   ├── login.steps.js # Steps for login.feature
├── tests                  # General test cases (e.g., TDD tests)
│   ├── simple.tests.js     # Example test file
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Lock file for dependencies
├── README.md              # Project documentation
```

---

## Reporting

This project uses reporters for detailed test results:
- **Spec Reporter**: Included by default to display results in the terminal.
- **Dot Reporter**: Provides minimalistic output.

Additional reporting tools like Allure can be configured if needed.

---
TDD Test (Mocha): The TDD tests are written using Mocha, which are focused on unit and integration testing.

BDD Test (Cucumber.js): The BDD tests are written using Cucumber.js with Mocha as the test framework for behavior-driven development.

## BDD with Cucumber.js

In **BDD**, tests are written using **Gherkin syntax** for a more descriptive approach. The tests are executed using **Cucumber.js** to run feature files with step definitions written in JavaScript.

Here is the BDD equivalent of the TDD login tests using **Cucumber.js**:

#### Feature: Login functionality

```gherkin
Feature: Login Form Validation

  Scenario: Display "Username is required" error after clearing credentials and clicking login
    Given I am on the login page
    When I enter the username "HarryPotter" and password "harryPotter.123"
    And I clear the username field
    And I clear the password field
    And I click the login button
    Then I should see the error message "Username is required"

  Scenario: Display "Password is required" error after clearing password and clicking login
    Given I am on the login page
    When I enter the username "HarryPotter" and password "harryPotter.123"
    And I clear the password field
    And I click the login button
    Then I should see the error message "Password is required"

  Scenario: Successfully login with correct credentials and show the app logo
    Given I am on the login page
    When I enter the username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should see the app logo

```

#### Step Definitions for Cucumber.js

In Cucumber.js, step definitions are used to map the Gherkin steps to JavaScript code that interacts with the application.

```javascript
import { Given, Then, When } from '@wdio/cucumber-framework';
import { pageMap } from '../po/pages';

Given('I am on the login page', async () => {
  await pageMap('login').open();
});

When('I enter the username {string} and password {string}', async (username, password) => {
  const loginPage = pageMap('login');
  await loginPage.form.input('username').setValue(username);
  await loginPage.form.input('password').setValue(password);
});

When('I clear the username field', async () => {
  const loginPage = pageMap('login');
  await loginPage.form.input('username').click(); // Focus on username field
  await loginPage.form.clearInput(); // Clear the username field
});

When('I clear the password field', async () => {
  const loginPage = pageMap('login');
  await loginPage.form.input('password').click(); // Focus on password field
  await loginPage.form.clearInput(); // Clear the password field
});

When('I click the login button', async () => {
  const loginPage = pageMap('login');
  await loginPage.form.loginBtn.click();
});

Then('I should see the error message {string}', async (expectedMessage) => {
  const loginPage = pageMap('login');
  await loginPage.form.errorMessageField.waitForDisplayed({ timeout: 5000 });
  const errorText = await loginPage.form.errorMessageField.getText();
  expect(errorText).toContain(expectedMessage);
});

Then('I should see the app logo', async () => {
  const productsPage = pageMap('products');
  const appLogoElement = await productsPage.productsHeader.productsHeaderLogo; // Adjusting selector for the app logo
  await expect(appLogoElement).toBeDisplayed();
});

```

This allows you to describe behaviors in a more natural way while still performing browser-based testing with **WebdriverIO** and **Cucumber.js**.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
