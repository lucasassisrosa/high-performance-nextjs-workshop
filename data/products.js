import { setTimeout } from "node:timers/promises";
import { products } from "./products.json";

function randomLatency() {
  return Math.floor(Math.random() * 5000);
}

export async function getProducts() {
  await setTimeout(randomLatency()); // this causes event loop delay due to 100% utilization on main thread

  return products;
}

export async function getProductById({ id }) {
  await setTimeout(randomLatency());

  return products.find((p) => p.id === Number(id));
}
