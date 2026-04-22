import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { IPropertyBase } from '../../models/ipropertybase';



// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FormsModule, CommonModule, TabsModule, ButtonsModule, BsDatepickerModule, PropertyCardComponent, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  //without passing form as a variable in onsubmit method we can use viewchild
  //WE CAN PASS TEMPLATE VARIABLE NAME HERE AT VIEWchild
  // @ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs', { static: false }) formTabs!: TabsetComponent;
  //will come from masters table
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  // propertyView = {};
  propertyView: IPropertyBase = {
    Id: 0,
    SellRent: 1,
    Name: '',
    PType: '',
    Price: 0,
    FType: '',
    BHK: 0,
    BuiltArea: 0,
    City: '',
    RTM: 0
  };

  addPropertyForm!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    //form control tree is not initiated that's why we will get can't read 
    // propertis of undefined controls, tdf has two processes
    //1.#Form=ngForm directive which is responsible for instanciating the
    //controls tree and another one is ngOnInit life cycle event running in parallel
    //so these ngOnInit and ngForm executed as an asynchronous process
    //that's why below statem,ent didn't wait untill directive process was finished
    //so use some wait here by using set timming function used for basucally some time
    //setTimeout function is waiting for a no.of milleseconds before executing a code

    // this.addPropertyForm.controls['Name'].setValue('default value');// tdf for asynchronous nature
    // setTimeout(() => {
    //   this.addPropertyForm.controls['Name'].setValue('default value');
    // },1000);
    this.createAssPropertyForm();
  }
  createAssPropertyForm() {
    this.addPropertyForm = this.fb.group({
      //nested group in reactive forms
      BasicInfo: this.fb.group({
        SellRent: [null, Validators.required],
        PType: [null, Validators.required],
        Name: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required]
      })

    });
  }

  onBack() {
    this.router.navigate(['/']);
  }

  // onSubmit(Form: NgForm) {
  //   console.log('congrats, form submitted successfully');
  //   console.log(Form);
  // }

  onSubmit() {
    console.log('congrats, form submitted successfully');
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
    // this.formTabs.tabs[tabId].active = true;
  }
}
