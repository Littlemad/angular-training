import { Component, forwardRef, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: '[app-input]',
    standalone: true,
    templateUrl: './input.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    @Input() errorId = '';
    @Input() id = '';
    @Input() invalid = false;
    @Input() label = '';
    @Input() name = '';
    @Input() required = false;
    @Input() type = 'text';

    @Output() blur = new EventEmitter<void>();

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

    onBlur(): void {
        this.onTouched();
        this.blur.emit();
    }
}
