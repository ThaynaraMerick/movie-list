export const generateShareLink = (favorites) => {
  if (favorites.length === 0) return window.location.origin + "/favorites";
  const ids = favorites.map((m) => m.id).join(",");
  return `${window.location.origin}/favorites?ids=${ids}`;
};

export const getMoviesFromIds = async (ids, apiKey) => {
  const promises = ids.map((id) =>
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((res) => res.json())
  );
  return Promise.all(promises);
};
