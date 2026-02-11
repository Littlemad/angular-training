import { Component, output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[add-play-log]',
    standalone: true,
    templateUrl: './add-play-log.html',
    styleUrl: './add-play-log.scss',
    encapsulation: ViewEncapsulation.None,
})
export class AddPlayLogComponent {
    cancel = output<void>();

    onCancel() {
        this.cancel.emit();
    }
}
