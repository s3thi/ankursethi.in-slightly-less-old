---
title: "Seven Languages in Seven Weeks, Week 2: Io"
date: "2018-01-17T08:43:45+05:30"
slug: "seven-languages-in-seven-weeks-week-2-io"
category: "Programming"
---

Designed by Steve Dekorte, [Io](http://iolanguage.org/) is a small, embeddable programming language that borrows its prototype-based object model from [Self](http://www.selflanguage.org/), its purely object-oriented nature from [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk), and its homoiconicity from [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)) (although, unlike Lisp, it doesn't use s-expressions to represent programs). The language is such a mind-expanding experience that I have now spent way more than a week playing with it.

## Syntax

Io's syntax takes only a few minutes to learn. In short, everything in Io is a _message_ that is passed to a _receiver_:

Io> receiver message

A message can accept arguments:

Io> receiver message(param1, param2, ...)

And finally, a message without a receiver is sent to the top-level object called `Object`:

Io> writeln("this message is sent to Object")

That's it. Any other syntax you see is sugar that gets translated into this simple form.

The receiver can choose whether it wants to evaluate a message or not, which allows you to do so selectively in order to implement domain-specific languages. For example, Io has an `if` conditional like any other language:

Io> if (a > 10, "more than 10", a = a + 10)

A simple re-implementation of `if` would look something like this:

Io> myIf := method(
  call evalArgAt(0) ifTrue(call evalArgAt(1)) ifFalse(call evalArgAt(2))
)

And here's how you'd use it:

Io> a := 10
Io> myIf(a == 10, "a is 10" println, "a is not 10" println)
a is 10
Io> a = 11
Io> myIf(a == 10, "a is 10" println, "a is not 10" println)
a is not 10

## Prototypes

Io has a [prototype-based object system](https://en.wikipedia.org/wiki/Prototype-based_programming), which it borrows from Self. After learning how Io deals with objects, I started to investigate JavaScript's object model in greater depth. As a result, I walked away with a much better understanding of OOP in JavaScript.

In a language with a prototype-based object system, new objects are created using existing objects as templates. For example, in the next block of code, `Animal` is a clone of the top-level `Object`. It contains all the slots (or properties) of `Object`.

Io> Animal := Object clone

We can use the `:=` operator to add a new slot to Animal:

Io> Animal talk := method(writeln("This animal can't talk."))

Cat is a clone of Animal. It gets all the slots of `Object`, as well as the `talk` slot defined on `Animal`.

Io> Cat := Animal clone
Io> meep := Cat clone
Io> meep talk
This animal can't talk.

However, it can have its own `talk` slot too.

Io> Cat talk := method(writeln("Meow!"))
Io> meep := Cat clone
Io> meep talk
Meow!

Likewise, `Cow` is a clone of `Animal`, but it doesn't have its own `talk` slot. It always uses the talk slot from `Animal`.

Io> Cow := Animal clone
Io> daisy := Cow clone
Io> daisy talk
This animal can't talk.

The equivalent code in JavaScript is:

// In a file called animals.js

'use strict';

function Animal() { }

Animal.prototype.talk = function() {
  console.log("This animal can't talk.");
};

function Cat() {
  Animal.call(this);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.talk = function() {
  console.log("Meow!");
}

function Cow() {
  Animal.call(this);
}

Cow.prototype = Object.create(Animal.prototype);
Cow.prototype.constructor = Cow;

const meep = new Cat();
meep.talk(); // Prints "Meow!"

const daisy = new Cow();
daisy.talk(); // Prints "This animal can't talk."

## Domain-specific Languages

Like [Ruby](https://ankursethi.in/2017/09/28/seven-languages-in-seven-weeks-week-1-ruby/), Io lets you build powerful DSLs. However, Io's DSLs are far more powerful on account of its [homoiconicity](https://en.wikipedia.org/wiki/Homoiconicity), and they can go as far as changing the very syntax of the language. In this regard, Io is similar to Lisp and its descendants.

Here's an example straight from Steve's book. Creating and using a map (a collection of key-value pairs) in Io looks something like this:

Io> map := Map clone
Io> map atPut("foo", "bar")
Io> map atPut("baz", "quux")
Io> map at("foo")
==> bar

Let's add JavaScript-esque object literal syntax to the language, which will enable you type the following into the Io interpreter and get a built-in `Map` object:

{
  "foo": "bar",
  "baz": "quux"
}

First, we add a new assignment operator, represented by the colon (:), to Io's operator table:

Io> OperatorTable addAssignOperator(":", "atPutValue")

Now whenever Io encounters a colon, it will translate it to the message `atPutValue`, with the item on the left of the colon as the first argument, and the item on the right as the second argument. So, the following code:

Io> "foo": "bar"

Is translated to:

Io> atPutValue("\\"foo\\"", "\\"bar\\"")

Notice the extra quotes around "foo" and "bar". This is because Io treats all values passed to the assignment operator as strings.

Next, we define a new slot called `atPutValue` on the built-in `Map`:

Io> Map atPutValue := method(
  self atPut(
    call evalArgAt(0) asMutable removePrefix("\\"") removeSuffix("\\""),
    call evalArgAt(1) asMutable removePrefix("\\"") removeSuffix("\\"")
  )
)

This method removes the extra quotes from around its arguments, and passes them on to the built-in `atPut` method defined on `Map`.

Finally, we define a new slot called `curlyBracket` on the top level `Object`. Io will call the method stored in this slot every time it encounters a pair of curly brackets.

Io> curlyBrackets := method()

Inside this method, we create a new `Map`:

Io> curlyBrackets := method(
  m := Map clone
)

Next, we take each argument passed to `curlyBrackets` and send it to our new `Map` for evaluation. In the end, we return the `Map`:

Io> curlyBrackets := method(
  m := Map clone
  call message arguments foreach (arg,
    m doMessage(arg)
  )
  m
)

Now the following syntax will produce a new `Map`:

Io> { "foo": "bar", "baz": "quux" }

First, Io parses each key-value pair inside the curly braces. Since we've defined ":" to be an assignment operator that is equivalent to the message `atPutValue`, each key-value pair gets parsed into that message.

Next, all items within the curly braces are collected into a `list` and passed to the `curlyBrackets` method on `Object`. In the end, the JavaScript-esque syntax above gets parsed into this method call:

Io> curlyBraces(
  list(
    atPutValue("\\"foo\\"", "\\"bar\\""),
    atPutValue("\\"baz\\"", "\\"quux\\"")
  )
)

Finally, our definition of `curlyBraces` creates and returns a new dictionary for us.

## Closing Thoughts

While the Io website has a tutorial, guide, and language reference,  it's hard to find any additional information about the language on the Web. There seems to be very little activity on the GitHub repository, mailing list, or the subreddit. All the Io-related blog posts I found study were notes written by people working their way through Bruce Tate's book.

For all practical purposes, Io is abandonware.

Regardless of its current status, Io's simplicity, elegance, and extensibility puts it in the same league as Lisp and Smalltalk. Even if you don't end up using the language in a project, learning it will make you a better programmer.

I plan to come back to Io in the future, when I have some more time to tinker with language implementations. For now, it's on to the next language!