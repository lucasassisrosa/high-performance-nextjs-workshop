import { getProducts, getProductById } from "../../data/products";

export async function getStaticPaths() {
  const products = await getProducts();

  return {
    paths: products.map(({ id }) => ({ params: { id: String(id) } })),
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const product = await getProductById({ id: context.params.id });
  return {
    props: product, // benchmarking, CPU usage goes high the more we use SSG. Try balance with actual SSR when having a lot of product pages
  };
}

export default function Product({ id, title, thumbnail, description, price }) {
  return (
    <>
      <h1 className="w-full text-center text-4xl font-bold py-36">{title}</h1>
      <div className="relative bg-slate-200 rounded-md" key={id}>
        <img src={thumbnail} className="w-52 h-52 object-cover rounded-t-md" />
        <div className="p-4">
          <p className="text-md h-28"> {description} </p>

          <p className="text-emerald-600 font-bold">
            {" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}{" "}
          </p>
        </div>
      </div>
    </>
  );
}
