---
title: "Migrating from Jekyll to Medium"
date: "2016-12-12T14:29:01+05:30"
slug: "migrating-from-jekyll-to-medium"
category: "Programming"
description: "How I migrated my self-hosted Jekyll blog to Medium.com without breaking my existing URLs or losing my search rankings."
---

I recently migrated my self-hosted Jekyll blog to Medium. I have no specific reason for choosing Medium, except that it’s in vogue in the communities I follow. I don’t have strong opinions about blogging platforms.

What follows is a quick account of how I made the transition.

## Step 0: Set Up a Medium Publication

This step is self-explanatory, but I’m explicitly listing it because it’s necessary to have a Medium publication if you want to use a custom domain for your blog.

I set up a new custom domain ([blog.ankursethi.in](https://blog.ankursethi.in)) for my Medium publication. My old blog ([ankursethi.in](http://ankursethi.in)) currently redirects to Medium, but in the future I plan on using it to showcase my work as a front-end developer.

## Step 1: Migrate Your Posts

Currently, Medium only supports importing data from WordPress, but you can use [jekyll2medium](https://github.com/zacs/jekyll2medium) to get Jekyll to spit out a WordPress export file.

I lost quite a bit of formatting information during the export process, mostly in code blocks, but I only had a few posts with significant amounts of code so fixing them manually wasn’t a big deal.

## Step 2: Set Up Redirects

[Cool URIs don’t change](https://www.w3.org/Provider/Style/URI.html). It’s frustrating to bookmark a page and, months later, have a 404 shoved in your face when you try to access it again.

Having my Medium blog on a different sub-domain from my old blog means it’s easy to set up redirects for all my old content. A tiny DigitalOcean droplet running Nginx listens to requests on [ankursethi.in](http://ankursethi.in) and responds with a 301 to requests that try to access my old content.

My rewrite rules look something like this:

rewrite ^/?$ https://blog.ankursethi.in last;
rewrite ^/2014/01/book-review-the-essence-of-camphor-by-naiyer-masud/?$ https://blog.ankursethi.in/book-review-the-essence-of-camphor-by-naiyer-masud-230346b579e9 last;
rewrite ^/2014/01/my-reading-list-for-2014/?$ https://blog.ankursethi.in/my-reading-list-for-2014-604b10d1a74a last;
rewrite ^/2014/01/2013-year-in-review/?$ https://blog.ankursethi.in/2013-year-in-review-893e995816ca last;
rewrite ^/2013/07/loading-spinners-with-angularjs-and-spin-js/?$ https://blog.ankursethi.in/loading-spinners-with-angularjs-and-spin-js-dc1e4a57df8a last;
rewrite ^/2013/07/simulating-a-slow-internet-connection/?$ https://blog.ankursethi.in/simulating-a-slow-internet-connection-f6c883b4e0a6 last;
rewrite ^/2013/05/an-introduction-to-cmake/?$ https://blog.ankursethi.in/an-introduction-to-cmake-43b4f08ac453 last;
rewrite ^/2013/04/all-about-iteration/?$ https://blog.ankursethi.in/all-about-iteration-40aed6712632 last;
rewrite ^/2013/04/tastypie-and-timezones/?$ https://blog.ankursethi.in/tastypie-and-timezones-a682ac883302 last;
rewrite ^/2013/03/travel-light/?$ https://blog.ankursethi.in/travel-light-888b8e22a528 last;
rewrite ^/2013/03/wordpress-under-siege/?$ https://blog.ankursethi.in/wordpress-under-siege-f10952732268 last;
rewrite ^/2013/03/okay-wordpress-you-win-this-round/?$ https://blog.ankursethi.in/okay-wordpress-you-win-this-round-434f7c4488ff last;
rewrite ^/2012/12/2012-year-in-review/?$ https://blog.ankursethi.in/2012-year-in-review-24a92b0f9550 last;
rewrite ^/2012/11/mobile-tweaks-and-chrome-extension/?$ https://blog.ankursethi.in/mobile-tweaks-and-chrome-extension-85c5d4c2af29 last;
rewrite ^/2012/11/bookmarks/?$ https://blog.ankursethi.in/bookmarks-ed70dacbbcf last;
rewrite ^/2012/11/scripting-tmux/?$ https://blog.ankursethi.in/scripting-tmux-bf4e0e9cea81 last;
rewrite ^/2012/08/a-django-admin-wishlist/?$ https://blog.ankursethi.in/a-django-admin-wishlist-9dac472e18f6 last;
rewrite ^/2012/07/cache-all-the-things/?$ https://blog.ankursethi.in/cache-all-the-things-5c7589e81afe last;
rewrite ^/2012/07/a-whole-new-can-of-beans/?$ https://blog.ankursethi.in/a-whole-new-can-of-beans-e76ddab0ebeb last;

And that’s that. All my content is now safely on Medium, I don’t lose my search rankings, and all my old URLs still work!