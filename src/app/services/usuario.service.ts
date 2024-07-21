import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUsuario } from '../interfaces/IUsuario';
//import { environment } from 'src/enviroments/environment';

const apiUrlUsuario = "environment.apiUrl" + "Usuario";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
constructor(private httpClient: HttpClient,
            private router: Router) { }
  logar(usuario: IUsuario) : Observable<any> {
    /*return this.httpClient.post<any>(apiUrlUsuario + "/login", usuario).pipe(
      tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        this.router.navigate(['']);
      }));*/
      return this.mockUsuarioLogin(usuario).pipe(tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
        localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
        this.router.navigate(['']);
      }));
  }
  private mockUsuarioLogin(usuario: IUsuario): Observable<any> {
    var retornoMock: any = [];
    if(usuario.email === "hello@teste.io" && usuario.senha == "123"){
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = "TokenQueSeriaGeradoPelaAPI";
      return of(retornoMock);
    }
    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }
  deslogar() {
      localStorage.clear();
      this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): IUsuario {
    var validacaoUsuario = localStorage.getItem('usuario') || '{}';
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(validacaoUsuario))
      : null;
  }

  get obterIdUsuarioLogado(): any {
    var validacaoUsuario = localStorage.getItem('usuario') || '{}';
    return localStorage.getItem('usuario')
      ? (JSON.parse(atob(validacaoUsuario)) as IUsuario).id
      : null;
  }

  get obterTokenUsuario(): string {
    var validacaoUsuario = localStorage.getItem('usuario') || '{}';
    return localStorage.getItem('token')
      ? JSON.parse(atob(validacaoUsuario))
      : null;
  }
  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}