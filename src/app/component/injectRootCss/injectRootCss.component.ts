import { Component, OnInit } from '@angular/core';
import { CssVariablesService } from '../../services/css-variables.service';

@Component({
  template: '', // Required, or it doesn't work
})
export class InjectRootCssComponent implements OnInit {
  constructor(private cssVariablesService: CssVariablesService) {}

  ngOnInit(): void {
	this.cssVariablesService.getData()
  }
}