import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const itemsFromBackend = [
  {
    id: uuidv4(),
    content: 'first task'
  },
  {
    id: uuidv4(),
    content: 'second task'
  }
]
const columnsFromBackend = {
  [uuidv4()]: {
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
