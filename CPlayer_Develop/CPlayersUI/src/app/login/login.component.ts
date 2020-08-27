import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/services/login.service';
import { UserAuthentication } from 'src/app/login/model/UserModel';
import { takeWhile, finalize } from 'rxjs/operators'
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  canSubscribe: boolean;

  constructor(private readonly loginService: LoginService, private readonly changeDetector: ChangeDetectorRef, private readonly toastr: ToastrManager, private readonly router: Router) { }

  ngOnInit() {
    this.canSubscribe = true;
    this.loginForm = new FormGroup({
      emailaddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      checkbox: new FormControl()
    });
  }
  get emailaddress() {
    return this.loginForm.get('emailaddress');
  }
  get password() {
    return this.loginForm.get('password');
  }
  authenticateUser() {
    let user: UserAuthentication = {
      userName: this.emailaddress.value,
      password: this.password.value
    }
    this.loginService.authenticateUser(user).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges()
    })).subscribe((data: any) => {
      if (data) {
        this.toastr.successToastr('Login successful', 'Success', { positionClass: 'toast-top-right' });
        this.router.navigate(['players/search']);
      } else {
        this.toastr.infoToastr('Something went wrong while login.', 'Info', { positionClass: 'toast-top-right' });
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.toastr.errorToastr('Your credentials are incorrect. Please check either userName and password.', 'Error', { positionClass: 'toast-top-right' });
      } else {
        this.toastr.errorToastr('Error while logging. Please try again later.', 'Error', { positionClass: 'toast-top-right' });
      }
    });

  }
 }


