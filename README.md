
# Login Feature Automation Tests

## Description  
This project automates the testing of the login feature using WebdriverIO, Mocha, and Cucumber.js, verifying login functionality with correct and incorrect credentials.

---

## Features  
- Automated testing for login functionality.  
- Tests for correct and incorrect login credentials.  
- Utilizes TDD and BDD methodologies.  
- Implements the Page Object Model (POM) for better test structure and reusability.  
- Supports multi-browser testing (Chrome, Microsoft Edge, and Firefox).  

---

## Technology Stack  
- **WebdriverIO (WDIO)**: Automation framework for browser testing.  
- **Mocha**: Test framework used for running tests.  
- **Cucumber.js**: BDD testing framework for writing feature files.  
- **Page Object Model (POM)**: Design pattern for organizing test code.  
- **Node.js**: JavaScript runtime.  
- **NPM**: Package manager for handling dependencies.  
- **Other Dependencies**:
  - `@cucumber/cucumber`: Cucumber's core library.
  - `@wdio/cucumber-framework`: Integration of WebdriverIO with Cucumber.
  - `@wdio/mocha-framework`: Mocha integration for WebdriverIO.
  - `@wdio/local-runner`: Runs WebdriverIO tests locally.
  - `@wdio/dot-reporter`: Dot-based test reporting.
  - `@wdio/spec-reporter`: Specification-based test reporting.

---

## Installation  
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Configure the browser for testing:  
   By default, the tests run in Chrome. To change the browser, update the `browserName` in the configuration file (`wdio.conf.js` or `wdio.bdd.conf.js`):  
   ```javascript
   capabilities: [
     {
       maxInstances: 1,
       browserName: 'firefox', // Change to 'chrome' or 'MicrosoftEdge' as needed
       acceptInsecureCerts: true
     }
   ]
   ```

5. Run the tests using either TDD or BDD:
   - For TDD:
     ```bash
     npm run wdio:tdd
     ```
   - For BDD:
     ```bash
     npm run wdio:bdd
     ```

---

## Folder Structure  

```plaintext
TDD_BDD_TASK/   
├── node_modules/           # Installed dependencies  
├── src/                    # Main source folder  
│   ├── configs/            # Configuration files for WebDriverIO  
│   │   ├── wdio.bdd.conf.js  
│   │   ├── wdio.conf.js  
│   │  
│   ├── features/           # Feature files for BDD  
│   │   └── login.feature  
│   │  
│   ├── po/                 # Page Object folder  
│   │   ├── components/     # Reusable UI components  
│   │   │   ├── common/  
│   │   │   │   └── base.component.js  
│   │   │   ├── login/  
│   │   │   │   └── form.component.js  
│   │   │   └── products/  
│   │   │       └── products-header.component.js  
│   │   └── pages/          # Page objects for specific application pages  
│   │       ├── index.js  
│   │       ├── login.page.js  
│   │       └── products.page.js  
│   │  
│   ├── step-definitions/   # Step definitions for BDD scenarios  
│   │   └── login.steps.js  
│   │  
│   └── tests/              # Test scripts  
│       └── simple.tests.js  
├── .gitignore              # Git ignore file  
├── package-lock.json       # Lockfile for dependencies  
├── package.json            # NPM package file  
└── README.md               # Documentation file  
```

---

## Code Examples  

### Feature File Example  
This is an example of a feature file (`login.feature`) written in Gherkin syntax:

```gherkin
Feature: Login Form Validation

  Scenario: Display "Username is required" error after clearing credentials and clicking login
    Given I am on the login page
    When I enter the username "HarryPotter" and password "harryPotter.123"
    And I clear the username field
    And I clear the password field
    And I click the login button
    Then I should see the error message "Username is required"

  Scenario: Successfully login with correct credentials and show the app logo
    Given I am on the login page
    When I enter the username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should see the app logo
```

---

### Step Definitions Example  
The step definitions (`login.steps.js`) map the Gherkin steps to WebDriverIO commands:

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

Then('I should see the error message {string}', async (expectedMessage) => {
  const loginPage = pageMap('login');
  const errorText = await loginPage.form.errorMessageField.getText();
  expect(errorText).toContain(expectedMessage);
});
```

---

### Page Object Example  
This is the implementation of the `Login` page (`login.page.js`) using the Page Object Model (POM):

```javascript
import { Form } from '../components';

class Login {
  constructor() {
    this.url = '/';
    this.form = new Form();
  }

  async open() {
    await browser.url(this.url);
  }
}

export default Login;
```

---

## Contributing  
1. Fork the repository.  
2. Create a new branch for your feature or bugfix.  
3. Make your changes.  
4. Run tests to ensure everything works.  
5. Submit a pull request with a clear description of the changes.

---

## License  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
