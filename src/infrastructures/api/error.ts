interface FieldError {
  field: string;
  errorMessage: string;
}
  
class ValidationError extends Error {
  isValidationError: boolean;
  fieldErrors: Record<string, string>;
  originalError: any;

  constructor(message: string, fieldErrors: Record<string, string>, originalError: any) {
    super(message);
    this.isValidationError = true;
    this.fieldErrors = fieldErrors;
    this.originalError = originalError;
    Object.setPrototypeOf(this, ValidationError.prototype); // 프로토타입 체인 수정
  }
}
  
export type { FieldError };
export { ValidationError };