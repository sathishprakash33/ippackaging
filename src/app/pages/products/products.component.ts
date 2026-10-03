import { Component } from '@angular/core';
import { SITE } from '../../data/site';
import { BAG_SIZES, PRODUCTS } from '../../data/products';
import { RevealDirective } from '../../shared/reveal.directive';
import { ProductIconComponent } from '../../shared/product-icon.component';

@Component({
  selector: 'app-products',
  imports: [RevealDirective, ProductIconComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  readonly site = SITE;
  readonly products = PRODUCTS;
  readonly sizes = BAG_SIZES;
}
