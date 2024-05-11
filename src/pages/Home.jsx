import { navigate } from '../components/Link';

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>
        This is a example page to be used for creating React Router from scratch
      </p>
      <button onClick={() => navigate('/about')}>About Me</button>
    </>
  );
}
