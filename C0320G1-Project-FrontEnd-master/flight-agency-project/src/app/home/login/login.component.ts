import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLoginInfo } from 'src/app/shared/models/dto/login-info';
import { AuthJwtService } from 'src/app/shared/services/auth-jwt.service'
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialAuthService } from 'node_modules/angularx-social-login';
import { TokenDto } from 'src/app/shared/models/dto/token-dto';
import { MatDialogRef } from 'node_modules/@angular/material';


declare let $: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

//Created by: Quân
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  userInfo: AuthLoginInfo;
  message = '';
  isRemember: boolean;
  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;

  constructor(
    private authJwtService: AuthJwtService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: SocialAuthService,
    public dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, validateWhitespace,
      Validators.pattern('^[a-z][a-z0-9_\\.]{2,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')]],
      password: ['', [Validators.required]],
    });

    $(".toggle-password").click(function () {

      $(this).toggleClass("fa-eye fa-eye-slash");
      let input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    $(document).ready(function () {
      $("#test").hide();
      $("#div-password").hover(function () {
        $("#test").show()
      },
        function () {
          $("#test").hide()
        }
      )
    });


  }

  onSubmit() {
    this.submitted = true;
    this.userInfo = new AuthLoginInfo(this.femail.value, this.fpassword.value);
    this.login(this.userInfo);
  }

  get femail() {
    return this.loginForm.get('email');
  }

  get fpassword() {
    return this.loginForm.get('password');
  }

  remember($event) {
    this.isRemember = $event.target.checked;
  }

  public login(userInfo) {
    this.authJwtService.attemptAuth(userInfo).subscribe(
      data => {
        this.tokenStorage.saveJwtResponse(data, this.isRemember);
      },
      error => {
        console.log('Error ', error);
        this.message = 'Tài Khoản này không đúng hoặc đã bị khóa';
      }, () => {
        this.activatedRoute.queryParamMap.subscribe(value => {
          const returnUrl = value.get('returnUrl');
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            this.isLogged = true;
            this.dialogRef.close(this.isLogged)
          }
        });
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        console.log(data);
        const tokenGoogle = new TokenDto(data.authToken, data.email, data.photoUrl);
        this.authJwtService.google(tokenGoogle).subscribe(
          res => {
            this.tokenStorage.saveJwtResponse(res, this.isRemember);
            this.isLogged = true;
            this.activatedRoute.queryParamMap.subscribe(value => {
              const returnUrl = value.get('returnUrl');
              if (returnUrl) {
                this.router.navigateByUrl(returnUrl);
              } else {
                this.isLogged = true;
                this.dialogRef.close(this.isLogged)
              }
            });

          },

          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFace = new TokenDto(data.authToken, data.email, data.photoUrl);
        this.authJwtService.facebook(tokenFace).subscribe(
          res => {
            this.tokenStorage.saveJwtResponse(res, this.isRemember);
            this.isLogged = true;
            this.activatedRoute.queryParamMap.subscribe(value => {
              const returnUrl = value.get('returnUrl');
              if (returnUrl) {
                this.router.navigateByUrl(returnUrl);
              } else {
                this.isLogged = true;
                this.dialogRef.close(this.isLogged)
              }
            });
          },
          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  logOut(): void {
    this.authService.signOut()
    this.tokenStorage.logOut();
    this.isLogged = false;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

function validateWhitespace(c: AbstractControl) {
  if (c.value !== '') {
    const isWhitespace = c.value.trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  return null;
}


