import stripePackage from 'stripe';
import handler from './libs/handler-lib';
import { calculateCost } from './libs/billing-lib';

export const main = handler(async(event, context) => {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";
    
    // a new stripe object using our stripe secret key.
    const stripe = stripePackage(process.env.stripeSecretKey);
    
    // a method to charge a user and respond to the request if everything went through successfully.
    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd"
    });
    return { status: true };
});
