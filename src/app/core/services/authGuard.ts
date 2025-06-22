import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean | UrlTree {
        const token = localStorage.getItem('token');
        console.log(' inauth gaurd');
        if (token) {
            console.log(' mag');
            return true; // Toegang verlenen als de token aanwezig is
        } else {
            return this.router.createUrlTree(['/login']);
            // Als de token niet aanwezig is, doorsturen naar de login pagina
        }
    }
}
