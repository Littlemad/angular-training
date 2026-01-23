import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from './component/main-nav/main-nav';
import { FootComponent } from './component/main-foot/main-foot';
import { CssVariablesService } from './services/css-variables.service';

@Component({
    selector: '[appRoot]',
    imports: [RouterOutlet, MainNavComponent, FootComponent],
    templateUrl: './home.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
    constructor(private cssVariablesService: CssVariablesService) {}
}
