import { Component, ViewEncapsulation } from '@angular/core';
import { ContentProjectionComponent } from './content-projection/content-projection.component';
import { CssTestComponent } from '../../component/css-test/css-test.component';
import { CssDebugComponent } from '../../component/css-debug/css-debug.component';

@Component({
    selector: 'section[pageAngularExperiments]',
    standalone: true,
    imports: [ContentProjectionComponent, CssTestComponent, CssDebugComponent],
    templateUrl: './angular-experiments.page.html',
    encapsulation: ViewEncapsulation.None,
})
export class PageAngularExperimentsComponent {}

