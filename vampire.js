
// Who is a vampire's creator?
// How many vampires has a vampire created?
// How many vampires away from the original vampire is a vampire?
// Who is the more senior vampire out of two vampires? (Who is closer to the original vampire)
// Who is the closest common ancestor of two vampires?
// Vampr needs to store and organize all the vampires

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numofVamp = 0;
    let currVamp = this;

    while (currVamp.creator) {
      currVamp = currVamp.creator;
      numofVamp++;
    }

    return numofVamp;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
      return false;
    }
    return true;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisAncestors = [];
    let currentVampire = this;

    // Traverse up the lineage and collect all ancestors of this vampire
    while (currentVampire) {
      thisAncestors.push(currentVampire);
      currentVampire = currentVampire.creator;
    }

    // Start with the other vampire and move up their lineage until
    // an ancestor is found that is also in this vampire's ancestry list.
    currentVampire = vampire;
    while (currentVampire) {
      if (thisAncestors.includes(currentVampire)) {
        return currentVampire;
      }
      currentVampire = currentVampire.creator;
    }

    return null;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (this.name === name) { // checks if current vampire
      return this;
    }

    for (const offspring of this.offspring) { // checks offspring
      const found = offspring.vampireWithName(name);
      if (found) {
        return found;
      }
      return null;
    }
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for (const offspring of this.offspring) {
      count += 1 + offspring.totalDescendents; // Include the offspring and all of its descendants
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];
    if (this.yearConverted > 1980) {
      millennials.push(this);
    }
    for (const offspring of this.offspring) {
      millennials = millennials.concat(offspring.allMillennialVampires);
    }
    return millennials;
  }
}

const dracula = new Vampire("Dracula", 1500);
const bart = new Vampire("Bart", 1595);
const ansel = new Vampire("Ansel", 1510);
const elgort = new Vampire("Elgort", 1550);
const sarah = new Vampire("Sarah", 1555);
const andrew = new Vampire("Andrew", 1610);

module.exports = Vampire;

