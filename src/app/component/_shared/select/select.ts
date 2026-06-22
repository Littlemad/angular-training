import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: '[app-select]',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './select.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        }
    ]
})
export class SelectComponent implements ControlValueAccessor {
    @Input() id = '';
    @Input() label = '';
    @Input() options: string[] = [];

    value = '';

    onChange = (_: string) => {};
    onTouched = () => {};

    writeValue(value: string): void {
        this.value = value ?? '';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
