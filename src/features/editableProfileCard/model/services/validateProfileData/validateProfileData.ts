import { Profile } from 'entities/Profile'
import { ValidateProfileDataError } from '../../types/EditableProfileCardSchema';


export const validateProfileData = (profileData?: Profile) => {

    if (!profileData) {
        return [ValidateProfileDataError.NO_DATA];
    }

    const errors: ValidateProfileDataError[] = [];

    const {
        username, 
        firstname, 
        lastname, 
        age,
        country, 
        city, 
        currency
    } = profileData;

    if (!username) {
        errors.push(ValidateProfileDataError.INCORRECT_USERNAME)
    }

    if (!firstname || !lastname) {
        errors.push(ValidateProfileDataError.INCORRECT_USER_DATA)
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileDataError.INCORRECT_AGE)
    }

    if (!country || !city || !currency) {
        errors.push(ValidateProfileDataError.INCORRECT_REGIONAL_DATA)
    }

    return errors;
}