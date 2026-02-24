# Luke's implementation

Hello, here's my submission for the Spruce tech challenge. You can run the entire thing from root using `docker compose up -d --build`. The server is running on 3002, the client on 3001.

There are a few improvements I'd like to make, although I think I've covered the main functionality so decided not to imlpement these bits.

- Input validation on the server side using zod
- Better typing on the server (I've been using NestJS recently, so I'm a bit rusty with Express)
- Better styling in the frontend

Please see the original spec below

---

# Tic-Tac-Toe

The below problems are to allow us a glimpse into your problem solving ability, style and current skill set. Vibe coding is allowed but we are looking for good taste, brevity and clarity in your code.

## Problems

### Problem 1

We have started a basic game of Tic-Tac-Toe as outlined [here](https://en.wikipedia.org/wiki/Tic-tac-toe) but we don't have anyone good enough to code to finish it!

- Please implement a complete basic game of Tic-Tac-Toe
- Please use React and TypeScript throughout, if you know TailwindCSS please expand on what is already provided, otherwise it is fine to use raw styling
- Both players will play out of the same application, it is sufficient to just switch the current player each time a move is played
- Once a game is completed, I should be able to start another game

### Problem 2

We are bored with the basic game now, can you make it so the board can be scaled to any size?

- Add some kind of input which allows me to change the board size
- The board size should be a number between 3 and 15

### Problem 3

We want to store game results in a database.

- Create a simple backend server
- Use any SQL database to store the results, please structure it in a relational manner and in a way for it to be expanded for future use cases
- Display simple stats back to the user including number of win and losses for each player

## Quickstart

- Make sure you have **node** installed
- `cd client`
- `npm i`
- `npm start`

## Submission

Once you are done please submit the public repo to your recruiter or invite nick@spruce.eco to your private repo and let your recruiter know.
