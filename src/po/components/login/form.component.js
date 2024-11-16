import BaseComponent from '../common/base.component';

class Form extends BaseComponent {
  constructor() {
    super('form');
  }

  get errorMessageField() {
    return this.rootEl.$('[data-test="error"]');
  }

  get loginBtn() {
    return this.rootEl.$('#login-button');
  }
  /**
   *
   * @param name {'username' | 'password'}
   * @returns 'string'
   */
  input(name) {
    const selectors = {
      username: '#user-name',
      password: '#password',
    };

    return this.rootEl.$(selectors[name.toLowerCase()]);
  }

  async clearInput() {
    await browser.keys(['Control', 'a']);
    await browser.keys('Backspace');
  }
}
export default Form;
