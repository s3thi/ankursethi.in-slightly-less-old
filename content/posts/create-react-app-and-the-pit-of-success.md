---
title: "create-react-app and the Pit of Success"
date: "2017-05-25T12:46:22+05:30"
slug: "create-react-app-and-the-pit-of-success"
category: "Programming"
description: "create-react-app takes the grunt work out of setting up a React project, but it has a less obvious benefit too: pushing developers into the pit of success."
---

On May 18, the `create-react-app` team [announced](https://facebook.github.io/react/blog/2017/05/18/whats-new-in-create-react-app.html) the release of v1.0 of the project. As always, a bunch of new features made it into the release, notable ones being a new version of Webpack, support for turning your app into a PWA using the `ServiceWorker` API, and support for bundle splitting using dynamic `import()`s.

If you haven't used `create-react-app` before, this is how the project describes itself:

> Create React apps with no build configuration.

And this is how it works:

1.  Install `create-react-app` from NPM.
2.  Run `create-react-app your-project-name` in your terminal
3.  The tool sets up a full-featured build system for you, powered by Babel, Webpack (with a selection of useful plugins), Jest, Flow, ESLint, Autoprefixer, and several other commonly used frontend build tools.
4.  Start hacking!

This takes the boring grunt work out of frontend development, makes React more approachable for new developers, and helps the community standardize around a set of reliable, proven build tools. Those are the obvious benefits of a tool like this.

However, `create-react-app` has a less obvious benefit as well: it pushes developers into the [pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/) by encouraging good programming practices and making it easy to do the right thing.

*   It ships with [ESLint](http://eslint.org/) set up with a [solid set of linting rules](https://www.npmjs.com/package/eslint-config-react-app). Every time you violate good JavaScript practices, it displays a prominent warning on the command line as well as your browser console.
*   It ships with [Jest](https://facebook.github.io/jest/) set up and ready to go, so you have no excuse for not writing tests for your components.
*   It ships with support for [Flow](https://flow.org/), so you have no excuse for not adding type annotations to your codebase.
*   It ships with support for [bundle splitting](https://webpack.js.org/guides/code-splitting/), so you have no excuse for shipping giant 3MB bundles to your users.
*   It supports making your app offline-first using the [`ServiceWorker`](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) API.

While working on a project, doing the right thing often means overcoming inertia. If you're anything like me, you want to spend as much time as you can working on the meat of your application, on the parts that make it unique. Spending half an afternoon setting up Flow, or yet another test runner, or yet another linter feels like extraneous grunt work that doesn't move the project forward in a measurable way.

By shipping a selection of code quality tools configured and set up right out of the box, `create-react-app` takes the inertia out of doing the right thing. And it doesn't stop there! Modern frontend development is an exercise in choosing between libraries and tools that seem to do similar things, to the point where developers often suffer from [analysis paralysis](https://en.wikipedia.org/wiki/Analysis_paralysis). This tool makes many of these choices for you, eliminating that cognitive burden and freeing you to concentrate on what matters most: your business logic.

That said, while `create-react-app` makes it easy to do the right thing, it doesn't make it particularly hard to do the wrong thing. There's nothing stopping developers from bloating their bundle sizes by pulling in tens of third-party modules from NPM, or from serving render-blocking JS/CSS, or from creating jank by attaching expensive event handlers to scroll events.

I'm not sure how these malpractices can be discouraged. Perhaps integration with [WebPageTest](https://webpagetest.org) or [Google's Lighthouse](https://developers.google.com/web/tools/lighthouse/) would help? Or maybe the build script could warn you when your bundle size exceeds a certain limit? Perhaps these problems should be tackled elsewhere in the stack?

Regardless of whether `create-react-app` chooses to tackle these problems or not, the tool as it stands now makes shipping quality React code painless and fun, and has absolutely changed the way I work with React.

If you haven't tried it yet, you can check it out [here](https://github.com/facebookincubator/create-react-app).