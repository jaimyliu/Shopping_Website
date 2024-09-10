export const deliveryOptions = [
    {
        id: "1",
        name: "自行取貨",
        price: 0
    },
    {
        id: "2",
        name: "超商取貨",
        price: 60
    },
    {
        id: "3",
        name: "宅配到家",
        price: 120
    },
];

export function getDeliveryOption(deliveryId) {
    let returnOption;
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryId) {
            returnOption = option;
        }
    });
    return returnOption;
}