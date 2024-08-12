import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDeleteButtonComponent } from '../m-delete-button/m-delete-button.component';

@Component({
  selector: 'm-table',
  standalone: true,
  imports: [CommonModule, MDeleteButtonComponent],
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.css']  // Fixed typo here
})
export class MTableComponent {
  @Input() data: any[] = [];
  @Input() filterTerm: string = '';
  @Input() showDeleteButton: boolean = false;
  @Input() showMoreDetails: boolean = false;
  @Input() showCaption: boolean = false;
  @Input() caption: string = 'Table Caption';
  @Input() tableHeaders: string[] = [];

  @Output() remove: EventEmitter<number> = new EventEmitter<number>();
  @Output() navigate: EventEmitter<any> = new EventEmitter<any>();  // Updated to emit any type

  private originalData: any[] = [];

  constructor() {}

  getObjectKeys(obj: any): string[] {
    if (!obj) {
      return [];
    }
    return Object.keys(obj);
  }

  showDetails(item: any) {  // Updated to accept the entire item
    this.navigate.emit(item);
  }

  removeItem(itemId: number) {
    this.remove.emit(itemId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.originalData = [...this.data];
    }

    if (changes['filterTerm'] && this.filterTerm !== undefined) {
      this.filterData(this.filterTerm);
    }
  }

  filterData(searchTerm: string): void {
    if (!searchTerm) {
      this.data = [...this.originalData];
    } else {
      this.data = this.originalData.filter(item =>
        Object.values(item).some((value: any) =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
      );
    }
  }
}
