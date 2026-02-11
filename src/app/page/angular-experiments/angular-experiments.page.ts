import { Component, ViewEncapsulation } from '@angular/core';
import { ContentProjectionComponent } from './content-projection/content-projection.component';

@Component({
    selector: 'section[pageAngularExperiments]',
    standalone: true,
    imports: [ContentProjectionComponent],
    templateUrl: './angular-experiments.page.html',
    encapsulation: ViewEncapsulation.None,
})
export class PageAngularExperimentsComponent {}

