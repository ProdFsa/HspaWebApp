import { Component, Input } from "@angular/core";
// import { IProperty } from "../IProperty";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { IPropertyBase } from "../../models/ipropertybase";


@Component({
    selector: 'app-property-card',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './property-card.component.html',
    styleUrl: './property-card.component.css'

})
export class PropertyCardComponent {
    @Input() property!: IPropertyBase;//child and getting datat transfer from parent property-list
    @Input() hiddenIcons!: boolean;


}