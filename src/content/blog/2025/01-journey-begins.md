---
title: "The Journey Begins: Parsing LoxMocha"
description: "An interesting description"
pubDate: 2025-06-13
tags: [compilers, loxmocha]
---

Today marks the beginning of the LoxMocha compiler project. The first step is to build a robust parser that can understand our language's syntax.

## LoxMocha Language Snippet

Here is an example of the kind of code our parser will need to handle. This will be highlighted using our custom Shiki grammar.

```loxmocha
// A simple function definition in LoxMocha
fun add(a: int, b: int): int {
  return a + b;
}

let result: int = add(5, 10);
print result; // Should print 15
```

## C++ Language Snippet

```cpp
int main()
{
    return 0;
}
```

## RISC-V test

Now we will test a risc-v snippet

```riscv
addi    sp,sp,-16
sd      ra,8(sp)
sd      s0,0(sp)
addi    s0,sp,16
li      a5,0
mv      a0,a5
ld      ra,8(sp)
ld      s0,0(sp)
addi    sp,sp,16
ret
```

## Visualizing the Control Flow

To properly handle constructs like if-else, we need to visualize the Control Flow Graph (CFG). The diagram below is generated at build-time by D2 directly from this Markdown file.

```d2
# Simple If/Else CFG
direction: down

A: "if (x < y)"
B: "x = x + 1"
C: "y = x"
D: "return x"

A -> B: true
A -> C: false
B -> D
C -> D

vars: {
  d2-config: {
    theme-overrides: {
      N7: "transparent"
    }
    dark-theme-overrides: {
      N7: "transparent"
    }
  }
}
```