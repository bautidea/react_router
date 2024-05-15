import { Link } from '../components/Link';

export default function HomePage() {
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
    </>
  );
}
