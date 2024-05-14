import { Link } from '../components/Link';

export default function Page404() {
  return (
    <>
      <div>
        <h1>Error: 404 - Page not Found </h1>
        <img
          src="https://media1.tenor.com/m/AtKPpo2MXFEAAAAd/dog-burning.gif"
          alt="Animation of dog in fire"
        />
      </div>
      <Link destination="/">Go to Home</Link>
    </>
  );
}
