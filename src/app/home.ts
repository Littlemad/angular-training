import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutHome } from './layout/home/home';
import { MainNavComponent } from './layout/main-nav/main-nav';
import { FootComponent } from './layout/foot/foot';
import { CssVariablesService } from './services/css-variables.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LayoutHome, MainNavComponent, FootComponent],
    templateUrl: './home.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
    constructor(private cssVariablesService: CssVariablesService) {}
}
