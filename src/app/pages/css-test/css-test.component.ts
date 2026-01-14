import { Component } from '@angular/core';
import { CssVariablesService } from '../../services/css-variables.service';

@Component({
    selector: 'app-css-test',
    standalone: true,
    template: `
        <div class="css-test-container">
            <h3>CSS Variables Test</h3>
            <div class="color-grid">
                @for (color of colors; track color.var) {
                    <div
                        class="color-swatch"
                        [style.background-color]="
                            'var(--color-' + color.var + ')'
                        "
                        [title]="color.name + ': ' + color.value">
                        <span class="color-name">{{ color.name }}</span>
                        <span class="color-var">--color-{{ color.var }}</span>
                    </div>
                }
            </div>

            <div class="link-test">
                <h4>Link Variables Test</h4>
                @for (link of links; track link.var) {
                    <a
                        href="#"
                        class="test-link"
                        [style.color]="'var(--color-' + link.var + ')'"
                        [title]="link.name + ': --color-' + link.var">
                        {{ link.name }}
                    </a>
                }
            </div>
        </div>
    `,
    styles: [
        `
            .css-test-container {
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
            }

            .color-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 10px;
                margin: 20px 0;
            }

            .color-swatch {
                height: 80px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                border: 1px solid var(--color-grey);
                color: var(--color-black);
                font-size: 12px;
            }

            .color-name {
                font-weight: bold;
                margin-bottom: 4px;
            }

            .color-var {
                font-family: monospace;
                background: var(--color-white);
                border: 1px solid var(--color-grey-d1);
                padding: 2px 4px;
                border-radius: 3px;
            }

            .link-test {
                margin-top: 30px;
            }

            .link-test h4 {
                margin-bottom: 15px;
            }

            .test-link {
                text-decoration: none;
                margin-right: 20px;
            }
        `,
    ],
})
export class CssTestComponent {
    colors: any[] = [];
    links: any[] = [];

    constructor(private cssVariablesService: CssVariablesService) {
        this.colors = this.cssVariablesService.getColors();
        this.links = this.cssVariablesService.getLinks();
    }
}
