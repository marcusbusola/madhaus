# Keyboard Sound Files

This directory should contain 4 keyboard click sound variations for the typewriter animation effect.

## Required Files

You need to add these 4 MP3 files:

- `keyboard-click-1.mp3`
- `keyboard-click-2.mp3`
- `keyboard-click-3.mp3`
- `keyboard-click-4.mp3`

## Specifications

- **Format**: MP3 (best browser compatibility)
- **Duration**: 50-150ms (short, crisp clicks)
- **File Size**: <10KB per file (keep them small)
- **Volume**: Pre-normalized to comfortable level (will be played at 30% in code)
- **Type**: Mechanical keyboard key press sounds

## Where to Get Sounds

### Option 1: Free Sound Libraries
- **freesound.org**: Search for "keyboard click" or "mechanical keyboard"
  - https://freesound.org/search/?q=keyboard+click
- **zapsplat.com**: Free sound effects library
  - https://www.zapsplat.com/
- **mixkit.co**: Free sound effects
  - https://mixkit.co/free-sound-effects/

### Option 2: Record Your Own
Use a mechanical keyboard and audio recording software:
1. Record single key presses
2. Trim to 50-100ms
3. Normalize audio levels
4. Export as MP3

### Option 3: AI Generation
Use AI audio tools like:
- ElevenLabs Sound Effects
- AudioGen

## Implementation Notes

- The code randomly selects one of the 4 files when playing a sound
- This variation creates a more natural typing sound
- Sounds play at 30% volume for subtlety
- User can toggle sounds on/off with the speaker icon
- Gracefully degrades if files are missing (no errors, just no sound)

## Testing

Once you've added the files, test by:
1. Running the development server
2. Loading the homepage
3. The typewriter animation should play sounds
4. Check browser console for any 404 errors on sound files
