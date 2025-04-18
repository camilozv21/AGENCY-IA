"use client";

import React from "react";
import { Button } from "@mantine/core";
import classes from "./CartCore.module.css"; // Importa el módulo CSS

export default function CartCore() {
  // Datos del plan seleccionado
  const selectedPlan = {
    name: "Plan Premium",
    description: "Acceso ilimitado a todas las funciones premium.",
    price: 49.99, // Precio en dólares
    features: ["Soporte 24/7", "Acceso a herramientas avanzadas", "Actualizaciones automáticas"],
    paymentFrequency: "Mensual", // Frecuencia de pago
  };

  const handleCheckout = () => {
    alert(
      `Detalles del plan seleccionado:\n\nNombre: ${selectedPlan.name}\nDescripción: ${selectedPlan.description}\nPrecio: $${selectedPlan.price.toFixed(
        2
      )}\nCaracterísticas: ${selectedPlan.features.join(", ")}\nFrecuencia de pago: ${selectedPlan.paymentFrequency}`
    );
  };

  return (
    <section className={classes.productsCartSection}>
      <article className={classes.contentCartWrapper}>
        <div className={classes.cardsContainer}>
          <div className={classes.cardsList}>
            <div className={classes.cardWrapper}>
              <div className={classes.productCardCart}>
                <section className={classes.itemRow}>
                  <article className={classes.itemCart}>
                    <div className={classes.itemCartInfo}>
                      <div className={classes.itemTitle}>
                        <span className={classes.productNameCart}>{selectedPlan.name}</span>
                        <p>{selectedPlan.description}</p>
                        <ul>
                          {selectedPlan.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <p>
                          <strong>Precio:</strong> ${selectedPlan.price.toFixed(2)} ({selectedPlan.paymentFrequency})
                        </p>
                      </div>
                    </div>
                  </article>
                </section>
              </div>
            </div>
          </div>

          <div className={classes.priceBoxContainer}>
            <div className={classes.checkoutButtonContainer}>
              <Button
                style={{ height: "auto" }}
                id="checkout-button"
                className={classes.checkoutButton}
                size="lg"
                onClick={handleCheckout}
              >
                Finalizar compra
              </Button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}