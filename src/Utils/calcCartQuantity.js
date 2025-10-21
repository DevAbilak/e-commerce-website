export function calcCartQuantity(cart) {
  let totalQuantity = 0;

  cart.map((item) => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
}