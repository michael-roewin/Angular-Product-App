import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../product';
import { faCircleNotch, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  'selector': 'product-list',
  'templateUrl': './product-list.html',
  'styleUrls': ['product-list.css']
})
export class ProductList implements OnInit {

  products:Array<Product>;

  faCircleNotch = faCircleNotch;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  showLoader = false;
  productParams = {
    orderBy: 'products.name',
    order: 'ASC'
  }

  formAlert = {
    type: 'success',
    msg: '',
  };

  constructor(private _productService: ProductService, private _authService: AuthService, private _router: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.getProducts();

    if(localStorage.getItem('created') == '1') {
      localStorage.removeItem('created');

      this.formAlert = {
        type: 'success',
        msg: 'Product Successfully Created'
      };

      setTimeout(() => {
        this.formAlert = {
          type: 'success',
          msg: ''
        };
      }, 5000)
    }
  }

  getProducts() {
    this.showLoader = true;
    this._productService.getProducts(this.productParams)
    .subscribe(
      (response:any) => {
        this.products = response.products;
      },
      (error) => {

      },
      () => {
        this.showLoader = false;
      }
    )
  }

  sortProducts(orderBy) {

    if(!this.productParams.order || (this.productParams.orderBy != orderBy))
        this.productParams.order = 'ASC';
    else
        this.productParams.order = (this.productParams.order == 'DESC') ? 'ASC' : 'DESC';

    this.productParams.orderBy = orderBy;

    this.getProducts();
  };

  deleteProduct(productID) {
    if(confirm('Are you sure you want to delete this product?')) {
      this.showLoader = true;
      this._productService.deleteProduct(productID).subscribe(
        (response:any) => {
          this.getProducts();

          this.formAlert.type = 'success';
          this.formAlert.msg = 'Product Successfully Deleted';

          setTimeout(() => {
            this.formAlert.type = 'success';
            this.formAlert.msg = '';
          }, 5000)
        },
        (response) => {
          this.showLoader = false;
        },
        () => {
          this.showLoader = false;
        }
      )
    }
  }

  logout() {
    this._authService.logout();
  }
  
  

}