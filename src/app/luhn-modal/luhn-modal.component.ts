import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import PhoneNumber from 'awesome-phonenumber';
import {ISO_3166_1_CODES} from './country-codes';
import {validate} from 'luhn';

@Component({
  selector: 'app-luhn-modal',
  templateUrl: './luhn-modal.component.html',
  styleUrls: ['./luhn-modal.component.css']
})

export class LuhnModalComponent implements OnInit {
  first_name: string;
  last_name: string;
  email: string;
  identi_number: string;
  physical_address: string;
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailErrorMatcher = new EmailErrorStateMatcher();
  identiFormControl = new FormControl('', [Validators.required, identiValidator()]);
  identiErrorMatcher = new IdentiErrorStateMatcher();
  countyCodes = ISO_3166_1_CODES;
  profileForm = this.fb.group({
      phone: this.fb.group({
          country: ['US'],
          number: ['']
      })
  });
  phoneErrorMatcher = new PhoneErrorMatcher();

  constructor(private fb: FormBuilder) {
    this.first_name = "";
    this.last_name = "";
    this.email = "";
    this.identi_number = "";
    this.physical_address = "";
  }

  ngOnInit() {
  }

  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
  }

  get phoneNumberDigits(): string {
    return this.phoneNumberControl.value.replace(/\D/g, '');
  }

  /**
   * Return an {@see PhoneNumber} value created from the
   * phoneNumberDigits and currently selected country code.
   */
  get phoneNumber(): PhoneNumber {
      return new PhoneNumber(this.phoneNumberDigits, this.phoneCountryControl.value);
  }

  /**
   * Formats the phone number digits using the 'national' format
   * from awesome-phonenumber.
   */
  formatNumber() {
      const natNum = this.phoneNumber.getNumber('national');
      this.phoneNumberControl.setValue((natNum) ? natNum : this.phoneNumberDigits);
  }

  /**
   * Generate a hint using the {@see PhoneNumber} getExample method
   * with the currently selected country.
   */
  get phoneHint(): string {
      return PhoneNumber.getExample(this.phoneCountryControl.value).getNumber('national');
  }

  /**
   * Get the [E.164]{@link https://en.wikipedia.org/wiki/E.164} formatted
   * phone number typically required by systems for making calls and
   * sending text messages.
   */
  get phoneE164(): string {
      return this.phoneNumber.getNumber('e164');
  }

  // FormControl Getters
  get phoneGroup() {
      return this.profileForm.get('phone') as FormControl;
  }

  get phoneCountryControl() {
      return this.profileForm.get('phone.country') as FormControl;
  }

  get phoneNumberControl() {
      return this.profileForm.get('phone.number') as FormControl;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export class IdentiErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


export class PhoneErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control?.value && control?.touched && !control?.parent?.valid);
    }
}

export function identiValidator(){
  return (control: FormControl): ValidationErrors | null => {
    const valid = validate(control.value);
    return !valid ? {identi: {value: control.value}} : null;
  };
}