export default function Page({ params }: { params: { companyName: string } }) {
  return <div>My Post: {params.companyName}</div>;
}
