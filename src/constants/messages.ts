// --------Exception Errors --------

export const DEF_400 = 'Bad Request';
export const DEF_401 = 'Unauthorized';
export const DEF_403 = 'Forbidden';
export const DEF_404 = 'Not Found';
export const DEF_409 = 'Conflict';
export const DEF_422 = 'Unprocessable Entity';
export const DEF_500 = 'Internal Server Error';

export const DEF_MSG_400 = 'Bad Request';
export const DEF_MSG_401 = 'Unauthorized request';
export const DEF_MSG_403 = 'Forbidden request';
export const DEF_MSG_404 = 'Data not Found';
export const DEF_MSG_409 = 'Conflict occurred';
export const DEF_MSG_422 = 'Unprocessable Entity';


// --------Validation Errors --------


export const FIRST_NAME_REQ = 'First name is required';
export const FIRST_NAME_MAX_LENGTH = 'First name must be less than 40 characters';
export const FIRST_NAME_MIN_LENGTH = 'First name must be at least 3 characters';

export const LAST_NAME_REQ = 'Last name is required';
export const LAST_NAME_MAX_LENGTH = 'Last name must be less than 40 characters';


export const EMAIL_REQ = 'Email is required';
export const EMAIL_INVALID = 'Email is invalid';
export const EMAIL_MAX_LENGTH = 'Email must be less than 30 characters';
export const EMAIL_EXISTS = 'Email already exists';
export const EMAIL_NOT_EXISTS = 'User not found with the given email';

export const PASSWORD_REQ = 'Password is required';
export const PASSWORD_INVALID = 'Password is invalid';
export const PASSWORD_MIN_LENGTH = 'Password must be at least 8 characters';
export const PASSWORD_MAX_LENGTH = 'Password must be less than 30 characters';
export const PASSWORD_NOT_MATCH = 'Password does not match';
export const PASSWORD_REQ_LOWERCASE = 'Password must contain at least one lowercase letter';
export const PASSWORD_REQ_UPPERCASE = 'Password must contain at least one uppercase letter';
export const PASSWORD_REQ_NUMBER = 'Password must contain at least one number';
export const PASSWORD_MISMATCH = 'Passwords does not match';
export const PASSWORD_RESET_SUCCESS = 'Password reset successfully';
export const PASSWORD_VALID_ERROR = 'Password update details are invalid';

export const PHONE_INVALID = 'Phone number is invalid';
export const PHONE_MIN_LENGTH = 'Phone number must be at least 10 characters';
export const PHONE_MAX_LENGTH = 'Phone number must be less than 15 characters';

export const SIGNUP_VALID_ERROR = 'Signup details are invalid';
export const LOGIN_VALID_ERROR = 'Login details are invalid';
export const FORGOT_VALID_ERROR = 'Forgot password details are invalid';
export const RESET_VALID_ERROR = 'Reset password details are invalid';

export const USER_NOT_FOUND = 'User not found';
export const USER_EXISTS = 'User already exists';
export const USER_TYPE_INVALID = 'User type is invalid';
export const ADMIN_VALID_ERROR = 'Admin user creation details are invalid';
export const USER_CREAT_VALID_ERROR = 'User creation details are invalid';
export const DEV_CREAT_VALID_ERROR = 'Developer user creation details are invalid';
export const USER_UPD_VALID_ERROR = 'User update details are invalid';

export const INVALID_TOKEN = 'Invalid token';
export const INVALID_REFRESH_TOKEN = 'Invalid refresh token';
export const TOKEN_EXPIRED = 'Token has been expired';
export const TOKEN_NOT_FOND = 'Token not found';
export const INV_CREDS = 'Invalid credentials';
export const TOKEN_USED = 'Token has been used already';
export const TOKEN_VERIFIED = 'Token has been verified successfully';
export const TOKENN_GEN = 'Token has been generated successfully';

export const FORGOT_EMAIL_SENT = 'Forgot password email link has been sent successfully';
export const LOGIN_SUCCESS = 'User login successful';
export const SIGNUP_SUCCESS = 'User created successfully';


export const FILE_KEY_INVALID='File Key Invalid';
export const FILE_KEY_MISSING='File Key Required';
export const FILE_SIZE_IS_NUMBER='File Size must be a number';


export const COMMENT_VALID_ERROR="Comment validation failed"

// ----------UserModule ---------

export const ADMIN_EXISTS = 'Admin already exists';
export const ADMIN_CREAT_SUCCESS = 'Admin user created successfully';
export const USER_CREAT_SUCCESS = 'User created successfully';
export const DEVELOPER_CREAT_SUCCESS = 'Developer user created successfully';
export const CURRENT_PASSWORD_WRNG = 'Current password is wrong';
export const PSWD_UPDATE_SUCCESS = 'Password updated successfully';
export const USER_FETCHED_SUCCESS = 'User detailes fetched successfully';
export const USER_DATA_GET_SUCCESS = 'Users data fetched successfully';
export const USER_DELETE_SUCCESS = 'User deleted successfully';
export const USER_UPDATE_SUCCESS = 'User updated successfully';
export const DATA_NOT_FOND = 'Data not found';

//--------Comments Module Messages --------

export const COMMENT_NOT_FOUND = "Comment is not found";
export const COMMENT_REQUIRED = "Comment is required";
export const COMMENT_MIN_LENGTH = "Comment must be at least 5 characters long";
export const COMMENT_MAX_LENGTH = "Comment must be at most 400 characters long";
export const COMMENT_ADDED_SUCCESS = "Comment added successfully";
export const COMMENT_DELETED_SUCCESS = "Comment deleted successfully";
export const COMMENT_FETCHED_SUCCESS = "Comment fetched successfully";


//-------attachments module messages ------
export const ATTACHMENT_NOT_FOUND = "Attachment not found";
export const ATTACHMENT_FETCHED_SUCCESS = "Attachment fetched successfully";
export const ATTACHMENT_DELETED_SUCCESS = "Attachment deleted successfully";
export const ATTACHMENT_ADDED_SUCCESS = "Attachment added successfully";
export const FILE_NAME_INVALID = 'File Name Invalid';
export const FILE_MISSING = 'File Required';
export const FILE_TYPE_MISSING = 'File Type Required';
export const FILE_TYPE_INVALID = 'File Type Invalid';
export const FILE_VALIDATION_ERROR = 'File Details provided do not meet the required validation criteria';
export const FILE_ADDED_SUCCESS = 'File added successfully';    
export const FILE_DELETED_SUCCESS = 'File deleted successfully';
export const FILE_NOT_FOUND = 'File not found';
export const FILE_FETCHED_SUCCESS = 'File fetched successfully';



export const PROJECT_NAME_REQ = 'Project name is required';
export const PROJECT_NAME_MAX_LENGTH = 'Project name must be less than 40 characters';
export const PROJECT_NAME_MIN_LENGTH = 'Project name must be at least 3 characters';

export const PROJECT_CODE_REQ = 'Project code is required';
export const PROJECT_CODE_MAX_LENGTH = 'Project code must be less than 10 characters';
export const PROJECT_CODE_MIN_LENGTH = 'Project code must be at least 2 characters';

export const PROJECT_VALID_ERROR = 'Project details are invalid';
export const PROJECT_NOT_FOUND = 'Project not found';
export const PROJECT_NM_EXISTS = 'Project name already exists';
export const PROJECT_CD_EXISTS = 'Project code already exists';
export const PROJECT_CREATED = 'Project created successfully';
export const PROJECT_UPDATED = 'Project updated successfully';
export const PROJECT_DELETED = 'Project deleted successfully';
export const PROJECT_FETCH_SUCCESS = 'Project details fetched successfully';
export const PROJECT_USERS_ADD_SUCCESS = 'Developers added to project successfully';
export const INVALID_ID = 'Invalid id';
export const DEVELOPER_NOT_FND = 'Developers not found';
export const DEVELOPER_FETCH_SUCCESS = 'Developers fetched successfully';
export const PROJECT_ALL_FETCH_SUCCESS = 'Projects fetched successfully';
export const PROJECT_CREAT_VALID_ERROR = 'Project creation details are invalid';
export const PROJECT_UPDATE_VALID_ERROR = 'Project update details are invalid';