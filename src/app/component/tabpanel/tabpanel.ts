import { Component, ContentChildren, QueryList, TemplateRef, ViewEncapsulation, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tabpanel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tabpanel.html',
    styleUrl: './tabpanel.scss',
    encapsulation: ViewEncapsulation.None
})
export class TabpanelComponent {
    @ContentChildren('tabTitle') tabTitles!: QueryList<TemplateRef<any>>;
    @ContentChildren('tabContent') tabContents!: QueryList<TemplateRef<any>>;

    activeTabIndex = signal(0);
    uniqueId = Math.random().toString(36).substring(2, 9);

    setActiveTab(index: number) {
        this.activeTabIndex.set(index);
    }
}
