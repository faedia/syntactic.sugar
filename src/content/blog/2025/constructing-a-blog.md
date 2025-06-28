---
title: Constructing a blog for the modern programming language and compiler enthusiast
description: Setting up a website is a new experience for me. Read along as I share the trials and joys I encountered setting up this blog with Astro, Tailwind CSS, Shiki, and, most importantly, the diagramming tool D2.
pubDate: 2025-06-28T15:30:44+00:00
tags: ["web development", "javascript", "personal"]
---

It's a new (mid) year, so it's a new me!
With the summer solstice now behind us, I have decided to focus some of my free time on a new project.
To build a compiler.
I have been enamoured with compilers and programming languages for as long as I knew you could program computers.
So I thought today was the day I'd finally pull myself up by my bootstraps and make a programming language.
And as everyone does when they start a new project, they want to talk about it.
However, I also think it is helpful to write and reflect on what you've learnt throughout a project.

Additionally, writing is a good way to stay engaged with a project.
As you want to write about it, so you do some more of it.
Then, because you have done some more of it, you write about it!

So, let's lay some groundwork.
What is the project I am going to do?
So, while I have dreams of building the next big programming language, it is best to be realistic.
I've decided to start small, build on existing work, and extend it to achieve the project goals I want to accomplish.
So, what are my goals?
I want a small programming language with static typing, compiled to a real instruction set architecture so I can run the programs.

With that decided, I had to think about how I would write about this project.
I'd already decided on a blog, as that would provide me with a public space to discuss the trials and joys of the project.
But the question was, how am I going to blog?
Having not done any web development, a perfect way to start would be to make one myself!

But with that came thinking about the requirements a blog I would want to make would have?
I have compiled a list of what I consider the essentials, and I'll then provide details about how I fulfilled those requirements and with which technologies.

- The ability to write my posts in Markdown
- In a simple, easy-to-learn web framework.
- Syntax highlighted code snippets.
- Nice and easy-to-understand diagrams for all those trees and directed graphs.

## Writing in Markdown

Using Markdown really was a must for me.
I won't go into the details of using Markdown here, as I assume you are already familiar with it.
If you are not, you should definitely go and read about it and use it for your writing or documentation.
You can find some useful guides in the [Markdown Guide](https://www.markdownguide.org/) and the [GitHub writing guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github).

But it truly was a must.
The ease of use.
Universal support among text editors and various rendering applications make it so easy to use.
Not using Markdown would have felt like hamstringing myself.
I use it at work for all my documentation, and I would like to use it here as well.
So I am!
And that's enough of Markdown; there's not much to say, really.
So, let's move on to something more interesting.

## The Web Tech Stack

Picking a web development technology stack in the modern day is a daunting task.
There are countless to choose from, and they have wildly varying feature sets, such as server-side rendering, client-side rendering, a mix of both, something called [hydration](https://en.wikipedia.org/wiki/Hydration_(web_development)), and static site generation.
And that was just rendering!

My goal is to have a simple system where I write content in Markdown files, which I manage through a `git` repository.
The easiest way for me to do this was through the use of a [static site generator (SSG)](https://www.cloudflare.com/learning/performance/static-site-generator/) that, at build time, compiles my Markdown files to `HTML`, generates all the pages, collects all the styling and scripts together and bundles it ready to be hosted.
This means that minimal work is required for me to manage how content is delivered to the reader by the server, as the reader receives a static `HTML` file with all the content already included.

### Static Site Generators

There are numerous static site generators available to choose from.
All of them mostly do the same thing; they bundle an `HTML` template engine, a Markdown compiler, and a plugin system for extensibility.
They use Markdown and an `HTML` template to generate complete `HTML` files from the input Markdown file; these templates are intuitive and can be easily composed to create nice and consistent-looking sites.

There are some specific features I need for the articles I want to write.
I want syntax highlighting for custom grammars so that I can syntax highlight my new programming language in my posts as I write about it.
The second is that I need support for a diagramming tool, specifically one that generates its diagrams at build time, thereby reducing the impact on the client's browser and on external dependencies after site generation.

I contemplated a few different static site generators before I settled on my final choice:

- [Hugo](https://gohugo.io/)
- [Jekyll](https://jekyllrb.com/)
- [Astro](https://astro.build/)

Hugo is an extremely popular static site generator, and it is very easy to set up and use, with utility command-line tools to add new content and many prebuilt themes to get up and running extremely quickly.
However, Hugo does not have all the features I need to build my blog.
One of the most important for me is that it does not support syntax highlighting of custom grammars.
It does not have support for build-time diagramming; they use Mermaid, but it is only dynamically loaded by the client.
This introduces a point of failure for me, where if Mermaid changes or is unavailable, my diagrams will not be viewable.
Whereas if the diagrams can be built before the site is deployed, then I do not have to worry about a third-party dependency changing their interface on me or being unavailable at any particular time.
This rules Hugo out for me entirely; even though it does seem easy to use and has good theming support, the fact it does not support these basic features is disappointing and makes it unusable for my use case.

This leaves me with Jekyll and Astro, which have essentially the same feature set but differ slightly in their template engines and plugin ecosystems.
In the past, I would have probably gone for Jekyll due to its native support with GitHub Pages.
However, now you can deploy to GitHub Pages using GitHub Actions, so there are no limitations from my desire to host using GitHub Pages.
This basically leaves me with an open choice; Jekyll has been around for a while and has significant support.
Astro is newer, has a more modern syntax, and resides within the `javascript` ecosystem.
I went with Astro as it allows me to blend my runtime `javascript` and my build `javascript`, keeping me in the same environment for my entire development process.
It also has plugins for the syntax highlighter and the diagramming tools I wish to use.
According to the documentation, it also supports frameworks like React, allowing me to add more interactivity to the site with ease in the future.

### CSS Frameworks

I am by no means a frontend engineer, so the world of styling and `CSS` appears like a wild, unknown frontier to me.
That being the case, I sought advice from some of the people around me who had recently done `CSS` work.
Their recommendations came in the form of [tailwindcss](https://tailwindcss.com/).
I was initially surprised by how Tailwind works.
The last time I used `CSS`, doing inline styling was a big no-no.
But I was pleasantly surprised.
It is very easy to use, expressive, and incredibly composable; all the things I like in a programming language!

I, as a complete novice in this field, can wholeheartedly recommend Tailwind to you all!
I found it very easy to use personally.
I've made something not too bad; feel free to disagree, but I like the styling on the site.

## Syntax Highlighting

Syntax highlighting is very important to me; it helps people to process and understand the code they are reading.
If I want to discuss constructing compilers and various algorithms, I want to make it as easy as possible for any reader to understand the code I'm talking about.
With that, since I want to create a new language, I want the code snippets I discuss in that language to be easy to understand.
Therefore, I needed a syntax highlighter that could easily support a custom language grammar.
There were main options, [Prism](https://prismjs.com/) or [Shiki](https://shiki.matsu.io/).
However, Shiki appears to be very modern and well-supported.
It also required minimal setup; getting it to look the way I wanted was easy, as I could specify the Visual Studio Code theme I wanted to use.
With Prism, this would have required more work; I would need a stylesheet to use for Prism.
While there are plenty available, the ones I would have wanted were not bundled in.

Take the following `C++` snippet, which uses the `catppuccin-frappe` theme.
It looks nice and was very easy to get up and running as Astro supports Shiki out of the box.

```cpp
#include <iostream>

unsigned int fib(unsigned int n)
{
    unsigned int a = 0;
    unsigned int b = 1;
    while (n > 0)
    {
        unsigned int tmp = a + b;
        a = b;
        b = tmp;
        --n; 
    }

    return a;
}

int main()
{
    std::cout << "Fib(10) = " << fib(10) << '\n';
    return 0;
}
```

Both are easy to extend to add new languages, but Shiki is easier, as it uses the [TextMate grammar](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide), which is the format that Visual Studio Code uses.
This means there are plenty of available resources to help me create my own grammar.
For any languages that aren't supported by Shiki already, I should be able to get the TextMate grammar that Visual Studio Code (or an extension has) and use that to gain support.
With all of that, I went with Shiki, as it was easy to set up, had a wide range of language support, and easy extensibility.

## Diagramming Tools

Diagrams are crucial when discussing compilers and programming languages.
Being able to visually show an Abstract Syntax Tree (AST) or Control Flow Graph (CFG) is incredibly useful.
Trying to describe a specific AST or CFG with just text or text-based diagrams is incredibly difficult.

I have used several diagramming tools while working on various projects.
Ranging from mostly academic tools like [uDrawGraph](https://www.informatik.uni-bremen.de/uDrawGraph/en/home.html).
To historic yet state-of-the-art tools like `dot` from [Graphviz](https://graphviz.org/).
The industry-standard UML diagramming, [plantuml](https://plantuml.com/).
So I've decided to try something new.

I'm going to be using a new diagramming tool called [D2](https://d2lang.com/).
It appears to be similar to `dot`, which is precisely what I want, but with much more modern styling.
I've always found the diagrams' `dot` outputs to look somewhat dated, as if I were reading academic papers from the 90s.
However, `D2` appears to make my diagrams look much more modern!
Either way, it works similarly to `dot`.
You run the command-line tool `d2` and provide it with your d2 file.
The tool then outputs either an `SVG` or a `PNG`.
The advantage here is that I can generate my `SVG` files when the site is built and then embed them in my `HTML` as the pages are generated.

Below is a `D2` diagram of a CFG for our Fibonacci example from earlier.

```d2 title="Control Flow Graph of an iterative Fibonacci function"

direction: down

vars: {
    d2-config: {
        theme-overrides: {
            N7: transparent
        }
    }
}

a_decl: "a = 0"
b_decl: "b = 1"

loop_cond: "n > 0"

loop: "" {
  tmp_decl: "temp = a + b"
  a_assign: "a = b"
  b_assign: "b = tmp"
  n_dec: "--n"
  
  style.fill: transparent
  style.stroke-width: 0
}

result: "" {
  return: "return a" {
    style.fill: "#f9e2af"
  }
  
  style.fill: transparent
  style.stroke-width: 0
}

a_decl -> b_decl
b_decl -> loop_cond

loop_cond -> loop.tmp_decl: true
loop.tmp_decl -> loop.a_assign
loop.a_assign -> loop.b_assign
loop.b_assign -> loop.n_dec
loop.n_dec -> loop_cond

loop_cond -> result.return: false
```

This is still a relatively new diagramming tool, so I'm willing to give it a shot!
We'll see how it goes, but if I find I have an issue with it the more I use it, then I may have to switch.
But since diagramming tools all have similar syntaxes, I'm not too worried about having to migrate diagrams in the future.

## Conclusion

I'm now at the end of the initial blog post.
The site is made, and I've settled on a design (for now).
I've decided to do all of the styling myself, so I didn't get a template for Astro.
This was actually a very fun experience.
I'm not a frontend developer, so it was interesting to have to learn all of this from scratch.
However, I was pleasantly surprised by how easy it was to set up and get it working.
And I personally think it looks nice.
Getting everything set up has made me excited to get into this project, write code, and write blog posts!
So, to confirm, the stack I have gone with is:

- Astro: As the static site generator.
- Tailwindcss: Composable CSS framework.
- Shiki: The Syntax Highlighter.
- D2: New exciting diagramming tool.

Overall, I'm very pleased with the site, how easy it is to add new content and the work I've put into making it look nice!
I am now looking forward to continuing on and getting into the bulk of the project, and I am very excited about writing about it very soon.