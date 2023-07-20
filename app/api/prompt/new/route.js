import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';

// Creating a new route that is a POST request. Lamda function. It dies after it is done.
export const POST = async (req) => {
  // extracting the data that are past through the POST request
  const { userId, prompt, tag } = await req.json();

  // connect to the database
  try {
    await connectToDatabase();
    // Create a new prompt
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    // Save the newPrompt to the the database
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt.', { status: 500 });
  }
};
