# Collisions in `ScratchX`

*** 
This project is just starting.

Only the TypeScript part works, the resulting JavaScript file works in ScratchX

***

After playing with my grandson with `Scratch` I was wondering about real collisions between objects keeping track of kinetic energy and impuls. It looks complicated, especially whem more objects are involved.

`ScratchX` gave the opportunity to use `JavaScript` as external language. Well I don't like `JavaScript` very much, it's a sort of assembler for the web with the disadvantage that it doesn't neeed translation :-). My first question was if it was possible to use `TypeScript`.

In order to use `ScratchX` you need to do something with `Git Pages`.

This project tries to solve these three questions.

## `TypeScript`

I like to use `VSCode` for development, so I made a setup that after saving a `TypeScript` file it will automatically be converted to `JavaScript.

The conversion from the `boilerplate code` in `JavaScript` to `TypeScript` was not too difficult. I used an exanple to compute the power of a number and added a `acrctan` function. Importing the resulting `JavaScript` file in `ScratchX` showd expressions that computed the right answer.

Some questions remain:

- What about external code?
- modules and namespaces?

## Creating a `.sbx` file

Nessary steps:

- make a local (git)repository
- create a `GitHub` account
- clone the local repository to the git remote
- start using `github pages`
- clone the `ScratchX` project to `gh-pages`
- ...