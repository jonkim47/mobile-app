// demo-profiles.js

const demoProfiles = [
    {
        email: "augustus.daugherty@gmailx.com",
        bannerText: "Welcome back, Augustus! Check out our latest Webinar on <a href='#resources' class='text-blue-600 hover:text-blue-800'>Financial Wellness</a>!",
        "Custom Traits": {
            firstName: "Augustus",
            lastName: "Daugherty",
            phoneNumber: "123-456-7890",
            user_id: "4b911f78"
        },
        "Computed Traits": {
            lifetime_transfer_amount: 180,
            preferred_transfer_method: "Venmo",
            number_of_transfers_in_last_6_months: 2,
            support_tickets_within_last_90: 1,
            favorite_web_resource: "Financial Literacy"
        },
        "Audiences": {
            "Active Users who Prefer Venmo": true,
            "Abandoned Direct Deposit": true
        }
    },
    {
        email: "dusty.kunze@gmailx.com",
        bannerText: "Welcome back, Dusty! Check out our latest Webinar on <a href='#resources' class='text-blue-600 hover:text-blue-800'>Financial Wellness</a>!",
        "Custom Traits": {
            firstName: "Dusty",
            lastName: "Kunze",
            phoneNumber: "123-456-7890",
            user_id: "bebd4977"
        },
        "Computed Traits": {
            lifetime_transfer_amount: 1435,
            preferred_transfer_method: "Direct Deposit",
            transfers_in_last_6_months: 8,
            support_tickets_within_last_90: 2,
            favorite_web_resource: "Financial Literacy"
        },
        "Audiences": {
            "Active Users who Prefer Direct Deposit": true,
            "Debit Accounts with Balance >0": true
        }
    },
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
