import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.token = localStorage.getItem('acess_token')!;
  }


  public logar(login: any) {
    const api = environment.api + `/api/login/auth`;
    return this.http.post(api, login).pipe(map((resposta: any) => {
      console.log(resposta);
      this.token = resposta.token;
      localStorage.setItem('acess_token', this.token);
      return resposta;
    }));
  }

 // public cadastrar(usuario: Usuario): Observable<any> {
 //   const api = environment.api + 'api/user/register';
 //   return this.http.post(api, usuario);
 // }

  public sair() {
    localStorage.removeItem('acess_token');
    this.router.navigateByUrl('home');
    this.token = null;
  }

  public verificaToken(){
    if(localStorage.getItem('acess_token') === undefined){
    }else{
      localStorage.removeItem('acess_token');
      this.token = null;
    }
  }
}
