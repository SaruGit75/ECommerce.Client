import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(userNameorEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameorEmail, password })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    debugger;
    if (tokenResponse) {
      console.log(tokenResponse.token)
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı!", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopCenter
      });
    }

    callBackFunction();
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {

    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    debugger;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.toastrService.message("Signed In with Google...", "Google Sign In", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopCenter
      });
    }

    callBackFunction();

  }
}
