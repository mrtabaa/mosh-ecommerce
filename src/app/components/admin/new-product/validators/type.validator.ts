import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TypeValidator {

    // check Type uniqueness
    static checkUniqueType(types: string[]): ValidationErrors | null {
        return (control: AbstractControl) => {
            console.log(types);
            if (types && types.includes((control.value as string).toLowerCase())) {
                return { typeNotUnique: true };
            }
            return null;
        };
    }
}
