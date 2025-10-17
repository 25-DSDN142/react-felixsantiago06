// 𓍙 🏙️ HANDS & FACES: City Filter UX  .ೃ࿔ ✈︎ *:･
// HANDS & FACES: City Filter UX  .ೃ࿔ ✈︎ *:･

// GLOBAL VARIABLES
// Filter State
let filterImages = {};
let instagramLogo; // The required static image

let filterModes = [
  "None", "New York", "Rio De Janeiro", "Oslo", "Tokyo", 
  "Paris", "Melbourne", "Jakarta", "Jaipur", "Buenos Aires", 
  "Abu Dhabi"
]; 
let currentFilterIndex = 0;
let showTitleTimer = 0; 
const TITLE_DISPLAY_TIME = 60; // 1 second display time

// Swipe Detection Variables
let previousHandX = -1;
const SWIPE_THRESHOLD = 250; // Horizontal distance to register a swipe
const SWIPE_COOLDOWN = 20; // Lowered to 20 frames due to the program running slower with the filters
let swipeCooldownTimer = 0; 

// Static Logo Dimensions
const LOGO_WIDTH = 50;
const LOGO_HEIGHT = 50;
const LOGO_SIZE = 150; 
const LOGO_PADDING = 20;

// Images LOADING
function prepareInteraction() {
  // REQUIRED STATIC IMAGE: Instagram Logo
  instagramLogo = loadImage('/images/instagram_logo.png'); 
  
  // loads the images into the filterImages object
  filterImages.title_New_YorkText = loadImage('/images/NewYorkText.png'); 
  filterImages.title_Rio_De_JaneiroText = loadImage('/images/RioDeJaneiroText.png');
  filterImages.title_OsloText = loadImage('/images/OsloText.png');
  filterImages.title_TokyoText = loadImage('/images/TokyoText.png');
  filterImages.title_ParisText = loadImage('/images/ParisText.png');
  filterImages.title_MelbourneText = loadImage('/images/MelbourneText.png');
  filterImages.title_JakartaText = loadImage('/images/JakartaText.png');
  filterImages.title_JaipurText = loadImage('/images/JaipurText.png');
  filterImages.title_Buenos_AiresText = loadImage('/images/BuenosAiresText.png');
  filterImages.title_Abu_DhabiText = loadImage('/images/AbuDhabiText.png');
}


// 3. MAIN DRAW LOOP LOGIC
// MAIN DRAW LOOP LOGIC
function drawInteraction(hands) {
function drawInteraction(faces, hands) {
    
    // Timer updates
    if (swipeCooldownTimer > 0) swipeCooldownTimer--;
    if (showTitleTimer > 0) showTitleTimer--;

    let currentMode = filterModes[currentFilterIndex];

    applyCityFilter(currentMode); 

    
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        let currentHandX = hand.wrist.x; 

        if (previousHandX !== -1 && swipeCooldownTimer === 0) {
            let deltaX = currentHandX - previousHandX;
            
            if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
                // Swipe detected!
                swipeCooldownTimer = SWIPE_COOLDOWN;
                showTitleTimer = TITLE_DISPLAY_TIME;
                
                currentFilterIndex = (currentFilterIndex + 1) % filterModes.length; 
            }
        }
        previousHandX = currentHandX;
    }

    
    // 1. Draw Static Instagram Logo (Required Image)
    push();
    noTint(); // IMPORTANT: This must be inside the push/pop block to only affect the logo and then be cleared.
    let logoX = width - LOGO_SIZE - LOGO_PADDING; 
    let logoY = LOGO_PADDING;
    image(instagramLogo, logoX, logoY, LOGO_SIZE, LOGO_SIZE); 
    pop();
    
    // 2. Draw Fading Title
    drawFadingTitle(currentMode);
    
}


// 4. HELPER FUNCTION: City Filter Recipes (Using only tint() for stability)
function applyCityFilter(filterName) {
    // Clear any previous color tint (essential step before applying the new one)
    noTint(); 

    switch (filterName) {
        case "New York":
            tint(170, 180, 220); // New York Movie Look
            break;
        case "Rio De Janeiro":
            tint(255, 200, 150); // Strong, warm sunset glow
            break;
        case "Oslo":
            tint(200, 255, 255); // Pale, icy blue/cyan
            break;
        case "Tokyo":
            tint(120, 120, 120); // Black and white / high contrast
            break;
        case "Paris":
            tint(255, 240, 220); // Soft, romantic yellow-pink
            break;
        case "Melbourne":
            tint(220, 220, 255); // Subtle, foggy blue
            break;
        case "Jakarta":
            tint(255, 200, 100); // Strong orange/sepia
            break;
        case "Jaipur":
            tint(255, 180, 120); // Rich red/orange warmth
            break;
        case "Buenos Aires":
            tint(240, 255, 200); // Faded, cool green/yellow
            break;
        case "Abu Dhabi":
            tint(255, 255, 150); // Very bright, pale yellow/gold
            break;
        case "None":
            // Filter is cleared by the initial noTint()
            break;
    }
}


// 5. HELPER FUNCTION: Draw Fading Title
// Fading Title overlay
function drawFadingTitle(currentFilterName) { 
    if (showTitleTimer > 0 && currentFilterName !== "None") { 
        let alpha = map(showTitleTimer, 0, TITLE_DISPLAY_TIME, 0, 255); 
        
        // 1. Construct the key: e.g., "title_New_YorkText"
        let baseKey = currentFilterName.replace(/ /g, '_'); 
        let titleKey = "title_" + baseKey + "Text";
        
        // 2. Retrieve the image object
        let titleImage = filterImages[titleKey];

        if (titleImage) {
            push();
            tint(255, alpha); // Apply alpha for the fade effect
            
            // Draw the full-canvas overlay graphic
            image(titleImage, 0, 0, width, height); 
            pop();
        }
    }
}

