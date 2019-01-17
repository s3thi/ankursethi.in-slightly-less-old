---
title: "Seven Languages in Seven Weeks, Week 1: Ruby"
date: "2017-09-28T09:06:11+05:30"
slug: "seven-languages-in-seven-weeks-week-1-ruby"
category: "Programming"
---

In an attempt to get back into programming language theory and implementation—a hobby I've neglected since I started working full-time—I recently started reading Bruce Tate's _Seven Languages in Seven Weeks_. These are my notes and observations from my first week of study.

In week 1, Bruce introduces Ruby, drawing attention to its dynamic nature, expressive syntax, and metaprogramming capabilities. Together, these properties make it a suitable language for building natural, English-like APIs.

I didn't think I could learn anything from Ruby that years of writing Python and JavaScript hadn't already taught me. However, after three days of studying the language, I was pleasantly surprised to be proven wrong. There's a lot to learn from Ruby about designing languages for humans first and machines second.

## Syntax

Most of my experience with dynamic languages has been with Python and JavaScript, both of which are conservative with syntax sugar. This is a design decision I have always appreciated but, after acquainting myself with some Ruby libraries, I feel there's an argument to be made in favor of liberally adding syntax sugar to make expressing common programming idioms more convenient.

The downside of all the sugar is that Ruby's syntax comes with many surprises. For example, I can define a method that accepts a block as its final argument like so:

def myFun n, &block
  # do something nice
end

However, I can't define a method that accepts two blocks as arguments using the same syntax, since the ampersand is a special bit of syntax reserved for defining methods that accept a block as their final argument. So, this is an error:

def myFun &block1, &block2
  # do something nice
end

There are a number of ways of calling a method, which can seem overwhelming at first. For example, consider the following method:

def myFunction param, &block
  # do something nice
end

Both these ways of calling `myFunction` are correct:

myFunction 1, { |n| puts n }
myFunction(1) { |n| puts n }

But the following is a syntax error:

myFunction(1, { |n| puts n })

If, however, we change the definition of `myFunction` so that it does not accept a block as its second argument:

def myFunction param1, param2
  # do something nice
end

Then, it can be called in the following ways:

myFunction 1, 2 
myFunction(1, 2)

But the following is a syntax error:

myFunction(1) 2

[Things can get quite murky](https://www.skorks.com/2013/04/ruby-ampersand-parameter-demystified/) when we start talking about defining and calling methods, especially when we throw the ampersand operator into the mix. You win some you lose some.

## REPL

For certain classes of programs, I like to use a REPL for interactive development. Ruby comes with `irb`, which is passable but not great. It helps while debugging and exploring language concepts, but it's not powerful enough to let you interactively build and test programs.

I'd like to shout out [ipython](https://ipython.org/) here, which is the best non-Lisp REPL I've used in my career.

## Introspection

Both Python and JavaScript have great introspection capabilities, but they never feel as natural and as they do in Ruby.

For example, I wanted to check if there was a way to convert a Ruby hash into a bunch of key-value pairs. I knew that, in Ruby, the names of all methods that convert one data type into another conventionally have the prefix "to\_". Armed with this knowledge, I only had to write this bit of code to list all methods on a hash that converted it into a different object:

{ :foo => :bar }.methods.select { |m| m.to\_s.start\_with? "to\_" }

Just for comparison, the equivalent in JavaScript would be:

const isMethod = obj => typeof obj === 'function';

const listAllMethods = obj => {
  const ownMethods = Object.getOwnPropertyNames(obj).filter(p => isMethod(obj\[p\]));
  const proto = Object.getPrototypeOf(obj);

  if (proto) {
    return \[\].concat(ownMethods, listAllMethods(proto));
  } else {
    return ownMethods;
  }
};

const s = {
  foo: 'bar'
};

listAllMethods(s).filter(m => m.startsWith('to'));

## Metaprogramming

Metaprogramming is Ruby's strong suit, and there isn't much I can say about it that hasn't already been said. Rails' [ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html) is perhaps the best example of how metaprogramming can help build clean, natural-looking APIs.

My opinion of metaprogramming has always been that it's great for people building libraries and frameworks, but not so great for people building applications. Too much magic can make code unpredictable and hard to debug.

However, I haven't spent enough time with Ruby to know for sure how the liberal use of metaprogramming affects code clarity and maintainability in a large codebase. Most programming languages make it circuitous to do any kind of metaprogramming, and the APIs are usually an afterthought. In Ruby, the metaprogramming APIs are so well-designed and natural that—used in moderation—metaprogramming might actually enhance code clarity without any negative affect on maintainability.

As an example of the power of metaprogramming, Bruce presents a class that returns the Arabic equivalent of a Roman numeral whenever it's accessed as a static property. I.e,

irb(main):001:0> Roman.X
=> 10
irb(main):002:0> Roman.XC
=> 90
irb(main):003:0> Roman.XII
=> 12

In Ruby, the Roman class looks something like this:

class Roman
  def self.method\_missing name, \*args
    roman = name.to\_s
    roman.gsub!("IV", "IIII")
    roman.gsub!("IX", "VIIII")
    roman.gsub!("XL", "XXXX")
    roman.gsub!("XC", "LXXXX")

    (roman.count("I") +  
     roman.count("V") \* 5 +
     roman.count("X") \* 10 + 
     roman.count("L") \* 50 +
     roman.count("C") \* 100)
  end
end

I attempted to translate this into JavaScript using [ES6 Proxies](https://ponyfoo.com/articles/es6-proxies-in-depth):

'use strict';

String.prototype.count = function(rx) {
    return (this.match(new RegExp(rx, 'g')) || \[\]).length;
};

const Roman = new Proxy({}, {
    get: (\_, property) => {
        let roman = property.slice();
        roman = roman.replace(/IV/g, 'IIII');
        roman = roman.replace(/IX/g, 'VIIII');
        roman = roman.replace(/XL/g, 'XXXX');
        roman = roman.replace(/XC/g, 'LXXXX');

        return (
            roman.count('I') +
            roman.count('V') \* 5 +
            roman.count('X') \* 10 +
            roman.count('L') \* 50 +
            roman.count('C') \* 100
        );
    }
});

Not too bad, huh?