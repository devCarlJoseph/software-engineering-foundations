/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Separation of Concerns (SoC)
  ==============================================================================

  1. WHAT IS SEPARATION OF CONCERNS?
     Dividing your application into distinct layers where each layer has ONE job:
     - Controller: Handles HTTP requests & input validation.
     - Service: Handles core business logic & calculations.
     - Repository: Handles database queries and persistence.

  2. REAL-LIFE ANALOGY:
     A Restaurant:
     - Waiter (Controller): Takes your order and delivers food.
     - Chef (Service): Cooks the food and applies recipes.
     - Storeroom Manager (Repository): Retrieves fresh ingredients from the pantry.
     The waiter never slices beef, and the chef never waits tables!
*/

// =============================================================================
// LAYER 1: DATA ACCESS (REPOSITORY) - ONLY TOUCHES THE DATABASE
// =============================================================================

type ProductRecord = { id: string; name: string; stock: number };

class ProductRepository {
  private database = new Map<string, ProductRecord>([
    ["prod_1", { id: "prod_1", name: "Mechanical Keyboard", stock: 5 }],
  ]);

  public findById(id: string): ProductRecord | null {
    return this.database.get(id) ?? null;
  }

  public updateStock(id: string, newStock: number): void {
    const item = this.database.get(id);
    if (item) {
      item.stock = newStock;
      console.log(`[Database]: Updated ${item.name} stock to ${newStock}`);
    }
  }
}

// =============================================================================
// LAYER 2: BUSINESS LOGIC (SERVICE) - NO DATABASE SQL, NO HTTP KNOWLEDGE
// =============================================================================

class InventoryService {
  constructor(private repo: ProductRepository) {}

  public purchaseItem(productId: string, quantityToBuy: number): { success: boolean; message: string } {
    const product = this.repo.findById(productId);

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    if (product.stock < quantityToBuy) {
      return { success: false, message: `Insufficient stock! Only ${product.stock} left.` };
    }

    // Apply business rule: reduce stock
    this.repo.updateStock(productId, product.stock - quantityToBuy);
    return { success: true, message: `Successfully purchased ${quantityToBuy} item(s)!` };
  }
}

// =============================================================================
// LAYER 3: HTTP API (CONTROLLER) - ONLY HANDLES INPUT / OUTPUT
// =============================================================================

class InventoryController {
  constructor(private service: InventoryService) {}

  public handlePurchaseRequest(request: { productId: string; quantity: number }) {
    console.log(`[Controller]: Received purchase request for item '${request.productId}'`);
    const result = this.service.purchaseItem(request.productId, request.quantity);
    console.log(`[Controller]: Returned response:`, result);
  }
}

// Assemble the layers:
const productRepo = new ProductRepository();
const inventoryService = new InventoryService(productRepo);
const inventoryController = new InventoryController(inventoryService);

inventoryController.handlePurchaseRequest({ productId: "prod_1", quantity: 2 });

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [Controller]: Received purchase request for item 'prod_1'
  [Database]: Updated Mechanical Keyboard stock to 3
  [Controller]: Returned response: { success: true, message: 'Successfully purchased 2 item(s)!' }
*/