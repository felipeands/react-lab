import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [totalFavorites, setTotalFavorites] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.github.com/users/felipeands/repos");
      const data = await response.json();
      setRepositories(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const favorites = repositories.filter((repo) => repo.isFavorite);
    const total = favorites.length;
    setTotalFavorites(total);
  }, [repositories]);

  useEffect(() => {
    document.title = `temos ${totalFavorites} favoritos`;
  }, [totalFavorites]);

  function handleFavoriteClick(id) {
    const newRepositories = repositories.map((repo) => {
      return repo.id === id ? { ...repo, isFavorite: !repo.isFavorite } : repo;
    });
    setRepositories(newRepositories);
  }

  function doAlert(data) {
    alert(`${data}`);
  }

  return (
    <>
      <Count doAlert={doAlert} total={totalFavorites} />
      {repositories.map((repo) => (
        <div key={repo.id}>
          {repo.name} {repo.isFavorite && <b>Favorito</b>} <button onClick={() => handleFavoriteClick(repo.id)}>Favoritar</button>
        </div>
      ))}
    </>
  );
}




export function Count({ total, doAlert }) {
  return (
    <>
      <h1 onClick={() => doAlert(total)}>Favoritos = {total}</h1>
    </>
  );
}