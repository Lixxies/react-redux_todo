import React from "react";

import TodoList from "./features/todos/todoList";
import Header from "./features/header/header";
import Footer from "./features/footer/footer";

function App() {
  return (
    <div className="app">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>

      <main>
        <section>
          <h2>Todos</h2>
        </section>
        <section className="mainContent">
          <Header />
          <TodoList />
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default App;
