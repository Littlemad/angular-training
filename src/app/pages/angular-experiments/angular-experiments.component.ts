import { Component } from '@angular/core';
import { ContentProjectionComponent } from './content-projection/content-projection.component';

@Component({
  selector: 'app-angular-experiments',
  standalone: true,
  imports: [ContentProjectionComponent],
  templateUrl: './angular-experiments.component.html',
  styleUrl: './angular-experiments.component.scss',
})
export class AngularExperimentsComponent {}
