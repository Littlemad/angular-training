import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'list',
    standalone: true,
    templateUrl: './list.html',
    encapsulation: ViewEncapsulation.None
})
export class ListComponent {
    @Input() listArray: any[] = [];
}
