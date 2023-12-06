exports.passwordComplexityCheck = function passwordComplexityCheck(password) {
  const containsNumber = /\d/.test(password); 
  const containsUppercaseLetter = /[A-Z]/.test(password);
  if (!containsNumber) return "** Password must include a number **";
  if (!containsUppercaseLetter) return "** Password must include an uppercase letter **";
  return "password is good"
}