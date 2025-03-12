import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

//const TOKEN_HEADER='Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor
{ 
constructor(private login:LoginService){}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    // Skip token for login requests
    if (req.url.includes('/generate-token')) {
      return next.handle(req);
    }

    // Get the token from the service
    const token = this.login.getToken();

    if (token) {
        // Clone the request and set the new header
        const cloned = req.clone({
          headers: req.headers.set("Authorization", `Bearer ${token}`)
        });
  
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }
    }



//add the jwt token(localstorge) request
// let authreq=req;
// const token=this.login.getToken();
// if(token!=null)
// {
// authreq=authreq.clone({setHeaders:{Authorization:`Bearer ${token}`}
// });
// }
// return next.handle(authreq);
// }
}
export const authInterceptorProviders=[
{
provide:HTTP_INTERCEPTORS,
useClass:AuthInterceptor,
multi:true
}
];