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
