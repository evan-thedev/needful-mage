# GitHub Pages Setup for Needful Mage Web Version

## Quick Setup (30 seconds)

1. **Navigate to Settings**
   - Go to: https://github.com/evan-thedev/needful-mage/settings/pages

2. **Configure Pages**
   - Under "Build and deployment"
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/docs**
   - Click **Save**

3. **Wait for Deployment**
   - GitHub Actions will build automatically (~1 minute)
   - Refresh the Settings → Pages to see the green checkmark

4. **Play the Game!**
   - URL: https://evan-thedev.github.io/needful-mage/
   - Open in Safari on your iPhone
   - No install needed, just tap and play

## What You'll See

The web version has the exact same gameplay as the iOS app:
- Tap element runes (Fire, Ice, Lightning, etc.)
- Tap modifier runes (Amplify, Chain, etc.)  
- Tap **Craft** to combine them
- Tap **Cast** to use the spell
- Complete 8 wizard quests
- Unlock new runes as you progress

## First Quest Walkthrough

1. Wizard says: "Help! The brazier's gone out!"
2. Tap the **Fire** rune (🔥)
3. Tap **Craft** button
4. You'll see "You've crafted: 🔥 Fireball!"
5. Tap **Cast!** button
6. Wizard says: "Brilliant! The flames dance merrily now!"
7. Ice rune unlocks → Quest 2 begins

## Troubleshooting

**"Cannot access the site"**
- Wait 1-2 minutes after enabling Pages
- Check Settings → Pages for deployment status

**"Blank page or errors"**
- Hard refresh: Cmd+Shift+R (desktop) or pull-to-refresh (mobile)
- Check browser console (F12) for errors

**"Can't tap runes"**
- Make sure JavaScript is enabled
- Try a different browser (Safari, Chrome, Firefox all work)

## Files

All game files are in `/docs`:
- `index.html` - Main game page
- `styles.css` - Mobile-optimized styling
- `spell-crafter.js` - Recipe engine (matches Swift package)
- `game.js` - Game loop, wizard requests, state management

## No Build Step

This is pure HTML/CSS/JS. No webpack, no npm, no build process. GitHub Pages serves it directly.

## Author

Evan Parrott (@evan-thedev)  
MIT License  
Contact: coppercoffin@gmail.com
