import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Observable, map, tap } from "rxjs";



const checkAuthStatus = (): boolean | Observable<boolean> => {

  //se inyectan el AuthService y el Router

  const authService: AuthService = inject(AuthService);

  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated:', isAuthenticated)),
      tap(( isAuthenticated ) => {
        if ( isAuthenticated ) {
        router.navigate(['./']);
       }
      }),
      map( isAuthenticated => !isAuthenticated) //es necesario pasar a false pq si no una vez deslogueado, queda en false y no te permite entrar al login 
    );
};


export const canActivatePublicGuard: CanActivateFn = (

  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>  {
        console.log( 'Can Activate');
        console.log({ route, state});
        return checkAuthStatus();
      }


export const canMatchPublicGuard: CanMatchFn = (

  route: Route,
  segments: UrlSegment[]
) =>  {
        console.log( 'Can Match');
        console.log({ route, segments});
        return checkAuthStatus();
      }
