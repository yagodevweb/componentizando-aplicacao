import { Button } from '../components/Button';
import { useMovies } from '../hooks/useMovies';

import '../styles/sidebar.scss';

export function SideBar() {

  const { genres, handleChoiceOfGender, selectedGenreId } = useMovies();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleChoiceOfGender(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
