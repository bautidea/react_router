export default function SearchPage({ routeParams }) {
  const { id, search } = routeParams;
  return (
    <h1>
      User {id} have searched {search}
    </h1>
  );
}
