import { Link } from '../Link';

export default function SearchPage({ routeParams }) {
  const { id, search } = routeParams;
  return (
    <>
      <h1>
        User {id} have searched {search}
      </h1>

      <Link destination={'/'}>Go Back Home</Link>
    </>
  );
}
