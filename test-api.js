const API_KEY = "mb_live_RJMBbRI5KLpMhkuo6ukDqh1BmVaKf0Zd";
const DOMAIN = "example.com"; // Replace this with the actual domain you linked in your dashboard!
const BASE_URL = "https://monkbot.app/api/v1/plugin";
// If you want to test locally instead, uncomment this line:
// const BASE_URL = "http://localhost:3000/api/v1/plugin";

async function runTests() {
    console.log(`\n=== Testing Monkbot SaaS API ===`);
    console.log(`Target: ${BASE_URL}`);
    console.log(`Domain: ${DOMAIN}`);
    console.log(`Key:    ${API_KEY.slice(0, 14)}...`);

    // 1. Test /validate Endpoint
    console.log(`\n[1] Testing /validate endpoint...`);
    try {
        const validateRes = await fetch(`${BASE_URL}/validate`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "X-Monkbot-Domain": DOMAIN
            }
        });

        const validateData = await validateRes.json();
        console.log(`Status: ${validateRes.status}`);
        console.log(`Body:`, validateData);

        if (!validateRes.ok) {
            console.error("❌ Validation failed! Make sure your API key is correct and the domain is linked in your dashboard.");
            return; // Stop if validation fails
        } else {
            console.log("✅ Validation successful!");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        return;
    }

    // 2. Test /chat-completions Endpoint
    console.log(`\n[2] Testing /chat-completions endpoint...`);
    try {
        const body = {
            model: "gpt-4o-mini", // Using the mini model for the test
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Hello! This is a test from the backend test script. Please respond with a short confirmation message." }
            ]
        };

        const chatRes = await fetch(`${BASE_URL}/chat-completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
                "X-Monkbot-Domain": DOMAIN
            },
            body: JSON.stringify(body)
        });

        const chatData = await chatRes.json();
        console.log(`Status: ${chatRes.status}`);

        if (chatRes.ok) {
            console.log(`✅ Chat Completion successful!`);
            console.log(`Response:`, chatData.choices?.[0]?.message?.content);
        } else {
            console.error("❌ Chat Completion failed!");
            console.log(`Error Body:`, chatData);
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

runTests();
