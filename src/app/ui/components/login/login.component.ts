import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserAuthServiceService } from 'src/app/services/common/models/user-auth-service.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuthService: UserAuthServiceService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.Timer);
      await userAuthService.googleLogin(user, () => {
        authService.identityCheck();


        this.hideSpinner(SpinnerType.Timer)
      });
    });
  }

  ngOnInit(): void {
  }

  async login(userNameorEmail: string, password: string) {
    this.showSpinner(SpinnerType.Timer);
    await this.userAuthService.login(userNameorEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl) {
          this.router.navigate([returnUrl])
        }
      });
      this.hideSpinner(SpinnerType.Timer);
    });
  }
}
