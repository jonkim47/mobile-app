document.addEventListener("DOMContentLoaded", function () {
    // Initial setup
    applyConfigurations();
    renderProducts();
    setupModalEventListeners();
    setupConfirmationModalListeners();

    // Handle initial hash
    // Normalize the hash to lowercase before loading content
    const currentHash = window.location.hash.substring(1);
    if (currentHash.toLowerCase() === "home") {
        loadContent("Home");
    } else if (currentHash) {
        loadContent(currentHash);
    } else {
        loadContent("Home"); // Adjust to "Home" to ensure consistency
    }
});
function applyConfigurations() {
    setLogoAttributes();
    setBannerStyles();
    setBannerText();
    setHeaderAndFooterStyles();
    populateFooterNavigation();
}

function setLogoAttributes() {
    const logoImg = document.querySelector('header img');
    if (logoImg) {
        logoImg.src = config.header.logo;
        logoImg.alt = "Company Logo";
    }
}

function setBannerStyles() {
    // Apply dynamic banner background and text color from config
    const banner = document.querySelector('.bg-blue-200'); // Adjust this selector if needed
    if (banner) {
        banner.style.backgroundColor = config.colors.bannerColor;
        banner.style.color = config.colors.bannerTextColor;
    }
}

// Call this function after the user logs in and you have set the userProfile in localStorage
function setBannerText() {
    const bannerTextElement = document.getElementById('bannerText');
    if (bannerTextElement) {
        const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
        // Use custom banner text if available, otherwise fallback to default text
        const bannerText = userProfile.bannerText || config.header.bannerText;
        bannerTextElement.innerHTML = bannerText; // Allows HTML such as links if needed
    }
}


function setHeaderAndFooterStyles() {
    // Apply header color from config
    const header = document.querySelector('header');
    if (header) {
        header.style.backgroundColor = config.colors.headerColor;
    }

    // Apply footer color from config
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.backgroundColor = config.colors.footerColor;
    }
}

function populateFooterNavigation() {
    const footerNav = document.querySelector('footer nav');
    if (footerNav) {
        footerNav.className = 'grid grid-cols-4 w-full'; // Ensure the grid layout spans the full width

        config.footer.navLinks.forEach(link => {
            const div = document.createElement('div');
            div.className = 'flex flex-col items-center justify-center w-full hover:bg-gray-700 cursor-pointer p-2'; // Added hover effect and padding

            const icon = document.createElement('i');
            icon.className = `${link.icon} fa-lg text-white`; // Ensured icons are white for visibility
            div.appendChild(icon);

            const label = document.createElement('span');
            label.className = 'text-white text-xs mt-2'; // Ensure label text is white for visibility
            label.textContent = link.label;
            div.appendChild(label);

            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.className = 'w-full h-full flex';
            anchor.appendChild(div); // Append the div to anchor for the entire area to be clickable

            // Attach an event listener to each anchor for dynamic content loading
            anchor.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor action
                const target = link.url.substring(1); // Remove the '#' from the URL
                window.location.hash = target; // Update the URL hash
                loadContent(target, link.label); // Load the content based on the target
            });


            footerNav.appendChild(anchor);
        });
    }
}


function loadContent(contentId, label = contentId) {
    const formattedLabel = contentId.charAt(0).toUpperCase() + contentId.slice(1); // Ensure the first letter is always capitalized
    analytics.screen(formattedLabel); // Use the formatted label for analytics

    switch (contentId.toLowerCase()) {
        case 'home':
            loadHomePageContent();
            break;
        case 'catalog':
            loadCatalogContent();
            break;
        case 'resources':
            loadResourcesContent();
            break;
        case 'profile':
            loadProfileContent();
            break;
        default:
            loadHomePageContent(); // Load home by default or show a 404 page/content not found message
    }
}


// Define functions like loadHomeContent, loadCatalogContent, etc., to update the #main-content

// Improved product rendering and modal handling
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.insertAdjacentHTML('beforeend', productCard);
        });
        setupModalEventListeners(); // Re-setup event listeners for dynamically added buttons
    }
}


function createProductCard(product) {
    const { title, subtitle, image, actionButtonTitle } = product.basicInformation;
    // Dynamically create the product card with flex layout to keep the price and button anchored at the bottom
    return `
    <div class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      <img src="${image}" alt="${title}" class="w-full object-cover">
      <div class="p-4 flex flex-1 flex-col justify-between">
        <div>
          <h3 class="text-xl text-center font-semibold mb-2">${title}</h3>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-lg">${subtitle}</span>
          <button data-product-id="${product.id}" style="background-color: ${config.colors.buttonColor};" class="action-button hover:bg-indigo-600 text-white px-3 py-1 rounded-full">${actionButtonTitle}</button>
        </div>
      </div>
    </div>
  `;
}



// Setup Modal Event Listeners - Improved to handle dynamic content
function setupModalEventListeners() {
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', handleActionButtonClick);
    });
}

// Handle Action Button Click - Shows Product Details Modal
function handleActionButtonClick(event) {
    const productId = event.target.dataset.productId;
    const product = products.find(p => p.id === productId);
    const trackName = product.basicInformation.actionButtonTrackName;

    analytics.track(trackName, {
        productName: product.basicInformation.Title,
        //productPrice: product.basicInformation.subtitle,
        ...product.trackProperties,
    });
    showProductDetailsModal(productId);
}


// Setup Confirmation Modal Listeners
function setupConfirmationModalListeners() {
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    if (confirmBtn) {
        // Apply the button color from config
        confirmBtn.style.backgroundColor = config.colors.buttonColor;
        confirmBtn.style.color = '#FFFFFF'; // Set text color to white for better visibility
        confirmBtn.className += ' hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'; // Add additional classes as needed

        confirmBtn.addEventListener('click', confirmAction);
    }
    if (cancelBtn) {
        // Optionally, apply styles to the cancel button as well for consistency
        // For example, if you have a secondary button color in your config, you could use that here
        // cancelBtn.style.backgroundColor = config.colors.secondaryButtonColor;
        // For simplicity, this example will not change the cancel button's appearance

        cancelBtn.addEventListener('click', cancelConfirmation);
    }
}


// Show and Hide Modals with State Reset
function showProductDetailsModal(productId) {
    resetAllModals(); // Ensure that all other modals are hidden and their states reset
    populateProductDetailsModal(productId); // Populate the modal with product details
    document.getElementById('productDetailsModal').classList.remove('hidden'); // Show the Product Details Modal
}

function populateProductDetailsModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found');
        return;
    }

    // Set product details in the modal
    document.getElementById('modalProductName').textContent = product.basicInformation.title;
    document.getElementById('modalProductImage').src = product.basicInformation.image;
    document.getElementById('modalProductImage').alt = product.basicInformation.name; // Ensure alt text is updated for accessibility
    document.getElementById('modalProductDescription').textContent = product.productDetailsCard.description;
    document.getElementById('modalProductPrice').textContent = product.basicInformation.subtitle;

    // Handle product tags
    const modalProductTags = document.getElementById('modalProductTags');
    modalProductTags.innerHTML = ''; // Clear existing tags
    product.productDetailsCard.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2';
        tagElement.textContent = tag;
        modalProductTags.appendChild(tagElement);
    });

    // Handle product features
    const modalProductFeatures = document.getElementById('modalProductFeatures');
    modalProductFeatures.innerHTML = ''; // Clear existing features
    product.productDetailsCard.features.forEach(feature => {
        const featureItem = document.createElement('li');
        featureItem.textContent = feature;
        featureItem.className = 'feature-item'; // Use this class for styling if needed
        modalProductFeatures.appendChild(featureItem);
    });

    // Add or update dynamic buttons (Intent and Close) within the modal
    const buttonContainer = document.querySelector('.intent-cancel-container');
    buttonContainer.innerHTML = ''; // Clear existing buttons

    // Intent Button (e.g., Buy Now, Add to Cart)
    const intentButton = document.createElement('button');
    intentButton.textContent = product.productDetailsCard.intentButtonLabel;
    intentButton.className = 'intent-button hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full';
    intentButton.style.backgroundColor = config.colors.buttonColor; // Set button color from config
    intentButton.style.color = '#FFFFFF'; // Optional: Set text color to white
    intentButton.onclick = () => {
        analytics.track(product.productDetailsCard.intentButtonTrackName, {
            action: product.intentButtonLabel,
            ...product.trackProperties
        });
        showConfirmationModal(productId);
    };
    buttonContainer.appendChild(intentButton);

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-button bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full';
    closeButton.onclick = hideProductDetailsModal;
    buttonContainer.appendChild(closeButton);
}

function hideProductDetailsModal() {
    document.getElementById('productDetailsModal').classList.add('hidden');
}

function showConfirmationModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found');
        return;
    }

    // Customize the modal size and appearance
    const modalContainer = document.getElementById('confirmationModal').querySelector('.relative');
    modalContainer.className = 'relative bg-white rounded-lg shadow-lg w-full max-w-6xl m-8 mx-auto flex flex-col md:flex-row';

    // Populate modal with product details (image, title, description)
    // This assumes you have placeholders in your HTML for these details
    document.getElementById('confirmationProductImage').src = product.basicInformation.image;
    document.getElementById('confirmationProductName').textContent = product.basicInformation.title;
    document.getElementById('confirmationProductDescription').textContent = product.productDetailsCard.description;

    // Customize the Confirm button color and text based on product action
    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.textContent = product.conversionModal.convertButtonLabel;
    confirmBtn.style.backgroundColor = config.colors.buttonColor; // Set button color from config
    confirmBtn.dataset.productId = productId; // Store the product ID on the confirm button for use in confirmAction

    document.getElementById('confirmationModal').classList.remove('hidden');
    document.getElementById('productDetailsModal').classList.add('hidden'); // Hide product details modal
}



function hideConfirmationModal() {
    document.getElementById('confirmationModal').classList.add('hidden');
}

// Trigger Confirmation
function confirmAction() {
    document.getElementById('confirmBtn').classList.add('hidden');
    document.getElementById('cancelBtn').classList.add('hidden');
    document.getElementById('spinner').classList.remove('hidden');

    // Track Call
    const productId = document.getElementById('confirmBtn').dataset.productId;
    const product = products.find(p => p.id === productId);
    analytics.track(product.conversionModal.convertButtonTrackName, {
        action: product.convertButtonLabel,
        ...product.trackProperties
    });

    // Simulate server response delay
    setTimeout(() => {
        // Once the "server" has responded, proceed to show the confirmation content
        completeConfirmation(); // Call a new function to handle the completion of confirmation
    }, 2000); // Adjust the delay as needed
}

// Show Confirmation page
function completeConfirmation() {
    const productId = document.getElementById('confirmBtn').dataset.productId;
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found');
        return;
    }

    // Reset the confirmation modal to its original state
    document.getElementById('confirmBtn').classList.remove('hidden');
    document.getElementById('cancelBtn').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');

    // Show the confirmation content in the main content area
    showConfirmationContent(product);

    // Hide the confirmation modal
    hideConfirmationModal();
}

function showConfirmationContent(product) {
    const confirmationContent = `
        <div class="container mx-auto mt-8 flex-grow">
            <h2 class="text-2xl font-bold mb-4 text-center">Congratulations!</h2>
            <p class="text-lg mb-4 text-center">Your action for "${product.basicInformation.title}" has been confirmed.</p>
            <div class="text-center">
                <img src="${product.basicInformation.image}" alt="${product.basicInformation.title}" class="w-48 mx-auto"/>
                <p class="text-md mt-4">${product.productDetailsCard.description}</p>
                <p class="text-lg font-bold">${product.basicInformation.subtitle}</p>
            </div>
        </div>
    `;
    document.getElementById('main-content').innerHTML = confirmationContent;

    // Track the confirmation page view
    analytics.track(product.conversionModal.confirmationTrackName, {
        action: product.conversionModal.convertButtonLabel,
        ...product.trackProperties
    });
}

function cancelConfirmation() {
    showProductDetailsModal(window.lastSelectedProductId); // Show the last viewed product details modal
    hideConfirmationModal();
}

// New function to reset and hide all modals
function resetAllModals() {
    hideProductDetailsModal();
    hideConfirmationModal();
    // Add any additional reset logic here
}


// Home Page
function loadHomePageContent() {
    const content = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-center px-4 py-2 bg-gray-100 rounded-lg shadow">Home</h2>
      <div id="productGrid" class="grid grid-cols-2 gap-6 mt-6">
        <!-- Catalog items will be loaded here -->
      </div>
    </div>
  `;
    document.getElementById('main-content').innerHTML = content;
    renderProducts();
}

// Catalog Page (same as Home)
function loadCatalogContent() {
    const content = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-center px-4 py-2 bg-gray-100 rounded-lg shadow">Catalog</h2>
      <div id="productGrid" class="grid grid-cols-2 gap-6 mt-6">
        <!-- Catalog items will be loaded here -->
      </div>
    </div>
  `;
    document.getElementById('main-content').innerHTML = content;
    renderProducts(); // Assuming this function renders your products
}

function loadResourcesContent() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
    <div class="container mx-auto mt-8 flex-grow">
      <h2 class="text-2xl font-bold mb-4 text-center px-4 py-2 bg-gray-100 rounded-lg shadow">Resources</h2>
      <div id="accordionContainer" class="flex flex-col divide-y divide-gray-200 mx-4">
        <!-- Accordion items will be dynamically added here -->
      </div>
    </div>
    `;

    const accordionContainer = document.getElementById('accordionContainer');

    config.resources.forEach((category, index) => {
        const categoryHeader = document.createElement('button');
        categoryHeader.innerHTML = `<span class="accordion-title">${category.category}</span> <span class="indicator">+</span>`;
        categoryHeader.className = 'accordion-header py-4 px-6 text-left text-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out rounded-md shadow-sm my-2 flex justify-between items-center';

        const categoryContent = document.createElement('div');
        categoryContent.className = 'accordion-content overflow-hidden transition-max-height duration-700 ease-in-out';
        categoryContent.style.maxHeight = '0';

        category.items.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'pl-10 p-4 hover:bg-gray-50';

            // Create the link element
            const linkElement = document.createElement('a');
            linkElement.href = item.url;
            linkElement.target = "_blank";
            linkElement.className = "text-blue-600 hover:underline";
            linkElement.textContent = item.title;

            // Add click event listener for tracking
            linkElement.addEventListener('click', function (e) {
                // Prevent the default action to ensure the tracking event is sent before navigation
                e.preventDefault();

                // Track the resource view event
                analytics.track('Resource Viewed', {
                    title: item.title,
                    category: category.category,
                    url: item.url
                });

                // Navigate to the URL after tracking
                window.open(item.url, "_blank");
            });

            itemElement.appendChild(linkElement);
            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'text-gray-600';
            descriptionElement.textContent = item.description;
            itemElement.appendChild(descriptionElement);

            categoryContent.appendChild(itemElement);
        });

        categoryHeader.addEventListener('click', function () {
            const alreadyExpanded = categoryContent.style.maxHeight !== '0px';
            document.querySelectorAll('#accordionContainer .accordion-content').forEach((element) => {
                element.style.maxHeight = '0';
                element.previousElementSibling.querySelector('.indicator').textContent = '+';
            });

            if (!alreadyExpanded) {
                categoryContent.style.maxHeight = `${categoryContent.scrollHeight}px`;
                this.querySelector('.indicator').textContent = '-';
            }
        });

        accordionContainer.appendChild(categoryHeader);
        accordionContainer.appendChild(categoryContent);

        // Automatically expand the first category
        if (index === 0) {
            categoryContent.style.maxHeight = `${categoryContent.scrollHeight}px`;
            categoryHeader.querySelector('.indicator').textContent = '-';
        }
    });
}

// Profile Page
function loadProfileContent() {
    // const analytics = window.analytics;
    // // Retrieve the current user's anonymous ID from Segment
    // const anonymousId = analytics.user().anonymousId();

    // // Your Node.js server endpoint that proxies the request to the Segment Profile API
    // // Replace "http://localhost:3000" with the URL of your deployed server if necessary
    // const proxyUrl = `http://localhost:3000/api/profiles/${anonymousId}`;

    // axios.get(proxyUrl)
    //     .then(function (response) {
    //         // Log the response data to the console
    //         console.log("Profile data:", response.data);
    //     })
    //     .catch(function (error) {
    //         console.error('Error fetching profile data:', error);
    //     });

    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
        // If user is logged in, show profile content
        showProfilePage();
    } else {
        // If the user is not logged in, show the login form
        showLoginPage();
    }
}


function showLoginPage() {
    const loginContent = `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST" onsubmit="event.preventDefault(); loginUser(this.username.value, this.password.value);">
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">Email address</label>
              <input id="username" name="username" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>

          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
    `;
    document.getElementById('main-content').innerHTML = loginContent;
}

function checkLogin() {
    var loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
        showProfilePage();
    } else {
        showLoginPage();
    }
}

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function loginUser(username, password) {
    if (!isValidEmail(username)) {
        alert("Please enter a valid email address.");
        return;
    }

    const userProfile = demoProfiles.find(profile => profile.email === username);

    // Regardless of whether the profile is found, perform the standard login.
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("username", username); // Use the email as the username identifier.

    // Additional profile details are stored if the profile exists in demoProfiles.js.
    if (userProfile) {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }

    // Segment analytics track and identify calls.
    analytics.track('User Logged In');
    analytics.identify(username, {
        email: username,
        // Include additional traits here if userProfile is found.
    });

    showProfilePage();
}



function showProfilePage() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
        showLoginPage();
        return;
    }

    // Fetch the anonymous ID from Segment's analytics library
    const anonymousId = analytics.user().anonymousId();

    // Retrieve user details
    const username = localStorage.getItem("username");
    const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

    // Start building the profile content
    let profileContent = `
        <div class="container mx-auto mt-8 px-4 sm:px-0">
            <h2 class="text-2xl font-bold mb-6 text-center">Profile Information</h2>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg border-b border-gray-200 mb-6">
                <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Email</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">${username}</p>
                </div>
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Anonymous ID</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${anonymousId}</dd>
                        </div>
                    </dl>
                </div>
            </div>
    `;

    // Dynamically create tables for each category of profile information
    for (const category in userProfile) {
        if (category !== 'email' && category !== 'bannerText' && userProfile.hasOwnProperty(category)) {
            profileContent += `
                <div class="bg-white shadow overflow-hidden sm:rounded-lg border-b border-gray-200 mb-6">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">${category}</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
            `;
            for (const trait in userProfile[category]) {
                // Skip any URL field or other fields that should not be displayed in the detail tables
                if (trait.toLowerCase().includes('url')) continue;

                profileContent += `
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">${trait}</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${formatValue(userProfile[category][trait])}</dd>
                            </div>
                `;
            }
            profileContent += `
                        </dl>
                    </div>
                </div>
            `;
        }
    }

    // Append the logout button
    profileContent += `
            <div class="text-center mt-6">
                <button onclick="logoutUser()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
            </div>
        </div>
    `;

    document.getElementById('main-content').innerHTML = profileContent;
    setBannerText();
}

// Helper function to format values for display
function formatValue(value) {
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    return value;
}

function logoutUser() {
    // Clear local storage items related to user session
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userProfile"); // Also remove the stored profile information if any
    analytics.track('User Logged Out');
    analytics.reset();
    setBannerText();
    showLoginPage(); // Redirect the user to the login page after logout
}
