import { Component, OnInit } from '@angular/core';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { CommonModule } from '@angular/common';
import { HousingService } from '../../services/housing.service';
import { IProperty } from '../IProperty';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [PropertyCardComponent, CommonModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;

  properties!: Array<IProperty>

  constructor(private route: ActivatedRoute, private housig: HousingService) {


  }
  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; //means we are in rent peoperty url hence we are in base url
    }
    this.housig.getAllProperties(this.SellRent).subscribe({
      next: (data) => {
        this.properties = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request completed');
      }
    });

  }
}
