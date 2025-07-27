import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Employee, EmployeeDocument } from "../entities/employee.entity";

@Injectable()
export class EmployeeNumberUtil {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  /**
   * Generate employee number based on first letters of firstName and lastName
   * Format: {firstLetterOfFirstName}{firstLetterOfLastName}{incrementingNumber}
   * Examples: NL1, JH1, AB2, etc.
   */
  async generateEmployeeNumber(firstName: string, lastName: string): Promise<string> {
    if (!firstName || !lastName) {
      throw new Error("First name and last name are required to generate employee number");
    }

    // Get first letters and convert to uppercase
    const firstLetter = firstName.charAt(0).toUpperCase();
    const lastLetter = lastName.charAt(0).toUpperCase();
    const prefix = `${firstLetter}${lastLetter}`;

    // Find the highest number for this prefix
    const existingEmployees = await this.employeeModel
      .find({
        employeeNumber: { $regex: `^${prefix}\\d+$` },
      })
      .sort({ employeeNumber: -1 })
      .limit(1)
      .exec();

    let nextNumber = 1;

    if (existingEmployees.length > 0) {
      const lastEmployeeNumber = existingEmployees[0].employeeNumber;
      const lastNumber = parseInt(lastEmployeeNumber.substring(2), 10);
      nextNumber = lastNumber + 1;
    }

    return `${prefix}${nextNumber}`;
  }

  /**
   * Validate if an employee number follows the correct format
   * Format: 2 uppercase letters followed by 1 or more digits
   */
  static validateEmployeeNumber(employeeNumber: string): boolean {
    const pattern = /^[A-Z]{2}\d+$/;
    return pattern.test(employeeNumber);
  }

  /**
   * Extract prefix from employee number
   * Example: "NL1" returns "NL"
   */
  static extractPrefix(employeeNumber: string): string {
    if (!this.validateEmployeeNumber(employeeNumber)) {
      throw new Error("Invalid employee number format");
    }
    return employeeNumber.substring(0, 2);
  }

  /**
   * Extract number from employee number
   * Example: "NL1" returns 1
   */
  static extractNumber(employeeNumber: string): number {
    if (!this.validateEmployeeNumber(employeeNumber)) {
      throw new Error("Invalid employee number format");
    }
    return parseInt(employeeNumber.substring(2), 10);
  }
}
