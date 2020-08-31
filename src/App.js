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
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <DragDropContext onDragEnd={result => console.log(result)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Droppable droppableId={id}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                      padding: 4,
                      width: 250,
                      minHeight: 500
                    }} >
                  </div>
                )
              }}
            </Droppable>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
