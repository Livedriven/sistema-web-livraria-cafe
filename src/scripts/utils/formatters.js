export function formatCurrency(price) {
    return Number(price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

export function parsePriceToNumber(value) {
    if (typeof value === "number") {
        return value;
    }

    return Number(value.trim().replace(",", "."));
}