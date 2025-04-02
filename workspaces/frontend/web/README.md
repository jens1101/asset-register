# Asset Register Web

## Tech used

- [Solidjs](https://www.solidjs.com/) as the framework
- [URQL](https://commerce.nearform.com/open-source/urql/) as the GQL client
  - [Graphcache](https://commerce.nearform.com/open-source/urql/docs/graphcache/)
    as the caching layer
- [Effect](https://effect.website/) as the standard library

## Icons

This project uses [Bootstrap Icons](https://icons.getbootstrap.com/). All the
icons are available as SVGs.

To ease development we are using a
[Vite SVG plugin](https://github.com/jfgodoy/vite-plugin-solid-svg) that allows
us to import SVGs as Solidjs components. Therefore we can write the following:

```tsx
import ErrorIcon from "bootstrap-icons/icons/exclamation-circle-fill.svg";
import { type Component } from "solid-js";

export const Test: Component = () => (
  <div>
    <ErrorIcon />
    <p>Some text</p>
  <div>
)
```

Each Bootstrap SVG icon has default classes and styles applied to it. However,
these defaults will be lost as soon as you add your own class to it. Therefore
it is highly recommended to always add the `bi` class to any icon with custom
classes. For example:

```tsx
import ErrorIcon from "bootstrap-icons/icons/exclamation-circle-fill.svg";
import { type Component } from "solid-js";

export const Test: Component = () => (
  <div>
    <ErrorIcon class="bi me-1" />
    <p>Some text</p>
  <div>
)
```
