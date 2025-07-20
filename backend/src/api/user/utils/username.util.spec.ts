import {
  generateBaseUsername,
  generateRandomUsername,
  generateUsernameFromEmail,
} from "./username.util";

describe("Username Utils", () => {
  describe("generateBaseUsername", () => {
    it("should generate username from first and last name", () => {
      expect(generateBaseUsername("John", "Doe")).toBe("john.doe");
      expect(generateBaseUsername("Mary", "Jane")).toBe("mary.jane");
    });

    it("should handle special characters and spaces", () => {
      expect(generateBaseUsername("Jean-Pierre", "O'Connor")).toBe("jeanpierre.oconnor");
      expect(generateBaseUsername("José", "García")).toBe("jos.garca");
    });

    it("should handle single name", () => {
      expect(generateBaseUsername("John", "")).toBe("john");
      expect(generateBaseUsername("", "Doe")).toBe("doe");
    });

    it("should handle empty names", () => {
      const result = generateBaseUsername("", "");
      expect(result).toMatch(/^user\d+$/);
    });
  });

  describe("generateUsernameFromEmail", () => {
    it("should extract username from email", () => {
      expect(generateUsernameFromEmail("john.doe@example.com")).toBe("johndoe");
      expect(generateUsernameFromEmail("user123@test.org")).toBe("user123");
    });

    it("should handle special characters in email", () => {
      expect(generateUsernameFromEmail("user-name@example.com")).toBe("username");
      expect(generateUsernameFromEmail("user.name@example.com")).toBe("username");
    });

    it("should limit length", () => {
      const longEmail = "verylongusername@example.com";
      const result = generateUsernameFromEmail(longEmail);
      expect(result.length).toBeLessThanOrEqual(20);
    });
  });

  describe("generateRandomUsername", () => {
    it("should generate random username with default prefix", () => {
      const result = generateRandomUsername();
      expect(result).toMatch(/^user\d+[a-z0-9]+$/);
    });

    it("should generate random username with custom prefix", () => {
      const result = generateRandomUsername("emp");
      expect(result).toMatch(/^emp\d+[a-z0-9]+$/);
    });

    it("should generate unique usernames", () => {
      const username1 = generateRandomUsername();
      const username2 = generateRandomUsername();
      expect(username1).not.toBe(username2);
    });
  });
});
