
# shopify-frontend

A simple AI assistant chat room for Shopify's frontend challenge

## Layout

Fully responsive, though not recommended for displays smaller than 400x300.

The header has the site name and logo (created in Blender) and a temperature slider, for controlling how predictable the AI is.

The main section is a message board where all the messages are logged.

The footer is where the message prompt is.
Users can press `Enter` or the `Play` button to send a message, or press `Shift+Enter` to add a newline.
When a user reaches the end of a line, it automatically resize to give them more space (until a certain point, at which it allows for scrolling).

## Dependencies

* Heroku, for hosting
* Gin (Go), for backend
* Sass, for CSS preprocessing
* Normalize.css, for setting up basic cross-browser compatibility
* JQuery, for easier JS
* Roboto, main font
* Roboto Mono, prompt font

## Technical

Giving the AI really old context (previous messages) can ruin the context of future messages. Instead, the AI is given a small prompt explaining the basic premise (an AI assistant replying politely to messages) and the last message exchange between the user and AI. This way, the AI has decent context for a small chain of messages, but older messages lose relevancy.

The temperature slider is useful when trying to get more randomized results (i.e. "Give me a list of random numbers"), where predictability is undesirable.

The backend was written in Go, since I see a lot of Go projects on Shopify's GitHub repository (I am applying for a Backend position as well). Heroku's Go template used Gin, so I stuck with that. I used the backend as a reverse proxy for calls to the Open AI API (just pass the secret into the Authorization header).

## TODO
* Resizing the window doesn't update the height of the message prompt (i.e. 4 lines of text will stay at 4 lines even though only 2 lines are used)
* Perhaps experiment if the AI can be used to generate the temperature for a question (depends on if the AI understands what temperature in this context means)