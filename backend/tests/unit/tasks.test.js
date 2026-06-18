const { validateTaskTitle, addTask, _resetForTests } = require("../../src/tasks");

beforeEach(() => {
  _resetForTests();
});

describe("validateTaskTitle (unit test)", () => {
  test("rejects empty string", () => {
    const result = validateTaskTitle("");
    expect(result.valid).toBe(false);
  });

  test("rejects whitespace-only string", () => {
    const result = validateTaskTitle("   ");
    expect(result.valid).toBe(false);
  });

  test("rejects non-string input", () => {
    const result = validateTaskTitle(123);
    expect(result.valid).toBe(false);
  });

  test("accepts a normal title", () => {
    const result = validateTaskTitle("Buy groceries");
    expect(result.valid).toBe(true);
  });

  test("rejects titles longer than 100 characters", () => {
    const longTitle = "a".repeat(101);
    const result = validateTaskTitle(longTitle);
    expect(result.valid).toBe(false);
  });
});

describe("addTask (unit test)", () => {
  test("throws when title is invalid", () => {
    expect(() => addTask("")).toThrow();
  });

  test("creates a task with an incrementing id", () => {
    const task1 = addTask("First task");
    const task2 = addTask("Second task");

    expect(task1.id).toBe(1);
    expect(task2.id).toBe(2);
    expect(task1.done).toBe(false);
  });
});