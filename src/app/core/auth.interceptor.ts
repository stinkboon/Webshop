import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log('token toegevoegd');
        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(authReq);
    }

    return next(req);
};