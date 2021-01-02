import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TypeCategoryValidators {

    // check Type uniqueness
    static checkUniqueType(types: string[]): ValidationErrors | null {
        return (control: AbstractControl) => {
            if (types && types.includes((control.value as string).toLowerCase())) {
                return { typeNotUnique: true };
            }
            return null;
        };
    }
}
