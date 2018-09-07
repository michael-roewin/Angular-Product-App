import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../product';
import { Category } from '../category';
import cloneDeep from 'lodash/cloneDeep';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';


@Component({
  'selector': 'product-form',
  'templateUrl': 'product-form.html',
  'styleUrls': ['product-form.css']
})
export class ProductForm implements OnInit {

  product:Product;
  categories: Array<Category>;
  faCircleNotch = faCircleNotch;

  formAlert = {
    type: 'success',
    msg: '',
  };

  showLoader = false;

  constructor(private _productService: ProductService, private _categoryService: CategoryService, private _authService: AuthService, private route: ActivatedRoute, private _router: Router) {

  }

  ngOnInit() {

    this.product = {
      id: null,
      name: null,
      description: null,
      price: null,
      available: null,
      category_id: null,
    };

    let productID = this.route.snapshot.params.id;

    this.getCategories();

    if(productID)
      this.getProduct(productID);
      
  }

  getCategories() {

    let params = {
      orderBy: 'name',
      order: 'ASC',
    };

    this._categoryService.getCategories(params).subscribe(
      (response) => {
        this.categories = response.categories;
      },
      (response) => {
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    )
  }

  getProduct(productID) {
    this.showLoader = true;
    this._productService.getProduct(productID).subscribe(
      (response) => {
        this.product = response.product;
        
        if(this.product.category_id) {
          let categoryID = this.product.category_id.toString();
          this.product.category_id = parseInt(categoryID);
        }
      },
      (response) => {
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    )
  }

  saveProduct() {
    var request;

    var product = cloneDeep(this.product);

    this.showLoader = true;
    
    if(!this.product.id) {
      request = this._productService.createProduct(product);
    } else {
      request = this._productService.updateProduct(product);
    }
    
    request.subscribe(
      (response) => {
        if(!this.product.id) {
          localStorage.setItem('created', '1');
          this._router.navigate(['/products']);
        }
        this.formAlert.msg = 'Product Succesfully ' + (this.product.id ? 'Updated' : 'Created');
      },
      (response) => {

        this.formAlert.type = 'danger';

        if(response.error) {
          if(response.error.errors != undefined) {
            this.formAlert.msg = response.error.errors.join('<br>');
          } else {
            this.formAlert.msg = 'Unknown Error Occured';
          }
        }

        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    )
  }

  logout() {
    this._authService.logout();
  }

};