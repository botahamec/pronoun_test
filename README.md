# Pronoun Testing Grounds
https://botahamec.github.io/pronoun_test

## About

This project was created for 43 North's Code:Buffalo hackathon. It's goal is to help people questioning their gender to try different sets of pronouns and see how they like them. This is similar to the technique of trying out names at Starbucks. It's inspired by the Pronoun Dressing Room, which unfortunately has a limited number of stories. This version creates a new story each time.

## How it Works

The webpage uses HTML, CSS, and TypeScript. To reduce load times and data usage (and not because of laziness), there are no UI frameworks like React or Vue. This doesn't even use jQuery. All of the scripting was done using TypeScript compiled to JavaScript ES3.

The story is picked at random each time the "Submit" button is pressed. Each story is a long string of text that has some "variables" which are formatted like this: `{Name} likes {objective}. {Subjective} {likes/like} {Name}.`. The parser has to take capitalization into account, as well as the grammatical number whenever present-tense verbs are used.

The hover text for hints is secretly always following the mouse in the background, but is only displayed when hovering over the text boxes. Speaking of which, I couldn't come up with a good order for the placeholder text, so I randomized it. It also randomizes certain reflexive pronouns: "himself"/"hisself" and "themself/themselves/theirself/theirselves".

## Future Plans?

* Allow the user to type in a custom message
* Have the story load on startup if the pronouns are present
* Make certain stories which work without some of the pronouns
* Subtly change the textbox color if a certain pronoun isn't specified
* Add more stories
