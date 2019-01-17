---
title: "E-Commerce Case Study: Building Faster Listing Pages on abof.com (Part 2)"
date: "2018-09-20T08:21:33+05:30"
slug: "e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-2"
category: "Programming"
---

_This case study was first published on the Alaris Prime blog on October 6, 2016. You can [read the original case study here](https://alarisprime.blog/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-2-9aa0ac734c08)._

If you haven’t read the first part of this case study, I suggest you [go check it out](https://alarisprime.blog/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-1-cb99231a1e8a) before diving into the second part. It’s a quick read that explains in detail our motivations for the technology choices we made while building the new [abof.com](http://abof.com/).

Done? Great! In this second part, I’ll talk about my and my team’s impressions of the React ecosystem, our opinions on build tooling, and our approach to performance testing.

## Learning React

When we started working with abof, all of us were primarily Angular 1.x developers. We had used the framework to build several complex applications, which meant we had the ability to ship quality Angular code rapidly.

However, with a stable release of Angular 2 right around the corner, starting a new Angular 1.x project would have been irresponsible on our part. My experience with building a small application using Angular 2 a few weeks prior to the start of the abof project had left me with mixed feelings. I personally enjoyed working with the framework and found it a welcome improvement over Angular 1.x, but I had to admit that the number of concepts a newcomer to the framework must wrap her head around just to build a functioning TODO list application with Angular 2 was unjustified.

Besides, [as I mentioned in part 1](https://blog.alarisprime.com/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-1-cb99231a1e8a#.v7xff), there were other issues with Angular 2 that made it a no-go for us (mainly the large payload size, and the lack of support for universal rendering).

With some apprehensiveness, we began the process of learning React — and what looked to us like a glut of supporting libraries that were apparently _absolutely required_ to produce a working application. There were a number of tools and libraries that we either didn’t understand the purpose of, or didn’t know if we needed. [Redux](http://redux.js.org/), [Radium](https://formidable.com/open-source/radium/), [Immutable.js](https://facebook.github.io/immutable-js/), [MobX](https://mobxjs.github.io/mobx/), [Relay](https://facebook.github.io/relay/), [Falcor](https://netflix.github.io/falcor/), [Flow](https://flowtype.org/), [Babel](https://babeljs.io/), [Webpack](https://webpack.github.io/), just to name a few.

Despite this fractured and confusing landscape, learning React turned out to be easier (and way more fun!) than we anticipated.

We found that there is only one thing that is _absolutely required_ to build React applications: React. Learning it takes a few hours, and — besides the official docs — there are plenty of tutorials on the web that can accelerate and supplement the learning process. I’m partial to the tutorials on [egghead.io](https://egghead.io).

After we wrapped our heads around React, we built a small prototype that pulled product data from the abof.com REST API and rendered it as a grid. No fancy JavaScript preprocessors, no supporting libraries, just plain old ES5 and React. Over the course of a week we added a few more features to this prototype (routing, pagination, infinite scrolling), but it was mostly an experiment that never made it to production.

Having built this throwaway prototype, we were in a position to take a deeper look at the React ecosystem and understand what problems each of the popular libraries was designed to solve. For example, after having spent a day scratching our heads over how to elegantly share state between components, we had a better appreciation of the problems Redux solves.

This exercise let us choose a subset of the libraries that were relevant to us from the plethora of libraries available to us. In the end, the structure of our application was very similar to what a tool like create-react-app would produce, and our list of dependencies was no different from what any standard React application written in 2016 would use. However, by taking a [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) approach to building abof, we were able to understand what purpose each of our libraries served at a deeper level. Most importantly, it kept us from getting overwhelmed with new tools and concepts right at the beginning of the project.

## Build Tooling

We wrote most of our build system from scratch, adding tools and features as we went. This often caused us pain — for example, adding support for isomorphic rendering after most of the application was already written and functional cost us a few days of development time. We had to rewrite parts of our codebase to make sure they ran correctly on Node.

Our build system did nothing out of the ordinary, but knowing it inside-out gave us the confidence to jump into our Webpack and Babel configurations and tweak things to our heart’s desire. It also helped us automate our release process to a point where building and deploying a new version of the website was a single command.

Would I recommend that every team assemble their build tooling in this piecemeal manner? No. As much as we learned from this exercise, starting with one of the hundreds of available React boilerplates on GitHub and carefully studying its source code would have been a more productive exercise and given us an equal amount of confidence in our tooling.

If you’re starting a new React project now, don’t even think twice about using create-react-app.

## Measuring and Optimizing Page Load Performance

Our primary source of insight while measuring page load performance was using the website on real devices connected to real mobile networks. A number of tools exist to simulate different network conditions and spit out numbers, but we found that seeing what our users see on flaky connections and devices was valuable while optimizing our page load times.

[WebPageTest](http://webpagetest.org/) and [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) are great for giving you hard numbers to target while building or optimizing your application, and for pinpointing exact areas of your application that need work. However, only by testing on real devices will you know which optimizations directly enhance your users’ experience and which ones shave a few seconds off your loading time without affecting perceived performance in any way.

Our second source of performance metrics was the Chrome developer tools. Even while developing locally, we tested the website with a throttled connection. This pushed us to keep the number of API requests and payload sizes small. We set ourselves a page size quota, which was 150kb of data minified and gzipped. That sounds generous, but we got away with it because we were serving a pre-rendered page to the user.

Our final source of performance metrics was WebPageTest. We ran both WebPageTest and PageSpeed Insights after deploying to our staging server to surface issues we might have overlooked. There are far too many things that can go wrong while building a web application, and automated testing tools serve as — for lack of a better term — interactive checklists that will help you ensure you comply with all the best practices. If it hadn’t been for WebPageTest, we would have never realized that the cache headers on our product images were all wrong, or that we could compress them more aggressively.

## Measuring Application Performance

Just like page load performance, our primary source of insight while measuring application performance was using the application on a real device. We had access to a number of low-end mobile phones running Android and Windows Phone, and we would periodically (usually after a staging deploy) test the website on these to make sure abof performed acceptably.

## Final Words

This part of the case study was a mostly subjective look at the React landscape. In the last and final part, I’ll talk about some specific issues we ran into while building abof and how we tackled them.

Updates

Read [part 1](https://ankursethi.in/2018/09/19/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-1/) and [part 3](https://ankursethi.in/2018/09/20/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-3/) of this article series.