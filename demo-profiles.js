// demo-profiles.js

const demoProfiles = [
    {
        email: "john.doe@example.com",
        bannerText: "Welcome back, John! Check out our latest Webinar on <a href='#resources' class='text-blue-600 hover:text-blue-800'>Financial Literacy</a>!",
        "Custom Traits": {
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "123-456-7890",
        },
        "Computed Traits": {
            lifetimeValue: 500,
            lastPurchaseCategory: "Electronics"
        },
        "Audiences": {
            newsletterSubscribed: true,
            premiumUser: false
        }
    },
    {
        email: "jane.doe@example.com",
        bannerText: "Welcome back, Jane! We have the latest electronics for you.",
        "Custom Traits": {
            firstName: "Jane",
            lastName: "Doe",
            phoneNumber: "098-765-4321",
        },
        "Computed Traits": {
            lifetimeValue: 750,
            lastPurchaseCategory: "Books"
        },
        "Audiences": {
            newsletterSubscribed: false,
            premiumUser: true
        }
    }
];
