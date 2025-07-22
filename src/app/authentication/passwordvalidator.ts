// src/app/validators/password-match.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const passwordMatchValidator = (
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordKey);
    const passwordRepeated = form.get(confirmPasswordKey);

    if (!password || !passwordRepeated) {
      return null;
    }

    // alleen vergelijken als beide velden iets bevatten
    if (!password.value || !passwordRepeated.value) {
      return null;
    }

    if (password.value !== passwordRepeated.value) {
      passwordRepeated.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // verwijder fout als het goed is
      if (passwordRepeated.hasError('passwordMismatch')) {
        passwordRepeated.setErrors(null);
      }
      return null;
    }
  };
};
