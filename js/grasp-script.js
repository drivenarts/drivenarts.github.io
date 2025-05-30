document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Highlight current section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add copy button to code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.addEventListener('click', async () => {
            const code = block.querySelector('code').textContent;
            await navigator.clipboard.writeText(code);
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
        block.appendChild(button);
    });

    // Marketplace link popup
    const marketplaceLink = document.querySelector('.marketplace-link');
    const megaGrantPopup = document.getElementById('mega-grant-popup');
    const popupClose = document.querySelector('.popup-close');

    marketplaceLink.addEventListener('click', function(e) {
        e.preventDefault();
        megaGrantPopup.classList.add('active');
    });

    popupClose.addEventListener('click', function() {
        megaGrantPopup.classList.remove('active');
    });

    // Close popup when clicking outside
    megaGrantPopup.addEventListener('click', function(e) {
        if (e.target === megaGrantPopup) {
            megaGrantPopup.classList.remove('active');
        }
    });

    // Add event listeners for example buttons
    document.querySelectorAll('.example-card .button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const popup = document.getElementById('mega-grant-popup');
            const popupTitle = popup.querySelector('h3');
            const popupMessage = popup.querySelector('p');
            
            popupTitle.textContent = "Coming Soon!";
            popupMessage.textContent = "This example is currently under development. Check back later for updates!";
            
            popup.classList.add('active');
        });
    });

    // Gallery functionality
    const mainImage = document.getElementById('mainImage');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');

    // Array of all image paths
    const imagePaths = [
        'images/front-counter.png',
        'images/PointOfSales.png',
        'images/PickupCup.png',
        'images/PlaceCupUnderSpout.png',
        'images/PourCoffee.png',
        'images/AddLid.png',
        'images/ServeCoffee.png',
        'images/Wave.png',
        'images/HighresScreenshot00005.png',
        'images/HighresScreenshot00006.png',
        'images/HighresScreenshot00007.png',
        'images/HighresScreenshot00008.png',
        'images/HighresScreenshot00009.png',
        'images/HighresScreenshot00010.png',
        'images/HighresScreenshot00011.png',
        'images/HighresScreenshot00012.png',
        'images/HighresScreenshot00013.png',
        'images/HighresScreenshot00014.png',
        'images/HighresScreenshot00015.png',
        'images/HighresScreenshot00016.png'
    ];

    let currentIndex = 0;
    const preloadedImages = {};
    let preloadStarted = false;

    // Preload images in batches
    function preloadImages() {
        if (preloadStarted) return;
        preloadStarted = true;
        
        // First, preload the next and previous images
        const nextIndex = (currentIndex + 1) % imagePaths.length;
        const prevIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
        
        preloadImage(imagePaths[nextIndex]);
        preloadImage(imagePaths[prevIndex]);
        
        // Then start preloading the rest in batches
        let batchSize = 3;
        let currentBatch = 0;
        
        function preloadNextBatch() {
            const startIdx = (currentBatch * batchSize) % imagePaths.length;
            let count = 0;
            
            for (let i = 0; i < batchSize && count < imagePaths.length; i++) {
                const idx = (startIdx + i) % imagePaths.length;
                if (!preloadedImages[imagePaths[idx]]) {
                    preloadImage(imagePaths[idx]);
                    count++;
                }
            }
            
            currentBatch++;
            
            // Continue with next batch if there are more images to preload
            if (count > 0) {
                setTimeout(preloadNextBatch, 100);
            }
        }
        
        // Start the batch preloading after a short delay
        setTimeout(preloadNextBatch, 500);
    }
    
    // Preload a single image
    function preloadImage(path) {
        if (!preloadedImages[path]) {
            const img = new Image();
            img.src = path;
            preloadedImages[path] = img;
        }
    }

    // Start preloading after the page has fully loaded
    window.addEventListener('load', function() {
        // Wait a bit after the page load to start preloading
        setTimeout(preloadImages, 1000);
    });

    function updateImage(index) {
        const newImagePath = imagePaths[index];
        mainImage.src = newImagePath;
        currentIndex = index;
        
        // Start preloading if not already started
        if (!preloadStarted) {
            preloadImages();
        }
    }

    prevButton.addEventListener('click', () => {
        const newIndex = currentIndex === 0 ? imagePaths.length - 1 : currentIndex - 1;
        updateImage(newIndex);
    });

    nextButton.addEventListener('click', () => {
        const newIndex = currentIndex === imagePaths.length - 1 ? 0 : currentIndex + 1;
        updateImage(newIndex);
    });
}); 