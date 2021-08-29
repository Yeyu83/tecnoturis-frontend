import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  public form: FormGroup

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeated: [''],
    })
    this.form.get('passwordRepeated').setValidators([
      Validators.required,
      this.equalsValidator(this.form.get('password'))
    ]);
  }

  private equalsValidator(otherControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const otherValue = otherControl.value;
      return otherValue === value ? null : { 'notEquals': true };
    };
  }

  public register(): void {
    const { name, password } = this.form.controls
    const user: User = { name: name.value, password: password.value }
    this.usersService.register(user).subscribe((userRegistered: User) => {
      console.log(userRegistered);
      window.alert(JSON.stringify(userRegistered))
    })
  }
}
