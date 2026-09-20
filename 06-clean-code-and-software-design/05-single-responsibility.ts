/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Single Responsibility (SRP)
  ==============================================================================

  1. WHAT IS SINGLE RESPONSIBILITY?
     A class or module should have ONE, and only one, reason to change.
     If a class calculates employee salaries, it should NOT also format PDF reports
     or send SMS notifications.

  2. REAL-LIFE ANALOGY:
     A Specialist Doctor:
     If you need eye surgery, you visit an Ophthalmologist. You don't ask your
     dentist to perform eye surgery just because both are doctors!
*/

// =============================================================================
// BAD PRACTICE: THE "GOD OBJECT" (DOING EVERYTHING)
// =============================================================================
/*
  class EmployeeManager {
    calculateSalary() { ... }     // Reason 1: Payroll rules change
    generatePdfReport() { ... }   // Reason 2: PDF layout redesign
    saveToPostgres() { ... }      // Reason 3: Database credentials change
  }
*/

// =============================================================================
// GOOD PRACTICE: SEPARATED CLASSES WITH ONE RESPONSIBILITY EACH
// =============================================================================

// Job 1: Entity holding employee compensation logic
class Employee {
  constructor(
    public id: string,
    public name: string,
    public hourlyRate: number,
    public hoursWorked: number
  ) {}

  public calculateGrossPay(): number {
    return this.hourlyRate * this.hoursWorked;
  }
}

// Job 2: Dedicated report generator
class PayslipFormatter {
  public static formatTextPayslip(employee: Employee): string {
    return `--- PAYSLIP FOR ${employee.name.toUpperCase()} ---
Gross Total: $${employee.calculateGrossPay().toFixed(2)}`;
  }
}

// Job 3: Dedicated notification sender
class PayrollNotifier {
  public static sendPayslipAlert(employeeName: string): void {
    console.log(`[Notification Service]: Sent SMS payslip alert to ${employeeName}.`);
  }
}

const employee = new Employee("EMP-001", "Carl Joseph", 45.0, 40);
console.log(PayslipFormatter.formatTextPayslip(employee));
PayrollNotifier.sendPayslipAlert(employee.name);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  --- PAYSLIP FOR CARL JOSEPH ---
  Gross Total: $1800.00
  [Notification Service]: Sent SMS payslip alert to Carl Joseph.
*/