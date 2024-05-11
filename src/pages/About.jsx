import { navigate } from '../components/Link';

export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Creating a clone of React Router</p>
      <button onClick={() => navigate('/')}>Home</button>
    </>
  );
}
