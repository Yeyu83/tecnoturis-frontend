import { Hotel } from './../../interfaces/hotel.interface';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  columns = ['name', 'rating']

  dataSource = null

  constructor(
    private hotelsService: HotelsService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const state = this.location.getState()
    if (!(state as any).userLogged) {
      window.alert('¡Primero ha de loguearse!')
      this.router.navigate(['/'])
    } else {
      this.getHotels()
    }
  }

  public filter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  private getHotels(): void {
    this.hotelsService.getHotels()
      .pipe(map((res: any) => res.hotels.map((item: any) => item.hotel)))
      .subscribe((res: any) => {
        const hotels: Hotel[] = res
          .map((x: any) => ({ name: x.name, rating: x.rating }))
        this.dataSource = new MatTableDataSource(hotels)
      })
  }
}
