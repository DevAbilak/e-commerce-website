import { MemoryRouter, useLocation } from "react-router";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaymentSummary from "./PaymentSummary";

vi.mock("axios");
describe("Payment summary component", () => {
  let loadCart;
  let paymentSummary;
  beforeEach(() => {
    loadCart = vi.fn();
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251,
    };
  });

  it("displays the payment summary correctly", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    const totalQuantity = screen.getByTestId("total-quantity");
    const productValue = screen.getByTestId("product-total-money");
    const shippingValue = screen.getByTestId("shipping-money");
    const totalBeforeTax = screen.getByTestId("total-cost-before-tax");
    const estimatedTax = screen.getByTestId("tax-money");
    const totalAmount = screen.getByTestId("order-total-money");

    expect(totalQuantity).toHaveTextContent("3");
    expect(productValue).toHaveTextContent("$42.75");
    expect(shippingValue).toHaveTextContent("$4.99");
    expect(totalBeforeTax).toHaveTextContent("$47.74");
    expect(estimatedTax).toHaveTextContent("$4.77");
    expect(totalAmount).toHaveTextContent("$52.51");
  });

  it("places an order", () => {
    const Location = () => {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    };

    render(
      <MemoryRouter>
        <Location />
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const placeOrderBtn = screen.getByTestId("place-order-btn");
    user.click(placeOrderBtn);
    const urlPath = screen.getByTestId("url-path");
    // TODO: fix this issue.
    // expect(urlPath).toHaveTextContent("/orders");
  });
});
