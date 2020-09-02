import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

//https://www.youtube.com/watch?v=Vqa9NMzF3wc&t=1s
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

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  const { source, destination } = result;
  const column = columns[source.droppableId];

  //flatten
  const copiedItems = [...column.items]

  //remove 
  const [removed] = copiedItems.splice(source.index, 1);

 //add to destination and don't remove anything
  copiedItems.splice(destination.index, 0, removed);

  setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  })
}

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Droppable droppableId={id} key={id}>
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
                      {column.items.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div 
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  userSelect: 'none',
                                  padding: 16,
                                  margin: '0 0 8px 0',
                                  minHeight: '50px',
                                  backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                  ...provided.draggableProps.style
                                }}>

                                  { item.content }

                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
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
