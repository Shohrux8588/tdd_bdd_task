import { pageMap } from '../po/pages';

describe('Login page', () => {
  beforeEach(async () => {
    await pageMap('login').open();
  });

  it('should display "Username is required" error after clearing credentials and clicking login', async function () {
    // Step 1: Enter dummy credentials
    await pageMap('login').form.input('username').setValue('HarryPotter');
    await pageMap('login').form.input('password').setValue('harryPotter.123');

    // Step 2: Clear the username field
    await pageMap('login').form.input('username').click(); // Focus on username field
    await pageMap('login').form.clearInput();

    // Step 3: Clear the password field
    await pageMap('login').form.input('password').click(); // Focus on password field
    await pageMap('login').form.clearInput();

    // Step 4: Click the login button
    await pageMap('login').form.loginButton.click();

    // Step 5: Wait for the error message to appear and verify it
    await pageMap('login').form.errorMessageField.waitForDisplayed({ timeout: 5000 });

    // Step 6: Assert the error message contains 'Username is required'
    const errorText = await pageMap('login').form.errorMessageField.getText();
    expect(errorText).toContain('Username is required');
  });

  it('should display "Password is required" error after clearing password and clicking login', async function () {
    // Step 1: Enter a username
    await pageMap('login').form.input('username').setValue('HarryPotter');

    // Step 2: Enter a password
    await pageMap('login').form.input('password').setValue('harryPotter.123');

    // Step 3: Clear the password field
    await pageMap('login').form.input('password').click(); // Focus on password field
    await pageMap('login').form.clearInput();

    // Step 4: Click the login button
    await pageMap('login').form.loginButton.click();

    // Step 5: Assert the error message contains 'Password is required'
    const errorText = await pageMap('login').form.errorMessageField.getText();
    expect(errorText).toContain('Password is required');
  });

  it('should successfully login with correct credentials and show the app logo', async function () {
    // Step 1: Enter the correct username
    await pageMap('login').form.input('username').setValue('standard_user');

    // Step 2: Enter the correct password
    await pageMap('login').form.input('password').setValue('secret_sauce');

    // Step 3: Click the login button
    await pageMap('login').form.loginButton.click();

    // Step 4: Assert that the app logo is displayed after successful login
    const appLogoElement = await pageMap('products').productsHeader.productsHeaderLogo; // Adjusting selector for the app logo

    await expect(appLogoElement).toBeDisplayed(); // Verifying that the app logo is visible
  });
});
