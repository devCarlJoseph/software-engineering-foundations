/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Interface Segregation Principle (ISP)
  ==============================================================================

  1. WHAT IS ISP?
     Instead of creating one fat, bloated interface that forces classes to
     implement dummy methods they don't need, split it into small, specific interfaces!

  2. THE DISASTER PREVENTED:
     Forcing a simple desktop printer to implement `fax()` and `scan()` by writing
     `throw new Error("Not supported")`.
*/

// =============================================================================
// THE VIOLATION (FAT / BLOATED INTERFACE)
// =============================================================================
/*
  interface Machine {
    print(): void;
    scan(): void;
    fax(): void;
  }
  // A basic HomePrinter doesn't have a fax or scanner, but is forced to implement them!
*/

// =============================================================================
// THE ISP REFACTORED SOLUTION (SMALL, ROLE-FOCUSED INTERFACES)
// =============================================================================

interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(): string;
}

interface Fax {
  fax(document: string, targetNumber: string): void;
}

// Device 1: Simple home printer ONLY implements Printer
class SimpleHomePrinter implements Printer {
  public print(document: string): void {
    console.log(`[HomePrinter]: Printing: "${document}"`);
  }
}

// Device 2: All-In-One Enterprise Office Copier implements all 3!
class OfficeAllInOneCopier implements Printer, Scanner, Fax {
  public print(document: string): void {
    console.log(`[OfficeCopier]: High-speed laser printing: "${document}"`);
  }
  public scan(): string {
    return "Scanned PDF document contents";
  }
  public fax(document: string, targetNumber: string): void {
    console.log(`[OfficeCopier]: Faxed to ${targetNumber}`);
  }
}

const homeUnit = new SimpleHomePrinter();
homeUnit.print("Resume.pdf");

const officeUnit = new OfficeAllInOneCopier();
officeUnit.print("Corporate Contract.pdf");
console.log("[OfficeCopier]:", officeUnit.scan());

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [HomePrinter]: Printing: "Resume.pdf"
  [OfficeCopier]: High-speed laser printing: "Corporate Contract.pdf"
  [OfficeCopier]: Scanned PDF document contents
*/