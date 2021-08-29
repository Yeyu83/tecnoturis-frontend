import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import { UsersService } from '../../services/users.service';
import { HotelsService } from '../../services/hotels.service';
import { User } from '../../interfaces/user.interface';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usersService: UsersService,
    private hotelsService: HotelsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hotelsService.getHotels().subscribe(res => console.log(res))
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  
  public login() {
    this.usersService.login(this.form.value)
      .pipe(map((res: any) => res.user))
      .subscribe((user: User) => {
        if (!user) {
          window.alert('¡No existe el usuario!')
        } else {
          window.alert('¡Login correcto!')
          this.router.navigate(['/dashboard'], { state: { userLogged: true } })
        }
      })
  }

  public openRegistrationDialog() {
    const dialogRef = this.dialog.open(RegistrationFormComponent)
  }

}
