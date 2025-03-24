// Facts array
const facts = [
    "Your Outie loves the color blue.",
    "Your Outie recently had a very pleasant meal with friends.",
    "Your Outie enjoys taking long walks in the park.",
    "Your Outie has been sleeping well.",
    "Your Outie has been recognized for their hard work.",
    "Your Outie has a preference for jazz music.",
    "Your Outie has recently acquired a new plant.",
    "Your Outie maintains a tidy living space.",
    "Your Outie has a fondness for spicy food.",
    "Your Outie is in good health.",
    "Your Outie has been reading more lately.",
    "Your Outie has been exercising regularly.",
    "Your Outie is respected by their colleagues.",
    "Your Outie enjoys watching documentaries.",
    "Your Outie recently helped someone in need.",
    "A photo of your Outie with a trophy was once in a newspaper.",
    "Your Outie attends many dances and is popular among the other attendees.",
    "Your Outie avoids obscenities around children and the old.",
    "Your Outie can leap admirably but does not do so to show off.",
    "Your Outie can make a house or apartment feel like a home.",
    "Your Outie can parallel park in less than 20 seconds.",
    "Your Outie can pick up an animal without injuring it.",
    "Your Outie can roller-skate with grace.",
    "Your Outie can set up a tent in under three minutes.",
    "Your Outie dances like nobody is watching.",
    "Your Outie does not give excessive or annoying thumbs-ups.",
    "Your Outie does not make adults with visible orthodontia feel unwelcome or judged.",
    "Your Outie enjoys giving hugs to the poor.",
    "Your Outie gets along with barkeeps and service workers.",
    "Your Outie gives food and money to the destitute.",
    "Your Outie has been mistaken for a celebrity who is widely considered handsome.",
    "Your Outie has both zaz and pep.",
    "Your Outie has brightened people's days by merely smiling.",
    "Your Outie has no fear of muggers or knaves.",
    "Your Outie has survived multiple earthquakes and will survive more.",
    "Your Outie is a friend to children and to the elderly and the insane.",
    "Your Outie is a motorist.",
    "Your Outie is admired by domesticated animals.",
    "Your Outie is courteous to strangers without expectation of reward.",
    "Your Outie is familiar with the myth of Hercules and derives great meaning from it.",
    "Your Outie is fond of music and owns many records.",
    "Your Outie is generous.",
    "Your Outie is gentle.",
    "Your Outie is honest to law enforcement workers.",
    "Your Outie is resilient and will be alright.",
    "Your Outie is skilled at kissing and lovemaking.",
    "Your Outie is splendid and can swim gracefully and well.",
    "Your Outie is strong and helped someone lift a heavy object.",
    "Your Outie is the second tallest of their friend group.",
    "Your Outie keeps an open mind and a generous heart.",
    "Your Outie knows a beautiful rock from a plain one.",
    "Your Outie laughs beautifully and well.",
    "Your Outie likes films and owns a machine that can play them.",
    "Your Outie likes the sound of radar.",
    "Your Outie listens to music while shaving, but not while showering.",
    "Your Outie makes pleasing noises.",
    "Your Outie makes time for people even when they're slow and dawdling.",
    "Your Outie once captured a butterfly.",
    "Your Outie pays all of their gas and electric bills within three business days.",
    "Your Outie prefers two scoops of ice cream in a serving, but they must be the same flavor.",
    "Your Outie spells and punctuates their written sentences in the proper way.",
    "Your Outie understands and accepts loss as a part of life.",
    "Your Outie understands the difference between an insect and an arachnid.",
    "Your Outie values water.",
    "Your Outie waits patiently in lines.",
    "Your Outie will ascend to Heaven upon their death if such a place exists.",
    "Your Outie will not waste time in the restroom.",
    "Your Outie won a game two weeks ago."
];

// Variables
let points = 100;
let previousFact = "";
let sessionActive = true;
let factCount = 0;
let buttonsActive = true;

// Constants
const KINDNESS_FREQUENCY = 8;
const KIDNESS_STATEMENT = "Your Outie is kind.";
const FADE_DURATION = 1000;
const FADE_DELAY = 3000;
const BUTTON_DELAY = 1500;



// DOM elements
const factElement = document.getElementById("fact");
const pointsElement = document.getElementById("points");
const messageElement = document.getElementById("message");
const sessionEndedElement = document.getElementById("session-ended");
const speakButton = document.getElementById("speak");
const voteUpButton = document.getElementById("voteUp");
const voteDownButton = document.getElementById("voteDown");
const shareButton = document.getElementById("share");

// Function to display a fact
function displayFact() {
    if (!sessionActive) return;
    
    let nextFact;
    
    // Every 4th fact is "Your Outie is kind."
    if (factCount % KINDNESS_FREQUENCY === 0) {
        nextFact = KIDNESS_STATEMENT;
    } else {
        // Choose random fact
        do {
            const factIndex = Math.floor(Math.random() * facts.length);
            nextFact = facts[factIndex];
        } while (nextFact === previousFact);
    }
    
    // Fade in
    factElement.textContent = nextFact;
    factElement.style.opacity = 1;
    
    // Store for comparison
    previousFact = nextFact;
    factCount++;
    
    // Fade out after 4 seconds
    setTimeout(() => {
        factElement.style.opacity = 0;
        
        // Display next fact after 1 second delay
        if (sessionActive) {
            setTimeout(displayFact, FADE_DURATION);
        }
    }, FADE_DELAY);
}

// Function to display a message
function displayMessage(text) {
    if (!buttonsActive) return;
    disableButtons();
    messageElement.textContent = text;
    
    setTimeout(() => {
        messageElement.textContent = "";
        enableButtons();
    }, BUTTON_DELAY);
}

// Function to handle speaking
function handleSpeak() {
    if (!sessionActive) return;
    
    points -= 10;
    pointsElement.textContent = points;
    
    // Display speaking message
    displayMessage("Speaking is prohibited and penalized by point deductions in increments of 10.");
    
    // Check if session should end
    if (points <= 0) {
        endSession();
    }
}

// Function to handle voting
function handleVote() {
    if (!sessionActive) return;
    
    // Display voting message
    displayMessage("Please try to enjoy all facts equally, showing no particular emotion to specific facts.");
}

// Function to handle sharing
function handleShare() {
    if (!sessionActive) return;
    
    // Display sharing message
    displayMessage("Sharing the facts outside the wellness room is prohibited.");
}


function disableButtons() {
    buttonsActive = false;
    speakButton.disabled = true;
    voteUpButton.disabled = true;
    voteDownButton.disabled = true;
    shareButton.disabled = true;
}

function enableButtons() {
    buttonsActive = true;
    speakButton.disabled = false;
    voteUpButton.disabled = false;
    voteDownButton.disabled = false;
    shareButton.disabled = false;
}

// Function to end session
function endSession() {
    sessionActive = false;
    sessionEndedElement.textContent = "Wellness session terminated.";
    disableButtons();
}

// Event listeners
speakButton.addEventListener("click", handleSpeak);
voteUpButton.addEventListener("click", handleVote);
voteDownButton.addEventListener("click", handleVote);
shareButton.addEventListener("click", handleShare);

// Start displaying facts
displayFact();
