// ------------------------------- CLASSES ------------------------------------
/**
 * A set of Pronouns
 */
var PronounSet = /** @class */ (function () {
    function PronounSet(name, subjective, objective, possessiveDeterminer, possessivePronoun, reflexive, personType, grammaticalNumber) {
        this.grammaticalNumber = grammaticalNumber;
        this.name = name.toLowerCase();
        this.subjective = subjective.toLowerCase();
        this.objective = objective.toLowerCase();
        this.possessiveDeterminer = possessiveDeterminer.toLowerCase();
        this.possessivePronoun = possessivePronoun.toLowerCase();
        this.reflexive = reflexive.toLowerCase();
        this.personType = personType.toLowerCase();
        function startsWith(check, characters) {
            for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
                var character = characters_1[_i];
                if (check.startsWith(character))
                    return true;
            }
            return false;
        }
        if (startsWith(this.personType, ['a', 'e', 'i', 'o', 'u'])) {
            this.aOrAn = 'an';
        }
        else {
            this.aOrAn = 'a';
        }
    }
    PronounSet.prototype.getArticle = function () {
        if (this.grammaticalNumber) {
            return "are";
        }
        else {
            return "is";
        }
    };
    return PronounSet;
}());
var Story = /** @class */ (function () {
    function Story(story) {
        this.story = story;
    }
    Story.capitalize = function (str) {
        var firstChar = str[0].toUpperCase();
        var stringRest = str.substring(1);
        return firstChar + stringRest;
    };
    Story.prototype.tellStory = function (pronouns) {
        // Applies a filter to the string to tell the story
        // Automatically creates uppercase versions of each filter
        var applyFilter = function (oldString, name, fn) {
            return oldString.replace(new RegExp("{" + name + "}", "g"), fn(pronouns))
                .replace(new RegExp("{" + Story.capitalize(name) + "}", "g"), Story.capitalize(fn(pronouns)));
        };
        var nStory = applyFilter(this.story, "name", function (s) { return s.name; });
        nStory = applyFilter(nStory, "subjective", function (s) { return s.subjective; });
        nStory = applyFilter(nStory, "objective", function (s) { return s.objective; });
        nStory = applyFilter(nStory, "possDet", function (s) { return s.possessiveDeterminer; });
        nStory = applyFilter(nStory, "possPro", function (s) { return s.possessivePronoun; });
        nStory = applyFilter(nStory, "reflexive", function (s) { return s.reflexive; });
        nStory = applyFilter(nStory, "personType", function (s) { return s.personType; });
        nStory = applyFilter(nStory, "a", function (s) { return s.aOrAn; });
        var start = 0;
        var end = 0;
        while (true) {
            start = nStory.indexOf('{');
            end = nStory.indexOf('}');
            if (start === -1 || end === -1) {
                break;
            }
            var choicesStr = nStory.substring(start, end + 1);
            var choices = nStory.substring(start + 1, end).split('/', 2);
            var choice = void 0;
            if (pronouns.grammaticalNumber) {
                choice = choices[1];
            }
            else {
                choice = choices[0];
            }
            nStory = nStory.replace(choicesStr, choice);
        }
        return nStory;
    };
    return Story;
}());
// ------------------------------ CONSTANTS -----------------------------------
/**
 * Gets a random element of an array
 * @param list The list to grab an element from
 */
function randomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
}
var STORIES = [
    "Hey! This is my friend, {Name}. {Subjective} {is/are} a good {personType}. You better be nice to {objective} or {possDet} friend is gonna be real mad. Kidding! {Subjective} can look after {reflexive}. But now you gotta be nice to me, or else {Name} is gonna be mad. No, you can't be my best friend. I'm {possPro}!",
    "Have you seen that new {personType}? {PossDet} name is {Name}. {Subjective} {seems/seem} pretty cool. But {subjective} {is/are} not full of {reflexive}. We should go talk to {objective}. That desk over there is {possPro}. Let's go meet {objective}!",
    "{Name} got up this morning. {Subjective} brushed {possDet} teeth. It's good {subjective} {takes/take} care of {reflexive}. {PossDet} friends look after {subjective} too. Now {subjective} {wants/want} a shower. That shower is {possPro}. Time to get to work. This concludes our look at the coolest {personType} around.",
    "The bus ride home wasn't too unusual for {Name}. {Subjective} heard a few people talking about {objective}. They said, \"I like {possDet} hair. I can't believe that's {possPro}. {Subjective} {seems/seem} like {subjective} {takes/take} care of {reflexive}. I like that {personType}.\"",
    "Hey, I have this friend I want you to meet. {PossDet} name is {Name}. I think you'll get along with {objective}. There, that picture is {possPro}. I know, {subjective} {is/are} a cute {personType}. So full of {reflexive} though.",
    "Super {Name} to the rescue! Oh no! There's a giant serpent destroying the city! This day is {possPro} to save! {Subjective} must stop this using {possDet} LASERS! It's not enough! This worries {objective}. Feeling {reflexive} starting to panic, {subjective} {jonahs/jonah} into the sepent and {destroys/destory} it from the inside out! Great job!",
    "Hey! Come sit with us, {Name}! I'll introduce {objective}. {Subjective} {is/are} {Name}. {PossDet} interests are kinda the same as mine, hehe. Except, {subjective} {doesn't/don't} talk to {reflexive} like I do 😳. Anyway... I have some time later today. I'll probably hang out with my favorite {personType}. My time is all {possPro}.",
    "{Name} was the first to wake on Christmas morning. For a moment the {personType} felt {reflexive} as disappointed as {subjective} {was/were} long ago. Then {subjective} remembered {possDet} mother's promise and, slipping {possDet} hand under {possDet} pillow, drew out a little book. It was that beautiful story of the best life that could ever be {possPro}, and {Name} felt that it was a true guidebook for any pilgrim going on a long journey.",
    "{Subjective} left the cottage and walked through the trees until {subjective} found a little spring of clear water, where {Name} drank and bathed and ate {reflexive} breakfast. {Name} saw there was not much bread left in {possDet} basket for {reflexive}, and the {personType} was thankful the Scarecrow did not have to eat anything, for there was scarcely enough for {objective} and Toto for the day. The rest of the food would be {possPro} and Toto's.",
    "The fence isn't anything that will stop {a} {personType}. {Name} tossed {possDet} pack and coil of rope over it and started climbing. {Subjective} caught {possDet} shirt as they went over, and had to stop for a moment to ease {reflexive} off. Then {subjective} dropped lightly to the grass on the other side. Victory is {possPro}!"
];
// Gender-neutral reflexive pronouns
var ENBY_REFLEXIVE = [
    "Themself", "Themselves", "Theirself", "Theirselves"
];
// Male reflexive pronouns
var MALE_REFLEXIVE = ["Himself", "Hisself"];
// ------------------------------- GLOBALS ------------------------------------
// The pronoun sets to use as hints
var DEFAULT_PRONOUN_SETS = [
    new PronounSet("", "They", "Them", "Their", "Theirs", randomElement(ENBY_REFLEXIVE), "Enby", false),
    new PronounSet("", "She", "Her", "Her", "Hers", "Herself", "Girl", false),
    new PronounSet("", "He", "Him", "His", "His", randomElement(MALE_REFLEXIVE), "Boy", false)
];
var storySection; // shows a story
// the pronoun input
var nameInput;
var subjective;
var objective;
var possessiveDeterminer;
var possessivePronoun;
var reflexive;
var personType;
var numericGrammar;
var plural;
// -------------------------- PRIVATE FUNCTIONS -------------------------------
/**
 * Returns a shuffle of an array
 * @param list The list to shuffle
 */
function shuffle(list) {
    var _a;
    for (var i = list.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [list[j], list[i]], list[i] = _a[0], list[j] = _a[1];
    }
}
function setInputElements() {
    var getElement = function (id) { return document.getElementById(id); };
    storySection = getElement("story");
    nameInput = getElement("name");
    subjective = getElement("sub");
    objective = getElement("obj");
    possessiveDeterminer = getElement("pd");
    possessivePronoun = getElement("pp");
    reflexive = getElement("r");
    personType = getElement("ty");
    plural = getElement("plural");
    var setChangeEvent = function (box) { return box.onchange = checkFilledEvent; };
    setChangeEvent(nameInput);
    setChangeEvent(subjective);
    setChangeEvent(objective);
    setChangeEvent(possessiveDeterminer);
    setChangeEvent(possessivePronoun);
    setChangeEvent(reflexive);
    setChangeEvent(personType);
}
function setPlaceholders() {
    // a string from the result of a function mapped on DEFAULT_PRONOUN_SET
    // all of the results are separated by slashes
    var insertSlashes = function (func) {
        return DEFAULT_PRONOUN_SETS.map(func).join('/');
    };
    // sets the placeholder of a text input box to the result of insertSlashes
    var setPlaceholder = function (input, func) {
        return input.placeholder = insertSlashes(func);
    };
    // set placeholder hints
    setPlaceholder(subjective, function (e) { return e.subjective; });
    setPlaceholder(objective, function (e) { return e.objective; });
    setPlaceholder(possessiveDeterminer, function (e) { return e.possessiveDeterminer; });
    setPlaceholder(possessivePronoun, function (e) { return e.possessivePronoun; });
    setPlaceholder(reflexive, function (e) { return e.reflexive; });
    setPlaceholder(personType, function (e) { return e.personType; });
}
function checkFilledEvent(event) {
    var box = event.target;
    if (box.value === "") {
        box.style.backgroundColor = "pink";
    }
    else {
        box.style.backgroundColor = "white";
    }
}
// --------------------------- PUBLIC FUNCTIONS -------------------------------
function tellStory() {
    // get pronouns
    var pronouns = new PronounSet(nameInput.value, subjective.value, objective.value, possessiveDeterminer.value, possessivePronoun.value, reflexive.value, personType.value, plural.checked);
    var story = new Story(randomElement(STORIES));
    storySection.textContent = story.tellStory(pronouns);
}
function followMouse(event) {
    event = event || window.event;
    var elements = document.getElementsByClassName("help");
    for (var i = 0; i < elements.length; i++) {
        var element = elements.item(i);
        element.style.left = scrollX + event.clientX + 10 + "px";
        element.style.top = scrollY + event.clientY + 10 + "px";
    }
}
/**
 * Intializes the site
 */
function init() {
    setInputElements(); // get elements
    storySection.textContent = ""; // set story as blank
    shuffle(DEFAULT_PRONOUN_SETS); // shuffle the pronoun list
    setPlaceholders(); // set placeholder hints
    document.onmousemove = followMouse;
}
