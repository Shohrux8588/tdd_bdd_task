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
