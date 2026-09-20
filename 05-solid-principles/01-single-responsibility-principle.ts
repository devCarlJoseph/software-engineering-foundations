/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Single Responsibility Principle (SRP)
  ==============================================================================

  1. WHAT IS SRP?
     Every class, module, or function should be responsible for ONE single part
     of the application's functionality. If you change your email provider,
     you shouldn't have to touch your invoice calculation code!

  2. JARGON BUSTER:
     - Cohesion: How closely related the responsibilities of a single class are.
       High cohesion = good (focused on one job).
     - God Class (Anti-pattern): A monstrous class that handles database queries,
       business logic, HTML rendering, and email sending all by itself.
*/

// =============================================================================
// THE VIOLATION (THE BAD WAY - MULTIPLE REASONS TO CHANGE)
// =============================================================================
/*
  class BadInvoice {
    calculateTotal() { ... }     // Reason to change 1: Tax laws change
    saveToDatabase() { ... }     // Reason to change 2: Database shifts from MySQL to Postgres
    sendEmailReceipt() { ... }   // Reason to change 3: Switching from SendGrid to AWS SES
  }
  // If ANY of those 3 changes happen, this single class breaks!
*/

// =============================================================================
// THE REFACTORED SOLUTION (THE SRP WAY)
// =============================================================================

// Job 1: Entity holding invoice data and calculations
class Invoice {
  constructor(
    public id: string,
    public amount: number,
    public taxRate: number = 0.12
  ) {}

  public calculateTotal(): number {
    return this.amount + this.amount * this.taxRate;
  }
}

// Job 2: Dedicated persistence handler (Database)
class InvoiceRepository {
  public save(invoice: Invoice): void {
    console.log(`[Database]: Invoice #${invoice.id} saved securely.`);
  }
}

// Job 3: Dedicated communication service (Email)
class EmailNotificationService {
  public sendInvoiceReceipt(invoice: Invoice, customerEmail: string): void {
    console.log(
      `[Email]: Sent receipt of $${invoice.calculateTotal().toFixed(2)} to ${customerEmail}`
    );
  }
}

// Usage in application workflow:
const myInvoice = new Invoice("INV-2026-001", 250.0);
const repository = new InvoiceRepository();
const mailer = new EmailNotificationService();

repository.save(myInvoice);
mailer.sendInvoiceReceipt(myInvoice, "customer@example.com");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [Database]: Invoice #INV-2026-001 saved securely.
  [Email]: Sent receipt of $280.00 to customer@example.com
*/