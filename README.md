# Genius - AI Text/Image Generation App


Genius is an AI-powered application that allows users to generate text and images based on their inputs.  
It is deployed at [https://ai-project-pi.vercel.app](https://ai-project-pi.vercel.app) and offers free access to all users. For additional features and benefits, users can upgrade to the Pro plan, which is managed by Stripe for secure payment processing. All routes are protected with authentication handled by Clerk-Auth to ensure user privacy and security.

## Features

- **AI Text Generation**: Enter your prompts, and Genius will generate creative and contextually relevant text content.
- **AI Image Generation**: Provide descriptions, and Genius will produce corresponding images using cutting-edge AI algorithms.
- **Free Access**: All users can utilize the basic features of the application for free.
- **Pro Plan**: Upgrade to the Pro plan to access advanced features and premium content.
- **Stripe Integration**: Secure and seamless payment processing for Pro plan subscription through Stripe.
- **Clerk-Auth**: Authentication is managed by Clerk-Auth to protect user data and ensure secure access to routes.


## Development Setup

To run Genius locally, follow these steps:

1. Clone the repository
2. Install the required dependencies by running `npm install`
3. Set up the following environment variables in a `.env` file at the root of the project.

```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=

MONGO_URI=mongodb+srv://{username}:{password}@cluster0.knj2xtz.mongodb.net/{db-name}

STRIPE_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000

STRIPE_WEBHOOK_SECRET=
```
4. Start the local development server by running `npm run dev`
<br><br>
  
  

Once the server starts, the Genius application will be available at http://localhost:3000. You can now interact with the application, generate text and images, and test the Pro plan features using the Stripe payment integration.

Remember that the provided environment variables should be set up with the appropriate values before running the application locally. Make sure to have valid credentials for Clerk-Auth, Stripe, and MongoDB to ensure the smooth functioning of the application.
