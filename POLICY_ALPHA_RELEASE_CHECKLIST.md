# Policy Alpha Release Checklist

Before publishing or packaging any future insight update:

- Confirm PWA / iOS app bottom navigation remains fixed at the bottom of the screen.
- Confirm `.mobile-app-nav` uses `bottom: 0` with safe-area padding.
- Confirm all current HTML pages reference the latest CSS cache version.
- Confirm `sw.js` cache name is bumped after CSS or script changes.
- Check every new insight page on desktop, iPad, mobile browser, and PWA/app assumptions.
- Check framework-map / mini-flow arrows:
  - Desktop can use horizontal arrows.
  - Mobile must use real down arrows (`↓`), not rotated arrows.
  - Arrows must be visually centered and not drift left or right.
- Check share-card icon/logo rendering and Chinese font rendering.
- Check article tables on mobile for overflow, readable columns, or intentional horizontal scrolling.
- Check language switcher remains available across languages.
