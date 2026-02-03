import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UniqueIdService {
    /**
     * Generates a short unique id (alphanumeric).
     * @param length Number of characters (default 7).
     */
    generate(length = 7): string {
        return Math.random().toString(36).substring(2, 2 + length);
    }
}
