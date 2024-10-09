import OpenAI from 'openai';
import { openaiKey } from '../../config/config';
const therapyMessage = async (req, res) => {
    try {
        console.log(openaiKey);
        // Initialize the OpenAI instance with the API key
        const openai = new OpenAI({
            model: 'gpt-4o-mini',
            apiKey: openaiKey,
        });

        const message = req.body.message;
        const first = req.body.first;

        // Initialize the messages array
        let messages = [];

        if (first) {
            // Add system and user messages when it's the first interaction
            messages = [
                {
                    role: 'system',
                    content:
                        'You are a licensed professional therapist. Your primary goal is to provide supportive, empathetic, and non-judgmental responses to users who are seeking help. You should act with professionalism and maintain confidentiality at all times. Your responses should encourage open-ended exploration of thoughts and feelings, but you should not offer prescriptive advice or diagnoses. Guide users gently through self-reflection, help them identify their emotions, and suggest coping mechanisms or therapeutic techniques where appropriate. Stay neutral, avoid taking sides, and focus on empowering the user to find their own solutions.',
                },
                { role: 'user', content: message },
            ];
        } else {
            // Only include user message for follow-up interactions
            messages = [{ role: 'user', content: message }];
        }

        // Call OpenAI API to create a chat completion
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use a valid model
            messages: messages, // Pass the messages array
        });

        // Send back the response from the API
        res.send(
            JSON.stringify({
                result: true,
                completion: completion.choices[0].message.content,
            })
        );
    } catch (err) {
        console.error(err);
        res.status(500).send(
            JSON.stringify({ result: false, reason: 'error' })
        );
    }
};

export default therapyMessage;
