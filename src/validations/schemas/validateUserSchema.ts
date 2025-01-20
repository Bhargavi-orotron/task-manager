import { email, forward, InferOutput, intersect, maxLength, minLength, never, nonNullable, object, optional, partialCheck, picklist, pipe, pipeAsync, rawTransformAsync, regex, string, transform, trim, value } from "valibot";
import { EMAIL_EXISTS, EMAIL_INVALID, EMAIL_MAX_LENGTH, EMAIL_REQ, F_NAME_MAX_LENGTH, F_NAME_MIN_LENGTH, F_NAME_REQ, L_NAME_MAX_LENGTH, L_NAME_REQ, PASSWORD_INVALID, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MISMATCH, PASSWORD_REQ, PASSWORD_REQ_LOWERCASE, PASSWORD_REQ_NUMBER, PASSWORD_REQ_UPPERCASE, PHONE_MAX_LENGTH, PHONE_MIN_LENGTH, USER_TYPE_INVALID } from "../../constants/messages";

export const ValidateEmailSchema = pipe(
    nonNullable(string(EMAIL_REQ)),
    email(EMAIL_INVALID),
    trim(),
    maxLength(30,EMAIL_MAX_LENGTH)
)

export const ValidatePasswordSchema = pipe(
    nonNullable(string(PASSWORD_REQ)),
    string(),
    regex(/[A-Z]/, PASSWORD_REQ_UPPERCASE),
    regex(/[a-z]/, PASSWORD_REQ_LOWERCASE),
    regex(/[0-9]/, PASSWORD_REQ_NUMBER),
    minLength(8,PASSWORD_MIN_LENGTH),
    maxLength(30,PASSWORD_MAX_LENGTH)
)

export const ValidateUserSchema = object({
    firstName: pipe(nonNullable(string(F_NAME_REQ)),
                minLength(3,F_NAME_MIN_LENGTH),
                maxLength(40,F_NAME_MAX_LENGTH),
                trim()
    ),
    lastName: pipe(nonNullable(string(L_NAME_REQ)),
                maxLength(40,L_NAME_MAX_LENGTH),
                trim()
              ),
    middleName: optional(string()),
    email: ValidateEmailSchema,
    password: ValidatePasswordSchema,
    mobileNumber: optional(pipe(
                    string(),
                    minLength(10,PHONE_MIN_LENGTH),
                    maxLength(14,PHONE_MAX_LENGTH),
                    trim()
    )),

})