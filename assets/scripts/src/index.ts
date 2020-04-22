// ------------------------------- CLASSES ------------------------------------

/**
 * A set of Pronouns
 */
class PronounSet {

	public constructor(subjective: string,
					   objective: string,
					   possessiveDeterminer: string,
					   possessivePronoun: string,
					   reflexive: string,
					   personType: string) {
		this.subjective = subjective;
		this.objective = objective;
		this.possessiveDeterminer = possessiveDeterminer;
		this.possessivePronoun = possessivePronoun;
		this.reflexive = reflexive;
		this.personType = personType;
	}

	/** They/She/He */
	public subjective: string;

	/** Them/Her/Him */
	public objective: string;

	/** Their/Her/His */
	public possessiveDeterminer: string;

	/** Theirs/Hers/His */
	public possessivePronoun: string;

	/** Themself/Herself/Himself */
	public reflexive: string;

	/** Enby/Girl/Boy */
	public personType: string;
}

// ------------------------------ CONSTANTS -----------------------------------

/**
 * Gets a random element of an array
 * @param list The list to grab an element from
 */
function randomElement<T>(list: Array<T>) : T {
	return list[Math.floor(Math.random() * list.length)];
}

// Gender-neutral reflexive pronouns
const ENBY_REFLEXIVE: string[] = [
	"Themself", "Themselves", "Theirself", "Theirselves"
];

// Male reflexive pronouns
const MALE_REFLEXIVE: string[] = ["Himself", "Hisself"];

// ------------------------------- GLOBALS ------------------------------------

// The pronoun sets to use as hints
let DEFAULT_PRONOUN_SETS: PronounSet[] = [

	new PronounSet(
		"They", "Them", "Their", "Theirs",
		randomElement(ENBY_REFLEXIVE), "Enby"
	),

	new PronounSet("She", "Her", "Her", "Hers", "Herself", "Girl"),

	new PronounSet(
		"He", "Him", "His", "His", randomElement(MALE_REFLEXIVE), "Boy"
	)
];

let story: HTMLElement; // shows a story

// the pronoun input
let nameInput: HTMLInputElement;
let subjective: HTMLInputElement;
let objective: HTMLInputElement;
let possessiveDeterminer: HTMLInputElement;
let possessivePronoun: HTMLInputElement;
let reflexive: HTMLInputElement;
let personType: HTMLInputElement;
let numericGrammar: NodeListOf<HTMLInputElement>;

// ------------------------------ FUNCTIONS -----------------------------------

/**
 * Returns a shuffle of an array
 * @param list The list to shuffle
 */
function shuffle<T>(list: Array<T>) {
	for (let i = list.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[list[i], list[j]] = [list[j], list[i]];
	}
}

function setInputElements() {
	const getElement = (id: string) => document.getElementById(id);
	const getByName = (name: string) => document.getElementsByName(name);
	story = getElement("story");
	nameInput = <HTMLInputElement>getElement("name");
	subjective = <HTMLInputElement>getElement("sub");
	objective = <HTMLInputElement>getElement("obj");
	possessiveDeterminer = <HTMLInputElement>getElement("pd");
	possessivePronoun = <HTMLInputElement>getElement("pp");
	reflexive = <HTMLInputElement>getElement("r");
	personType = <HTMLInputElement>getElement("ty");
	numericGrammar = <NodeListOf<HTMLInputElement>>getByName("gnumber");
}

function setPlaceholders() {
	// a string from the result of a function mapped on DEFAULT_PRONOUN_SET
	// all of the results are separated by slashes
	const insertSlashes = (func: (set: PronounSet) => string) =>
		DEFAULT_PRONOUN_SETS.map(func).join('/');

	// sets the placeholder of a text input box to the result of insertSlashes
	const setPlaceholder =
		(input: HTMLInputElement, func: (set: PronounSet) => string) =>
			input.placeholder = insertSlashes(func);

	// set placeholder hints
	setPlaceholder(subjective, e => e.subjective);
	setPlaceholder(objective, e => e.objective);
	setPlaceholder(possessiveDeterminer, e => e.possessiveDeterminer);
	setPlaceholder(possessivePronoun, e => e.possessivePronoun);
	setPlaceholder(reflexive, e => e.reflexive);
	setPlaceholder(personType, e => e.personType);
}

/**
 * Intializes the site
 */
function init() {
	setInputElements(); // get elements
	story.textContent = ""; // set story as blank
	shuffle(DEFAULT_PRONOUN_SETS); // shuffle the pronoun list
	setPlaceholders(); // set placeholder hints
}

function tellStory() {}