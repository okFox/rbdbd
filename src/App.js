import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4'
import './App.css';

const itemsFromBackend = [
  {
    id: uuid(),
    content: 'first task'
  },
  {
    id: uuid(),
    content: 'second task'
  }
]
const columnsFromBackend = {
  [uuid()]: {
    name: 'ToDo',
    items: itemsFromBackend
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>

      <DragDropContext onDragEnd={result => console.log(result)}>

      </DragDropContext>
    </div>
  );
}

export default App;
