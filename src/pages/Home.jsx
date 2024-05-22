import { Link } from '../Link';
import { navigate } from '../utils';
import { useState } from 'react';

export default function HomePage() {
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');
  // const [disableSubmit, setDisableSubmit] = useState(true);

  function handleSubmission(event) {
    event.preventDefault();

    navigate(`/search/${user}/${search}`);
  }

  function handleUserChange(event) {
    const newUser = event.target.value;
    setUser(newUser);

    //* DISABLING submit button validation to show the 404 page when
    //* nothing is written in inputs.
    // if (newUser.length > 0 && search.length > 3) {
    //   setDisableSubmit(false);
    // } else {
    //   setDisableSubmit(true);
    // }
  }

  function handleSearchChange(event) {
    const newSearch = event.target.value;
    setSearch(newSearch);

    //* DISABLING submit button validation to show the 404 page when
    //* nothing is written in inputs.
    // if (user.length > 0 && newSearch.length > 3) {
    //   setDisableSubmit(false);
    // } else {
    //   setDisableSubmit(true);
    // }
  }

  return (
    <>
      <div>
        <h1>Home</h1>
        <p>
          This is a example page to be used for creating React Router from
          scratch
        </p>
      </div>

      <Link destination={'/about'}>About Me</Link>

      <form onSubmit={handleSubmission}>
        <label>
          User:
          <input type="text" value={user} onChange={handleUserChange} />
        </label>

        <label>
          Search:
          <input type="text" value={search} onChange={handleSearchChange} />
        </label>
        <button type="submit">Make Search</button>
      </form>
    </>
  );
}
