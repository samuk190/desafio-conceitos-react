import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const addRep = {
      title: 'Projeto em React',
      url: 'https://github.com/samuk190/desafio-conceitos-react',
      techs: ['Node', 'React', 'JS'],
      likes: 0
    }

    const res = await api.post('repositories', addRep);

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const filteredRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(filteredRepositories);    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li>
            { repository.title }

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
