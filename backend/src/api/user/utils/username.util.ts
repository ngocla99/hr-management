/**
 * Utility functions for generating unique usernames
 */

/**
 * Generate a base username from first name and last name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Base username (lowercase, no spaces, alphanumeric only)
 */
export function generateBaseUsername(firstName: string, lastName: string): string {
  // Clean and normalize names
  const cleanFirstName = firstName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters

  const cleanLastName = lastName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric characters

  // Generate base username
  if (cleanFirstName && cleanLastName) {
    return `${cleanFirstName}.${cleanLastName}`;
  } else if (cleanFirstName) {
    return cleanFirstName;
  } else if (cleanLastName) {
    return cleanLastName;
  } else {
    // Fallback if both names are empty
    return `user${Date.now()}`;
  }
}

/**
 * Generate a unique username by appending a number if the base username exists
 * @param baseUsername - Base username to check
 * @param checkUsernameExists - Function to check if username exists
 * @param maxAttempts - Maximum attempts to find a unique username (default: 100)
 * @returns Promise<string> - Unique username
 */
export async function generateUniqueUsername(
  baseUsername: string,
  checkUsernameExists: (username: string) => Promise<boolean>,
  maxAttempts: number = 100,
): Promise<string> {
  // Check if base username is available
  const baseExists = await checkUsernameExists(baseUsername);
  if (!baseExists) {
    return baseUsername;
  }

  // Try with numbers appended
  for (let i = 1; i <= maxAttempts; i++) {
    const candidateUsername = `${baseUsername}${i}`;
    const exists = await checkUsernameExists(candidateUsername);

    if (!exists) {
      return candidateUsername;
    }
  }

  // If all attempts failed, use timestamp
  return `${baseUsername}${Date.now()}`;
}

/**
 * Generate a username from email address
 * @param email - User's email address
 * @returns Base username from email
 */
export function generateUsernameFromEmail(email: string): string {
  const emailPart = email.split("@")[0];
  return emailPart
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // Remove non-alphanumeric characters
    .substring(0, 20); // Limit length
}

/**
 * Generate a random username with prefix
 * @param prefix - Prefix for the username
 * @returns Random username
 */
export function generateRandomUsername(prefix: string = "user"): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}${timestamp}${random}`;
}
