import { Component, Input } from "@angular/core";
import { IProperty } from "../IProperty";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'app-property-card',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './property-card.component.html',
    styleUrl: './property-card.component.css'

})
export class PropertyCardComponent {
    @Input() property!: IProperty;


}