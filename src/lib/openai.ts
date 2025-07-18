import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // OK for client-side if key is safe to expose
});

export async function getSuggestedTitles(prompt: string): Promise<string[]> {
    try {
        console.log("🎮 Fetching AI suggestions...");

        const res = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125", // Changed model here
            messages: [
                {
                    role: "system",
                    content:
                        "You are a game recommendation expert. Only respond with existing video game titles.",
                },
                {
                    role: "user",
                    content: `Suggest 5 existing video games (real games only, no made up titles) based on this mood or interest: "${prompt}". Just return the titles in a comma-separated list.`,
                },
            ],
        });

        const text = res.choices[0].message.content || "";
        console.log("✅ AI Response:", text);

        return text
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);
    } catch (err: any) {
        console.error("❌ Error getting suggestions:", err.message);
        return [];
    }
}
