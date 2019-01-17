---
title: "E-Commerce Case Study: Building Faster Listing Pages on abof.com (Part 3)"
date: "2018-09-20T08:40:06+05:30"
slug: "e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-3"
category: "Programming"
---

_This case study was first published on the Alaris Prime blog on January 4, 2017. You can [read the original case study here](https://alarisprime.blog/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-3-4e4d32e0e884)._

[Part 1](https://ankursethi.in/2018/09/19/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-1/) of this case study was a general overview of how the [Alaris Prime](https://alarisprime.com/) team rebuilt [abof.com](https://abof.com/) to load almost instantly even on flaky mobile connections, and [part 2](https://ankursethi.in/2018/09/20/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-2/) was an account of how we got to grips with the often confusing React ecosystem. If you haven’t checked out the first two parts yet, you should do so now.

In this final part of our case study, I’ll discuss a few specific issues we ran up against through the course of the project, and how we tackled them.

## Keeping Track of Scroll Position in an Infinite Scrolling Grid

abof’s product listing page is an infinitely scrolling grid of product images that loads 12 items per “page”. When a user visits a listing URL, our CDN responds with a pre-rendered HTML page with an initial set of 12 products already loaded. Another 12 products are loaded asynchronously the moment our JavaScript bundle loads and React takes over the page. From this point on, a new set of products is loaded whenever the user scrolls to the last loaded page.

\[caption id="attachment\_496" align="aligncenter" width="2000"\][![abof.com product listing page](https://ankursethi.in/wp-content/uploads/2018/09/1_6NFXEuVE96eB5Nnb65RAjg.png)](https://ankursethi.in/wp-content/uploads/2018/09/1_6NFXEuVE96eB5Nnb65RAjg.png) Endless.\[/caption\]

A [recent post](https://developers.google.com/web/updates/2016/07/infinite-scroller) on the Google Developers blog talks about the challenges inherent in implementing an efficient infinite scrolling list in the browser. The post is recommended reading, and I won’t repeat the information it already covers in this case study. Instead, I’ll talk about how we use a URL to keep track of the user’s position within our infinite scrolling grid without slowing the browser down.

Two common causes of jank on pages that use infinite scrolling are:

1.  Event listeners on the document’s scroll event.
2.  Repeatedly querying the DOM from those event listeners.

With a little bit of work, we can avoid listening on the scroll event altogether, as well as keep DOM queries to a minimum.

Listing URLs on abof look something like this:

https://abof.com/women/clothing/dresses?page=xxx

That `page=xxx` bit at the end keeps track of the user’s position within the grid, and changes as she scrolls from page to page.

Every 12th product in the grid has a `data-page-end` property attached to its DOM representation that indicates that the product appears at the end of a certain page. For example, the product card at the end of the 4th page (i.e, the 48th product in the grid) is marked up as follows:

<div itemscope="" itemtype="http://schema.org/Product" class="product-card product-card--data-marker" data-page-end="4" data-product-id="205675">
    <!-- product details here -->
</div>

We call these elements _page markers_, and we keep track of them in an array called `activePageMarkers` inside our `ProductGridContainer` component. Whenever a new set of products is loaded, any page markers inside that set are appended to this array.

These page markers are references to actual DOM nodes within the document. Along with these references, we also keep track of their positions on the page, as well as their dimensions. This way, we don’t have to query the DOM for this information repeatedly as the user interacts with the page. We only recalculate it when the user triggers an event that is likely to invalidate our existing data (e.g, resizing the page or rotating the device).

Finally, we use `requestIdleCallback()` to fire a function called `syncPageLocation()` whenever the browser is idle, throttle it so it fires at most once every 500ms, and make sure it doesn’t fire if the user hasn’t scrolled the page for a while.

`syncPageLocation()` uses the browser’s scroll offset and the position data stored in `activePageMarkers` to find the page marker closest to the bottom of the page. It then extracts the value of `data-page-end` from that element, and uses `history.replaceState()` to change the `page=xxx` bit in the URL to reflect the value stored in `data-page-end`.

This machinery allows the user to share the URL of the listing page over IM, email, or social media with the confidence that anybody who follows it will see the same set of products that were on her screen a moment ago. Moreover, it allows users to move back and forward between product detail pages and listing pages without losing her position in the grid.

## Analytics with Google Tag Manager and Redux Middleware

Analytics on abof.com are powered by [Google Tag Manager](https://www.google.com/analytics/tag-manager/) hooked up to a number of third-party analytics providers.

On each page, the analytics team at abof wanted to capture a number of custom events tied to specific user interactions. We wanted to do this in a way that none of our components had to be made aware of analytics or GTM.

We started out by making a list of all the custom events that the analytics team wanted to capture. For example, they wanted to capture a bunch of data about the current page whenever the user changed its sort option from the default value of “Popularity” to one of the other available options (“Just In”, “Discount — High to Low”, “Price — Low to High”, “Price — High to Low”).

Then, we mapped each interaction to one or more of our React components. The components mapped to each user interaction would emit a Redux action containing all the data we needed to capture about that interaction. For example, the `SortDropdown` component would emit an action called `SORT_OPTION_CHANGED` every time the user changed the sort option on a page. This action looked something like this:

{
  name: 'SORT\_OPTION\_CHANGED',
  payload: {
      from: 1,
      to: 4
  }
}

In the `payload` object, the `from` field kept track of the sort option before the user changed it, and the `to` field kept track of the new sort option.

Of course, our components were not aware of _all_ the data required by a analytics event. For example, the `SortDropdown` didn’t know whether the user was logged in, what her IP address was, or even the current page URL. We didn’t want our components to be analytics-aware, so we only had them capture the data that they actually had access to. We filled in the missing bits using a Redux middleware called `gtm`.

The `gtm` middleware looked at each Redux action that we were interested in, created one (or, in some cases, more than one) analytics events for each action, filled in any missing information that the events required, and pushed them into GTM’s `dataLayer` array.

This architecture allowed our components to be oblivious of GTM while still allowing analytics data to be collected at a very granular level.

## Caching Pre-Rendered Pages for Logged-in Users

Once our universal React app renders a product listing page on the server, abof’s CDN caches it for 10 minutes. This not only shaves a few hundred milliseconds off our load time, but also helps keep abof’s server bills down.

This optimization is straightforward to apply to requests that come from customers who are not logged into their abof accounts. Any given listing page will look identical to all of these anonymous users, which means we can serve them whatever the CDN has cached.

However, we can’t blindly serve a cached page from the CDN to a user who is logged into abof. A customer who is logged in sees a few extra bits of information on each listing page:

1.  Her username, with a link to her profile, on the top right corner of the page (on mobile, this appears in the hamburger menu).
2.  A dropdown listing all the items she’s added to her cart.
3.  If she’s added an item to her favorites, the tiny heart icon on the top right of each product image is filled-in.

\[caption id="attachment\_497" align="aligncenter" width="1600"\][![abof.com top navigation (logged in)](https://ankursethi.in/wp-content/uploads/2018/09/1_OPMpugCAEb2JrwRJXqj2zA.png)](https://ankursethi.in/wp-content/uploads/2018/09/1_OPMpugCAEb2JrwRJXqj2zA.png) We display the user’s name and bag contents when she’s logged in.\[/caption\]

Since this information varies from user to user, caching the page is not an option for logged-in users. On the other hand, letting our universal application deal with every request that comes from a logged-in user means it now has to handle a load it was never designed for.

We work around this problem by serving the same cached listing pages from our CDN to every single user — logged in or not — and having JavaScript fill in the missing information after page load.

This is what a typical page load looks like:

1.  User makes a request to a listing page.
2.  The CDN serves up a static HTML page that doesn’t contain any user-specific information (i.e, no cart, no favorites, no username). At this point the user can start interacting with the page.
3.  Our JavaScript bundle loads, and React takes over.
4.  Our root component makes a request to a REST endpoint that returns user information.
5.  If the endpoint returns valid information, our app knows the user is logged in. At this point, it makes requests for cart items, favorites, and whichever other bits of information are required to customize the page for this specific user.
6.  If the endpoint doesn’t return valid information, our app knows the user is not logged in. It doesn’t need to do anything special to handle this case.

This architecture is not perfect. On slower connections, the user sees page elements move around and change as we fetch the extra information needed to assemble the page. However, it lets us eke out that last bit of performance from an already fast webpage.

## Final Words

In this final part of our case study, I talked about three specific problems we faced while rebuilding the listing pages on abof.com:

1.  Keeping track of page URLs as users scroll through abof’s infinite scrolling grid of products.
2.  Using Google Tag Manager and Redux middleware to collect granular analytics without impacting page performance.
3.  How caching works in an application that uses universal rendering.

In case you missed the first two parts, you can read them here: [part 1](https://ankursethi.in/2018/09/19/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-1/), and [part 2](https://ankursethi.in/2018/09/20/e-commerce-case-study-building-faster-listing-pages-on-abof-com-part-2/).