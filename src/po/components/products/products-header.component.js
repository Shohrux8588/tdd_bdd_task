import BaseComponent from '../common/base.component';

class ProductsHeader extends BaseComponent {
  constructor() {
    super('.header_label');
  }

  get productsHeaderLogo() {
    return this.rootEl.$('.app_logo');
  }
}

export default ProductsHeader;
