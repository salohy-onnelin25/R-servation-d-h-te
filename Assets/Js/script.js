document.addEventListener("DOMContentLoaded", () => {
  const NIGHTLY_PRICE = 100000;
  const PRICE_DISPLAY_ELEMENT = document.getElementById("total-price");
  const NIGHTS_DISPLAY_ELEMENT = document.getElementById("num-nights");
  const ARRIVAL_INPUT = document.getElementById("arrival-date");
  const DEPARTURE_INPUT = document.getElementById("departure-date");
  const RESERVE_BUTTON = document.getElementById("reserve-button");

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  ARRIVAL_INPUT.min = todayString;

  function updatePricing() {
    const arrivalDate = new Date(ARRIVAL_INPUT.value);
    const departureDate = new Date(DEPARTURE_INPUT.value);

    if (!ARRIVAL_INPUT.value || !DEPARTURE_INPUT.value) {
      NIGHTS_DISPLAY_ELEMENT.textContent = "0";
      PRICE_DISPLAY_ELEMENT.textContent = "0.00";
      RESERVE_BUTTON.disabled = true;
      RESERVE_BUTTON.textContent = "Confirmation de Reservation";
      return;
    }

    if (departureDate <= arrivalDate) {
      alert("Departure date must be after the arrival date.");
      DEPARTURE_INPUT.value = "";
      NIGHTS_DISPLAY_ELEMENT.textContent = "0";
      PRICE_DISPLAY_ELEMENT.textContent = "0.00";
      RESERVE_BUTTON.disabled = true;
      return;
    }

    const timeDifference = departureDate.getTime() - arrivalDate.getTime();

    const oneDay = 1000 * 60 * 60 * 24;
    const numberOfNights = Math.round(timeDifference / oneDay);

    const totalPrice = numberOfNights * NIGHTLY_PRICE;

    NIGHTS_DISPLAY_ELEMENT.textContent = numberOfNights;
    PRICE_DISPLAY_ELEMENT.textContent = totalPrice.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    RESERVE_BUTTON.disabled = false;
    RESERVE_BUTTON.textContent = `Confirmation de Reservation pour ${PRICE_DISPLAY_ELEMENT.textContent} Ar`;
  }

  ARRIVAL_INPUT.addEventListener("change", () => {
    DEPARTURE_INPUT.min = ARRIVAL_INPUT.value
      ? new Date(new Date(ARRIVAL_INPUT.value).getTime() + 1000 * 60 * 60 * 24)
          .toISOString()
          .split("T")[0]
      : todayString;
    updatePricing();
  });

  DEPARTURE_INPUT.addEventListener("change", updatePricing);

  RESERVE_BUTTON.addEventListener("click", () => {
    const nights = NIGHTS_DISPLAY_ELEMENT.textContent;
    const price = PRICE_DISPLAY_ELEMENT.textContent;
    alert(
      `Confirmation de réservation ! Vous réservez pour ${nights} nuitées pour un montant total de ${price} Ar. Veuillez procéder au paiement par Orange Money de ${price} Ar au 037 05 919 33 pour finaliser votre réservation.`
    );
  });
});
