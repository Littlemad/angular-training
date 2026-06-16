import { GoTopComponent } from './go-top/go-top';
import { ListComponent } from './list/list';
import { IconComponent } from './icon/icon';
import { SelectComponent } from './select/select';
import { CommonModule } from '@angular/common';

export const SHARED_IMPORTS = [
    CommonModule,
    GoTopComponent,
    IconComponent,
    ListComponent,
    SelectComponent,
];
