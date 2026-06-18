// In-memory storage (acts like a fake database)
let tasks = [];
let nextId = 1;

/**
 * Validate task title (PURE FUNCTION - easy for unit testing)
 */
function validateTaskTitle(title) {
  if (typeof title !== "string") {
    return { valid: false, error: "Title must be a string" };
  }

  const trimmed = title.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Title cannot be empty" };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: "Title cannot exceed 100 characters" };
  }

  return { valid: true, error: null };
}

/**
 * Get all tasks
 */
function getAllTasks() {
  return tasks;
}

/**
 * Add a new task
 */
function addTask(title) {
  const result = validateTaskTitle(title);

  if (!result.valid) {
    throw new Error(result.error);
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    done: false
  };

  tasks.push(task);
  return task;
}

/**
 * Delete a task by ID
 */
function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === Number(id));

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}

/**
 * Reset function (ONLY for unit tests)
 * IMPORTANT for CI/CD isolation
 */
function _resetForTests() {
  tasks = [];
  nextId = 1;
}

// Export functions so tests can use them
module.exports = {
  validateTaskTitle,
  getAllTasks,
  addTask,
  deleteTask,
  _resetForTests
};