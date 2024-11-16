import LoginPage from './login.page';
import ProductsPage from './products.page';

/**
 *
 * @param pageName{'login' | 'products'}
 */

function pageMap(pageName) {
  const pages = {
    login: new LoginPage(),
    products: new ProductsPage(),
  };

  return pages[pageName.toLocaleLowerCase()];
}

export { LoginPage, ProductsPage, pageMap };
