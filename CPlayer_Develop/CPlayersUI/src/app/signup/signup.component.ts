import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/login/model/UserModel';
import { LoginService } from 'src/app/login/services/login.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { takeWhile, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup;
  hide = true;
  canSubscribe: boolean;
  constructor(private formBuilder: FormBuilder, private readonly router: Router, private readonly loginService: LoginService, private readonly changeDetector: ChangeDetectorRef, private readonly toastr: ToastrManager) { }

  ngOnInit() {
    this.canSubscribe = true;
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailaddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  get emailaddress() {
    return this.signupForm.get('emailaddress');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get lastname() {
    return this.signupForm.get('lastName');
  }
  get firstname() {
    return this.signupForm.get('firstName');
  }
  onRegister() {
    let user: NewUser = {
      userName: this.emailaddress.value,
      password: this.password.value,
      firstName: this.firstname.value,
      lastName: this.lastname.value
    }
    this.loginService.signUpNewUser(user).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges()
    })).subscribe((data: any) => {
      if (data) {
        this.toastr.successToastr('You have successfully created an account. Please login using your credentials', 'Success', { positionClass: 'toast-top-right' });
        this.router.navigate(['login']);
      } else {
        this.toastr.infoToastr('Something went wrong while registering.', 'Info', { positionClass: 'toast-top-right' });
      }
    }, (error: Error) => {
      this.toastr.errorToastr('Error while registering. Please try again later.', 'Error', { positionClass: 'toast-top-right' });
    });
  }
}
