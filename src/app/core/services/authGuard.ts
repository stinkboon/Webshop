import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean | UrlTree {
        const token = localStorage.getItem('token');
        console.log(' inauth gaurd');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); 

            if (decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
                localStorage.removeItem('token'); // Verwijder de verlopen token

                // Als de token is verlopen, doorsturen naar de login pagina
                console.log('Token is verlopen');
                return this.router.createUrlTree(['/login']);
            }
            // Als de token aanwezig is en niet verlopen, toegang verlenen
            console.log('Token is geldig');

            return true; 
        } else {
            return this.router.createUrlTree(['/login']);
            // Als de token niet aanwezig is, doorsturen naar de login pagina
        }
    }
}
