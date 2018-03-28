# Collisions in `ScratchX`

Real collisions between objects keeping track of kinetic energy and impuls. It looks complicated, especially whem more objects are involved.

`ScratchX` gives the opportunity to use `JavaScript` as external language. 
As I prefer `TypeScript` above `JavaScript` I want to setup a project in `ScratchX` that solves collisions on a more physical way, using `TypeScript` as programming language, hoping it's more easy than doing is locally in `Scratch`.

## Using `TypeScript`

The `JavaScript` boilerplate code for `Scratchx` uses IIFE (immediately-invoked function expression) that can be converted into `TypeScript`. De file `iife.ts` in the src directory is an example.

The project uses `VSCode` to convert `TypeScript` into `JavaScript`. The corresponding file can be found in `ScratchXProject`.

`VSCode` is setup to compile the `.ts` files when saved (after starting the buildtask)

--- Even afwachten wat er gebeurt wanneer je meer js files maakt of alles aan elkaar plakt. Hiermee nog geen ervaring ---

## Creating a `.sbx` file

A `ScratchX` project does not use a `.sb` file, but a `.sbx` file. Making such a file is not straightforward. You have to make ... also for local files.

Nessary steps, I think:

- make a local (git)repository
- create a `GitHub` account
- clone the local repository to the git remote
- start using `github pages`
- clone the `ScratchX` project to `gh-pages`
- ...