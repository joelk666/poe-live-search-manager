import types from "./Types";

export default [
  {
    type: types.RELEASE_NOTE,
    title: "v1.5.0",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.5.0",
    description: `New features:
- Include result timestamp([#57](https://github.com/5k-mirrors/poe-sniper/issues/57))
- Pop up a confirmation window upon deleting ALL searches and results to avoid accidental removals
    `,
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.4.0",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.4.0",
    description: `New features:
- Prices in non-English whisper messages are now also recognized - thanks to [@verasztol](https://github.com/verasztol) for the contribution

Fixes:
- Eliminate another instance of duplicate socket connections`,
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.3.0",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.3.0",
    description:
      "Improve searches screen(vertical scrolling & remove pagination).",
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.2.1",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.2.1",
    description:
      "Support encoded characters in search URLs([#51](https://github.com/5k-mirrors/poe-sniper/issues/51)).",
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.2.0",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.2.0",
    description: `New features:
- Option to enable and disable system notifications upon new items([#50](https://github.com/5k-mirrors/poe-sniper/issues/50)).
- Open search URLs right from the app.

Improvements:
- Remove application menu bar.`,
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.1.0",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.1.0",
    description: `New feature:
- Added results screen ([#43](https://github.com/5k-mirrors/poe-sniper/issues/43), [#45](https://github.com/5k-mirrors/poe-sniper/issues/45))

Fixes:
- Fixed another instance of duplicate notifications ([#48](https://github.com/5k-mirrors/poe-sniper/issues/48))
  - In case of encountering this issue again, report it here and restart the app the temporarily fix it`,
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.0.3",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.0.3",
    description: "Add delete all button",
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.0.2",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.0.2",
    description:
      "Fixes [#48](https://github.com/5k-mirrors/poe-sniper/issues/48) - Notifications come in multiple times for the same result",
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.0.1",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.0.1",
    description:
      "Users can no longer navigate away from the account tab until the setup is completed.",
  },
  {
    type: types.RELEASE_NOTE,
    title: "v1.0.0",
    link: "https://github.com/5k-mirrors/poe-sniper/releases/tag/v1.0.1",
    description: `\`v1.0.0\` ships a completely new app with [pathofexile.com/trade](https://www.pathofexile.com/trade) support and a graphical interface.

Going forward we're working new features, such as showing the items in the app and the ability to ignore users. As always, we're welcoming feedback, ideas and bug reports at https://github.com/5k-mirrors/poe-sniper/issues.`,
  },
];
