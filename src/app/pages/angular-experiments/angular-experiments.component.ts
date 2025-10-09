import { Component } from '@angular/core';
import { ContentProjectionComponent } from './content-projection/content-projection.component';
import { CssTestComponent } from '../css-test/css-test.component';
import { CssDebugComponent } from '../css-debug/css-debug.component';

@Component({
  selector: 'app-angular-experiments',
  standalone: true,
  imports: [ContentProjectionComponent, CssTestComponent, CssDebugComponent],
  templateUrl: './angular-experiments.component.html',
  styleUrl: './angular-experiments.component.scss',
})
export class AngularExperimentsComponent {
}
