# Lab Exercise 4

## Introduction

In this lab exercise, we will:
- Create a JavaScript `class` that represents a generic notecard, and allows us to make multiple notecards
- Understand the JavaScript `this` keyword
- Write a function that removes HTML elements (i.e. notecards)
- (Bonus) Extract key/value pairs from a URL, and use them to modify a page


## in-progress notes

- introduce classes. start from lab 3 notecard object, and rewrite as class
- include footer as well (actually go back to lab 3 and just insert footer from beginning)
- pass element id as well
- create new notecard (notecardOne) and examine in console
- add updateelement function into notecard class
- in console, manually do updateelement
- then back in JS, add a call to updateelement in the constructor
- add the delete function
- in console, have students call delete function manually
- connect delete button to delete function
- note that "this" is now a problem, introduce func bind
- add expand and contract functions, trigger manually in browser
- go back to html, find those expand and collapse butttons
- attach functions to buttons
- add the second card
- add the third card
- bonus (urlparams)