import React from 'react';
import './App.sass';
import DocumentListItems from './document';

function App() {
  return (
    <>
      <header className="App-header">
        Поиск документов
      </header>
      <div>
        <DocumentListItems />
      </div>
    </>
  );
}

export default App;
