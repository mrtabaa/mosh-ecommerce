import { ContentObserver } from '@angular/cdk/observers';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NewProductValidators {

    // Validate form if all necessary fields are valid
    static validateForm(form: AbstractControl): ValidationErrors | null {
        const type = form.get('type');
        const category = form.get('category');
        const title = form.get('title');
        const price = form.get('price');
        const imageUrl = form.get('imageUrl');

        return !(type.valid && category.valid && title.valid && price.valid && imageUrl.valid)
            ? { invalidForm: true }
            : null;
    }

    // check Type uniqueness
    static checkUniqueType(types: string[]): ValidationErrors | null {
        return (control: AbstractControl) => {
            if (types && types.includes(control.value)) {
                return { uniqueType: true };
            }
            return null;
        };
    }
    // check if newType/newCategory length > 0, else doesn't add the item
    static checkNewTypeCategoryAdded(control: AbstractControl): ValidationErrors | null {
        return control.value && (control.value as string).length < 2
            ? { newItemNotAdded: true }
            : null;
    }

    // check Category uniqueness
    static checkUniqueCategory(group: AbstractControl): ValidationErrors | null {
        const newCategory = group.get('newCategory').value as string;
        const categories = group.get('categoriesCtrl').value as string[];

        if (categories && newCategory) {
            if (categories.includes(newCategory.toLowerCase())) {
                return { uniqueCategory: true };
            }
        }
        return null;
    }

    // If Category is clicked and Type is not selected
    static checkNoTypeSelectedCategory(group: AbstractControl): ValidationErrors | null {
        const type = group.get('type');
        const category = group.get('category');

        return category && type.invalid ? { noPrerequisiteSelected: true } : null;
    }

    // check positive Price validation
    static checkPrice(control: AbstractControl): ValidationErrors | null {
        if (control && control.value) {
            const value = control.value;
            if (/[^0-9]/.test(value[value.length - 1]) || value === '0.0' || value === '0.000') {
                return { invalidPrice: true };
            }
        }
        return null;
    }
}
