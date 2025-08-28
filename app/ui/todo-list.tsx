"use client";

import { Todo } from "@/generated/prisma";
import { useState } from "react";

interface Props {
  defaultTodos: Todo[];
}

export default function TodoList({ defaultTodos }: Props) {
  const [todos, setTodos] = useState(defaultTodos);

  return (
    <div>
      <h1 data-testid="cypress-title">TODOS</h1>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span>{t.text}</span>
            <button
              onClick={() => setTodos(todos.filter(({ id }) => t.id !== id))}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
