import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public mensagemErro: any = null;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  public form: FormGroup = new FormGroup({
    nomeAcesso: new FormControl(),
    senha: new FormControl(),
  });

  ngOnInit() {
      this.auth.verificaToken();
  }

  public login() {
    this.auth.logar(this.form.value).subscribe((resposta: any) => {
      this.auth.token = resposta.token;
      this.mensagemErro = null;
      this.router.navigateByUrl('admin');
    }, error => {
      console.log(error);
      this.mensagemErro = 'Login ou senha inválidos';
    });
  }

  public cadastrar(): void {
    this.router.navigateByUrl('cadastro');
  }

}
