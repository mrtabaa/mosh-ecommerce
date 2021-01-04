import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TypeCategoryValidators {
    categoryList: string[];

    public set Categories(categories: string[]) {
        this.categoryList = categories;
    }

    // check Type uniqueness
    static checkUniqueType(types: string[]): ValidationErrors | null {
        return (control: AbstractControl) => {
            if (types && types.includes((control.value as string).toLowerCase())) {
                return { uniqueType: true };
            }
            return null;
        };
    }

    // check Category uniqueness
    static checkUniqueCategory(group: AbstractControl): ValidationErrors | null {
        const newCategory = group.get('newCategory').value as string;
        const categories = group.get('categoriesCtrl').value as string[];

        if (categories && newCategory) {
            if (categories.includes(newCategory)) {
                return { notUniqueCategory: true };
            }
        }
        return null;
    }
}
