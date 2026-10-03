import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../data/site';
import { HIGHLIGHTS } from '../../data/products';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RouterLink, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly site = SITE;
  readonly highlights = HIGHLIGHTS;
}
