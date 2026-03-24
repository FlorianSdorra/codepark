# Testing Strategy & Approach

## Overview

This project uses **Vitest** as the testing framework combined with **React Testing Library** for component testing. Our testing philosophy follows the principle of testing behavior rather than implementation details.

---

## Testing Layers

### 1. **Component Tests** (UI Layer)

Tests React components for rendering, user interactions, and prop handling.

**Files:**

- `components/date-picker.test.tsx`
- `app/features/ticket/components/ticket-upsert-form.test.tsx`
- `app/features/ticket/components/ticket-item.test.tsx`

**Focus:**

- Rendering and conditional rendering
- User interactions (clicks, input changes)
- Props handling and validation
- Accessibility attributes

### 2. **Server Action Tests** (Business Logic Layer)

Tests Next.js Server Actions for data validation, transformation, and database operations.

**Files:**

- `app/features/ticket/queries/actions/upsert-ticket.test.ts`

**Focus:**

- Input validation (Zod schemas)
- Data transformation (currency conversion)
- Database interactions (upsert, delete)
- Error handling
- Side effects (redirects, cookies, revalidation)

---

## Testing Patterns

### Pattern 1: Component Testing with Mocks

**When to use:** Testing UI components that depend on external libraries or complex sub-components.

```typescript
// Mock external dependencies
vi.mock("date-fns", () => ({
  format: vi.fn((date: Date, pattern: string) => {
    // Custom implementation
  }),
}));

// Mock UI components
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));
```

**Test Structure:**

```typescript
describe("DatePicker", () => {
  describe("Rendering", () => {
    it("should render with required props", () => {
      render(<DatePicker id="test" name="date" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Initial State", () => {
    it("should initialize with today's date", () => {
      // Test default behavior
    });
  });

  describe("User Interactions", () => {
    it("should update date on selection", () => {
      // Test interactive behavior
    });
  });
});
```

### Pattern 2: Server Action Testing

**When to use:** Testing business logic, validation, and database operations.

```typescript
// Mock external dependencies
vi.mock("../lib/prisma", () => ({
  prisma: {
    ticket: { upsert: vi.fn() },
  },
}));

// Setup
beforeEach(() => {
  vi.clearAllMocks();
  mockActionState = { status: "INITIAL", payload: new FormData() };
});

// Test execution
it("should validate input", async () => {
  const formData = new FormData();
  formData.append("title", "");

  const result = await upsertTicket(undefined, mockActionState, formData);

  expect(result.status).toBe("ERROR");
});
```

---

## Test Categories

### 1. **Rendering Tests**

Verify components display correctly and contain expected elements.

```typescript
it("should render with required props", () => {
  render(<Component prop="value" />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
```

### 2. **State & Props Tests**

Verify component responds correctly to props and manages internal state.

```typescript
it("should initialize with provided defaultValue", () => {
  render(<DatePicker defaultValue="2026-04-15" />);
  expect(screen.getByText("2026-04-15")).toBeInTheDocument();
});
```

### 3. **Interaction Tests**

Verify user interactions trigger expected behaviors.

```typescript
it("should update date on selection", () => {
  render(<DatePicker />);
  fireEvent.click(screen.getByTestId("select-button"));
  expect(screen.getByDisplayValue(/\d{4}-\d{2}-\d{2}/)).toBeInTheDocument();
});
```

### 4. **Validation Tests**

Verify input validation and error handling.

```typescript
it("should reject empty title", async () => {
  const formData = new FormData();
  formData.append("title", "");

  const result = await upsertTicket(undefined, state, formData);

  expect(result.fieldErrors?.title).toBeDefined();
});
```

### 5. **Integration Tests**

Verify multiple components/systems work together.

```typescript
it("should include hidden input in form submission", () => {
  render(
    <form>
      <DatePicker name="deadline" />
    </form>
  );

  const formData = new FormData(form);
  expect(formData.get("deadline")).toBeDefined();
});
```

### 6. **Accessibility Tests**

Verify components are accessible to assistive technologies.

```typescript
it("should have accessible button", () => {
  render(<DatePicker id="date-picker" />);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("id", "date-picker");
});
```

---

## Mocking Strategy

### When to Mock

1. **External Libraries** (date-fns, icons)

   ```typescript
   vi.mock("date-fns", () => ({
     format: vi.fn(),
   }));
   ```

2. **UI Component Libraries**

   ```typescript
   vi.mock("@/components/ui/button", () => ({
     Button: ({ children, ...props }) => <button {...props}>{children}</button>,
   }));
   ```

3. **Database/Server Operations**

   ```typescript
   vi.mock("../lib/prisma", () => ({
     prisma: { ticket: { upsert: vi.fn() } },
   }));
   ```

4. **Next.js Features** (navigation, cache)
   ```typescript
   vi.mock("next/navigation", () => ({
     redirect: vi.fn(),
   }));
   ```

### When NOT to Mock

- Core React behavior (hooks, state)
- User interactions (clicks, form submissions)
- Business logic validation
- Component composition

---

## Best Practices

### ✅ DO

- **Test behavior, not implementation**

  ```typescript
  // ✅ Good: Tests what user sees
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();

  // ❌ Bad: Tests implementation
  expect(component.state.isOpen).toBe(true);
  ```

- **Use semantic queries**

  ```typescript
  // ✅ Good
  screen.getByRole("button");
  screen.getByLabelText("Title");

  // ❌ Bad
  screen.getByTestId("btn-submit");
  ```

- **Group related tests**

  ```typescript
  describe("DatePicker", () => {
    describe("Rendering", () => {
      /* ... */
    });
    describe("User Interactions", () => {
      /* ... */
    });
  });
  ```

- **Clear test names that describe the scenario**

  ```typescript
  // ✅ Good
  it("should close popover after date selection", () => {});

  // ❌ Bad
  it("works correctly", () => {});
  ```

- **Use beforeEach for setup**
  ```typescript
  beforeEach(() => {
    vi.clearAllMocks();
    mockActionState = getDefaultState();
  });
  ```

### ❌ DON'T

- **Don't test implementation details**
  - Avoid testing internal state directly
  - Avoid testing private methods

- **Don't over-mock**
  - Only mock external dependencies
  - Keep React core behavior unm

ocked

- **Don't create brittle tests**
  - Avoid hard-coded indices
  - Avoid testing CSS classes directly

---

## Testing Checklist

### For Components:

- [ ] Renders with required props
- [ ] Handles optional props correctly
- [ ] Manages internal state properly
- [ ] Responds to user interactions
- [ ] Has accessible markup
- [ ] Works in different states (loading, error, success)
- [ ] Validates input if applicable

### For Server Actions:

- [ ] Validates all required fields
- [ ] Rejects invalid input formats
- [ ] Transforms data correctly
- [ ] Handles success case
- [ ] Handles error cases
- [ ] Triggers side effects (redirects, cookies, cache revalidation)
- [ ] Pass correct data to database

---

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests for specific file
npm run test date-picker.test.tsx

# Run tests with coverage
npm run test:coverage
```

---

## Coverage Goals

- **Components:** 80%+ coverage
- **Server Actions/Services:** 90%+ coverage
- **Utilities:** 95%+ coverage

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
