---
title: "Work"
description: "A list of projects I've been hired to work on."
date: "2017-08-16T08:04:01Z"
slug: "work"
---

This page lists a selection of projects I've been hired to work on, in reverse chronological order.

## Quintype

[![TheQuint.com, powered by Quintype](https://ankursethi.in/wp-content/uploads/2018/07/Screen-Shot-2018-07-02-at-4.57.27-PM-1024x728.png)](https://ankursethi.in/wp-content/uploads/2018/07/Screen-Shot-2018-07-02-at-4.57.27-PM.png) [Quintype](https://quintype.com/) is a content management system tailored to fast-moving online news publications. It powers several large news outlets in India, including [The Quint](https://www.thequint.com/) by Bloomberg, [National Herald](https://www.nationalheraldindia.com/), and [Fortune India](https://www.fortuneindia.com/). The Quintype team also builds [Metype](https://www.metype.com/), a set of embeddable widgets that allow users to comment on and interact with news stories in real-time on any website.

I worked with Quintype on a focused two-week engagement where I helped them diagnose and fix performance issues on both the primary Quintype platform as well as the Metype widgets.

My work resulted in a significant jump in Quintype's [Lighthouse](https://developers.google.com/web/tools/lighthouse/) score, and a reduction of over 70% in Metype's initial payload size. I also discovered and reported some insidious performance bugs that were slowing down common interactions in the Metype widgets.

During my time at Quintype, I helped two engineers learn how to profile and optimize front-end applications using the Chrome Developer Tools. I also ran a workshop demonstrating how some common front-end performance killers show up visually in Chrome's profiling data.

## Insider.in

[![Insider.in checkout flow](https://ankursethi.in/wp-content/uploads/2018/07/Screen-Shot-2018-07-02-at-5.09.21-PM-1024x728.png)](https://ankursethi.in/wp-content/uploads/2018/07/Screen-Shot-2018-07-02-at-5.09.21-PM.png) This was my second long-term engagement with the [Insider](https://insider.in) team. During this engagement, I focused on improving reliability and code quality on their Web front-end.

*   I spent the biggest chunk of my time porting the Insider checkout flow from a legacy Backbone.js stack to a modern React stack.
*   Instead of using plain JavaScript for re-writing the checkout flow, the team opted to use TypeScript. This enabled me to build new features much faster than I could have with plain old JavaScript.
*   Before starting work on my rewrite, I wrote comprehensive end-to-end tests for the legacy checkout flow using [Cypress](https://cypress.io/). This ensured that the new version of the checkout flow behaved identically to the legacy version.
*   I ensured parts of the new checkout flow were well-tested by setting up tests with [Jest](https://jestjs.io/).

## StoryWeaver by Pratham Books

[![A story on Pratham Books StoryWeaver](https://ankursethi.in/wp-content/uploads/2018/07/Screen-Shot-2018-07-02-at-5.04.31-PM-1024x728.png)](https://ankursethi.in/wp-content/uploads/2018/07/Screen-Shot-2018-07-02-at-5.04.31-PM.png) [StoryWeaver](https://storyweaver.org.in/) lets users read and create illustrated books in the Web browser in over 100 languages. It is developed and maintained by [Pratham Books](https://prathambooks.org), a non-profit publisher of children's books in India.

The primary audience for StoryWeaver is educators working at government schools and non-profits, often in remote areas that have limited network connectivity. To help these educators reach as many children as possible, me and my team built StoryWeaver as a [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) (PWA) that works completely offline, and lets users cache up to 12 books in the browser's local storage.

The front-end for the website is built with React, and the REST API is built with Rails. I collaborated with [Sidhartha Chatterjee](https://twitter.com/chatsidhartha) and [Saneef Ansari](https://saneef.com/) on the front-end. A team at [Mirafra Technologies](http://mirafra.com/) handled the Rails backend.

## Adya

[![Adya demo](https://ankursethi.in/wp-content/uploads/2017/08/Screenshot-2017-08-17-12.33.47-1024x772.png)](https://ankursethi.in/wp-content/uploads/2017/08/Screenshot-2017-08-17-12.33.47.png) [Adya](https://adya.io) is a SaaS security service that helps enterprises detect where their sensitive data is stored, and gives them tools to protect it from threats such as ransomware and insider theft.

In a span of eight weeks, I helped Adya build an MVP that allowed their users to connect multiple sources of data to their account, visualize file permissions across the different data sources, and view access logs for both files and users.

[Saneef Ansari](https://saneef.com/) handled the UX and visual design of the product, while I worked on the engineering challenges inherent in visualizing a large amount of data in the browser. The MVP was built with React and Redux, and it could handle several thousand users and files without slowing down.

## abof.com

[![abof.com](https://ankursethi.in/wp-content/uploads/2017/08/Screenshot-2017-08-08-13.11.36-1024x933.png)](https://ankursethi.in/wp-content/uploads/2017/08/Screenshot-2017-08-08-13.11.36.png) [abof](http://abof.com) is an online fashion retail brand owned by the Aditya Birla Group. I was part of the three people team of consultants commissioned to rebuild the abof website from the ground up using modern web techniques.

We built the new version of the website as a universal React application. At the time of release, it loaded in less than 7 seconds on slow 3G connections, almost instantly on wired connections, and performed well even on low-end Android devices. This performance boost reduced abof's bounce rates by more than 60%.

I've written extensively about the project on the Alaris Prime blog: [part 1](https://alarisprime.blog/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-1-cb99231a1e8a), [part 2](https://alarisprime.blog/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-2-9aa0ac734c08), and [part 3](https://alarisprime.blog/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-3-4e4d32e0e884). I've also [spoken about it](https://www.youtube.com/watch?v=X8uMg-VwJS8) at JSFoo 2016.

The team that rebuilt abof consisted of me, [Ciju Cherian](http://ciju.in) of [ActiveSphere](http://www.activesphere.com/), and [Saneef Ansari](https://saneef.com) of [Alaris Prime](https://alarisprime.com).

## Insider.in

[![Insider.in homepage](https://ankursethi.in/wp-content/uploads/2017/08/Screenshot-2017-08-08-13.11.54-1024x933.png)](https://ankursethi.in/wp-content/uploads/2017/08/Screenshot-2017-08-08-13.11.54.png) [Insider.in](https://insider.in) is a curated ticketing platform run by Only Much Louder, an artist management company that owns several entertainment properties in India.

I was hired to augment the small team of developers already working at the company in Bombay. I worked on all parts of the platform, including:

*   The suite of microservices that powered Insider's REST APIs, built with Node, MongoDB, and Redis.
*   An administration console for vendors, venue managers, and OML employees, built with AngularJS.
*   The consumer facing website, built with Backbone.

Additionally, I introduced the team working at OML to JavaScript best practices and Git workflows suited to a large, fast-moving team.

## TestMyFont.com

[![TestMyFont.com](https://ankursethi.in/wp-content/uploads/2017/08/Screenshot-2017-08-08-13.13.16-1024x724.png)](https://ankursethi.in/wp-content/uploads/2017/08/Screenshot-2017-08-08-13.13.16.png) [TestMyFont.com](http://testmyfont.com) is an open source browser based tool to visually compare fonts, built with AngularJS. [Source code](https://github.com/typefacedesign/document-driven-typedesign/tree/master).

Snorkel
-------

Snorkel was a product that allowed users to write Excel formulas using Python, and gave them access to powerful libraries such as [NumPy](http://www.numpy.org/) and [SciPy](https://www.scipy.org/). The Python code was run on a cloud server, which allowed for more complex, CPU-intensive computations than a local copy of Excel can handle.

I worked on all parts of the product, which included:

*   A web frontend built with AngularJS that allowed users to create new formulas using CodeMirror. Every time a formula was saved, it was run through a custom linter that warned users when they were doing something that might result in an error.
*   An Excel plugin that allowed users to import and call Python functions using a REST API. This was originally written using Visual Basic, and later ported to C# and [Excel-DNA](https://excel-dna.net/).
*   A REST API that both the web frontend and Excel plugin consumed, built with Python and Flask.
*   A sandbox for securely running arbitrary Python code. Security was achieved using a mix of techniques that included: heuristics to detect potentially harmful code, a monitor process to kill misbehaving subprocesses, Linux permissions and ulimits, and AppArmor. The sandbox was built using Python and communicated with the REST API using [ZeroMQ](http://zeromq.org/).

index_server
------------

[![Prototype index_server UI](https://ankursethi.in/wp-content/uploads/2017/08/3774356481_a8b7b8c35c_o-1024x768.png)](https://ankursethi.in/wp-content/uploads/2017/08/3774356481_a8b7b8c35c_o.png) [index_server](https://github.com/s3thi/index_server) is a full-text file indexing daemon for Haiku OS, similar to the daemon that powers Spotlight on Mac OS X. It's written in C++ and uses [CLucene](http://clucene.sourceforge.net/) for creating and querying the file index.

I built index_server as a part of Haiku Code Drive 2009. After I stopped working on it, it was massively refactored and incorporated into the Haiku source tree.