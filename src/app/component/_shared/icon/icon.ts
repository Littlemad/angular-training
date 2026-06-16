import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[icon]',
    standalone: true,
    templateUrl: './icon.html',
    encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
    @Input() name = '';
    @Input() altText = '';

    /** Cache-busted sprite URL (one random per page load) */
    private static readonly spriteUrl = `/img/icons.svg?v=${Math.random()}`;
    readonly url = IconComponent.spriteUrl;
}
