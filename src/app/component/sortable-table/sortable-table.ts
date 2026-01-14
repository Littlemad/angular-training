import { Component, Input, ViewEncapsulation } from '@angular/core';

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: unknown, row: unknown) => string;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
    column: string | null;
    direction: SortDirection;
}

@Component({
    selector: 'app-sortable-table',
    standalone: true,
    templateUrl: './sortable-table.html',
    styleUrl: './sortable-table.scss',
    encapsulation: ViewEncapsulation.None,
})
export class SortableTableComponent {
    @Input() columns: TableColumn[] = [];
    @Input() data: Record<string, unknown>[] = [];

    sortState: SortState = { column: null, direction: null };

    get sortedData(): Record<string, unknown>[] {
        if (!this.sortState.column || !this.sortState.direction) {
            return this.data;
        }

        const column = this.sortState.column;
        const direction = this.sortState.direction;

        return [...this.data].sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];

            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return direction === 'asc' ? 1 : -1;
            if (bVal == null) return direction === 'asc' ? -1 : 1;

            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    sort(column: string): void {
        if (this.sortState.column !== column) {
            this.sortState = { column, direction: 'asc' };
        } else if (this.sortState.direction === 'asc') {
            this.sortState = { column, direction: 'desc' };
        } else {
            this.sortState = { column: null, direction: null };
        }
    }

    getSortIndicator(column: string): string {
        if (this.sortState.column !== column) return '';
        return this.sortState.direction === 'asc' ? ' ▲' : ' ▼';
    }

    getCellValue(row: Record<string, unknown>, col: TableColumn): string {
        if (col.render) {
            return col.render(row[col.key], row);
        }
        const value = row[col.key];
        if (value == null) return '';
        if (Array.isArray(value)) return value.join(', ');
        return String(value);
    }
}
