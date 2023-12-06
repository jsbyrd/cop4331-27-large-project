const pc = require('../src/components/passwordComplexity');

describe("Password Complexity Check", () => {
    test('"password" should result in "** Password must include a number **"', () => {
      expect(pc.passwordComplexityCheck("password")).toBe("** Password must include a number **");
    });

    test('password1 should result in "** Password must include an uppercase letter **"', () => {
      expect(pc.passwordComplexityCheck("password1")).toBe("** Password must include an uppercase letter **");
    });

    test('Password1 should result in "password is good"', () => {
      expect(pc.passwordComplexityCheck("Password1")).toBe("password is good");
    });

    test('PasswordOneTwo should result in "** Password must include a number **"', () => {
      expect(pc.passwordComplexityCheck("PasswordOneTwo")).toBe("** Password must include a number **");
    });
});