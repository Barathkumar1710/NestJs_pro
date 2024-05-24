export class StudentValidator {
  validateStudent(dto: any) {
    // Perform validations here
    if (!dto.fullName || dto.fullName.trim() === '') {
      throw new Error('Full name is required');
    }
    if (!dto.gender || dto.gender.trim() === '') {
      throw new Error('Gender is required');
    }
    if (!dto.permanentAddress || dto.permanentAddress.trim() === '') {
      throw new Error('Permanent address is required');
    }
    if (!dto.currentAddress || dto.currentAddress.trim() === '') {
      throw new Error('Current address is required');
    }
    if (!dto.age || isNaN(dto.age) || dto.age <= 0) {
      throw new Error('Valid age is required');
    }
    // Add more validations as needed
  }
}
