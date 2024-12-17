import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  constructor(private router: Router) {}

  goToMap(service: string) {
    this.router.navigate(['/professional-map'], { queryParams: { service } });
  }
}
