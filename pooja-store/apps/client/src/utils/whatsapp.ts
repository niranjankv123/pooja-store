import { type CartItem } from '../types';

export const redirectToWhatsApp = (name: string, cart: CartItem[], orderId: number) => {
    const sellerNumber = '919008743343'; // Adding 91 country code for India
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const today = new Date().toLocaleDateString('en-IN').replace(/\//g, '-');
    const formattedOrderId = `#${today}-${orderId}`;

    let message = `*New Order: ${formattedOrderId}*\n`;
    message += `*Customer:* ${name}\n\n`;
    message += `*Items:*\n`;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total:* ₹${total.toFixed(2)}\n`;
    message += `\nPlease confirm my order.`;

    const encodedMessage = encodeURIComponent(message);

    // Check if user is on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Direct deep link for mobile apps
        window.location.href = `whatsapp://send?phone=${sellerNumber}&text=${encodedMessage}`;
    } else {
        // Web interface for desktop
        window.open(`https://web.whatsapp.com/send?phone=${sellerNumber}&text=${encodedMessage}`, '_blank');
    }
};
