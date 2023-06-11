import { Demo } from '../../types/types';

export const ProductService = {
  //api cho cai bang nam o day
  getProductsSmall() {
    return fetch('/demo/data/products-small.json', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data as Demo.Product[]);
  },

  getProducts() {
    return fetch('api', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data as Demo.Product[]);
  },

  getProductsWithOrdersSmall() {
    return fetch('api', {
      headers: { 'Cache-Control': 'no-cache' },
    })
      .then((res) => res.json())
      .then((d) => d.data as Demo.Product[]);
  },
};
