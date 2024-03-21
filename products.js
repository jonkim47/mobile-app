// products.js

const products = [
    {
        id: "1", // Don't edit the ID Number. Used for dynamic content organization
        basicInformation: {
            title: "Open DailyPay Card",
            subtitle: "",
            image: "assets/product1.webp",
            actionButtonTitle: "Apply Now!",
            actionButtonTrackName: "Apply Now Clicked" // Custom track name for the action button
        },
        productDetailsCard: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            tags: ["No Fees!"],
            features: ["Feature 1", "Feature 2", "Feature 3"],
            intentButtonLabel: "Apply",
            intentButtonTrackName: "Application Started" // Custom track name for the intent button
        },
        conversionModal: {
            convertButtonLabel: "Submit Application",
            convertButtonTrackName: "Application Submitted", // Custom track name for the convert button
            confirmationTrackName: "Application Completed" // Custom track name for viewing the confirmation page
        },
        // Additional Properties used for track calls. Not exposed in website UI
        trackProperties: {
            productType: "Financial Service",
            userSegment: "Premium",
            seasonalPromo: "Spring2024",
            property4: "Value 4",
            property5: "Value 5"
        }
    },
    {
        id: "2", // Don't edit the ID Number. Used for dynamic content organization
        basicInformation: {
            title: "Transfer Funds",
            subtitle: "Instantly Transfer to Venmo",
            image: "assets/product2.webp",
            actionButtonTitle: "Transfer",
            actionButtonTrackName: "Transfer Button Clicked" // Custom track name for the action button
        },
        productDetailsCard: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            tags: ["Most Popular", "Instantly Receive Funds"],
            features: ["Amount: $100", "Fees: $2.99", "Total: $102.99"],
            intentButtonLabel: "Transfer",
            intentButtonTrackName: "Transfer Configuration Started" // Custom track name for the intent button
        },
        conversionModal: {
            convertButtonLabel: "Begin Transfer",
            convertButtonTrackName: "Transfer Initiated", // Custom track name for the convert button
            confirmationTrackName: "Transfer Completed" // Custom track name for viewing the confirmation page
        },
        trackProperties: {
            productType: "Financial Service",
            transfer_amount: 100,
            fee_applied: true,
            fee_amount: 2.99,
            transfer_method: "Venmo",
            delivery_window: "Instant"
        }
    },
    {
        id: "3", // Don't edit the ID Number. Used for dynamic content organization
        basicInformation: {
            title: "Setup Direct Deposit",
            subtitle: "No Fees!",
            image: "assets/product3.webp",
            actionButtonTitle: "Learn More",
            actionButtonTrackName: "Direct Deposit Button Clicked" // Custom track name for the action button
        },
        productDetailsCard: {
            description: "Quis blandit turpis cursus in hac habitasse platea dictumst. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Pulvinar etiam non quam lacus.",
            tags: ["Most Popular", "No Fees!"],
            features: ["Feature 1", "Feature 2", "Feature 3"],
            intentButtonLabel: "Continue",
            intentButtonTrackName: "Direct Deposit Setup Started" // Custom track name for the intent button
        },
        conversionModal: {
            convertButtonLabel: "Confirm",
            convertButtonTrackName: "Direct Deposit Setup Confirmed", // Custom track name for the convert button
            confirmationTrackName: "Direct Deposit Configuration Completed" // Custom track name for viewing the confirmation page
        },
        trackProperties: {
            productType: "Direct Deposit",
            seasonalPromo: "Spring2024",
            property4: "Value 4",
            property5: "Value 5"
        }
    },
    {
        id: "4", // Don't edit the ID Number. Used for dynamic content organization
        basicInformation: {
            title: "Transfer Money",
            subtitle: "No Fees!",
            image: "assets/product4.webp",
            actionButtonTitle: "Learn More",
            actionButtonTrackName: "Transfer Button Clicked" // Custom track name for the action button
        },
        productDetailsCard: {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            tags: ["No Fees!", "Most Popular"],
            features: ["Feature 1", "Feature 2", "Feature 3"],
            intentButtonLabel: "Transfer",
            intentButtonTrackName: "Transfigure Configuration Started" // Custom track name for the intent button
        },
        conversionModal: {
            convertButtonLabel: "Begin Transfer",
            convertButtonTrackName: "Transfer Initiated", // Custom track name for the convert button
            confirmationTrackName: "Transfer Completed" // Custom track name for viewing the confirmation page
        },
        trackProperties: {
            productType: "Financial Service",
            transfer_amount: 100,
            fee_applied: false,
            fee_amount: null,
            transfer_method: "DailyPay Card",
            delivery_window: "1 Business Day"
        }
    }

]