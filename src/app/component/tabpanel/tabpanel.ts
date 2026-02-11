import { Component, ContentChildren, inject, QueryList, TemplateRef, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniqueIdService } from '../../services/unique-id.service';

@Component({
    selector: '[tabpanel]',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tabpanel.html',
    styleUrl: './tabpanel.scss',
    encapsulation: ViewEncapsulation.None
})
export class TabpanelComponent {
    private readonly uniqueIdService = inject(UniqueIdService);

    @ContentChildren('tabTitle') tabTitles!: QueryList<TemplateRef<any>>;
    @ContentChildren('tabContent') tabContents!: QueryList<TemplateRef<any>>;

    activeTabIndex = signal(0);
    readonly uniqueId = this.uniqueIdService.generate();

    setActiveTab(index: number) {
        this.activeTabIndex.set(index);
    }
}
