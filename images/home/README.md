# Hero Background Images

This directory contains modern, professional hero background images for the FIXLAB IT Support website.

## Available Images

### 1. `hero-background.svg`
- **Style**: Blue gradient with network connections and IT icons
- **Colors**: Blue gradient (#1e3a8a to #60a5fa)
- **Features**: 
  - Network connection lines
  - Server and security icons
  - Connection nodes
  - Central focus area
  - Subtle grid pattern

### 2. `hero-tech-background.svg`
- **Style**: Dark tech theme with circuit patterns
- **Colors**: Dark gradient (#0f172a to #64748b) with blue/cyan/purple accents
- **Features**:
  - Circuit board patterns
  - Data flow lines
  - Tech icons (servers, switches, data centers)
  - Central hub design
  - Glow effects and animations

## Usage

### In CSS
```css
.hero {
    background-image: url('../images/home/hero-background.svg');
    /* or */
    background-image: url('../images/home/hero-tech-background.svg');
}
```

### In HTML
```html
<div class="hero" style="background-image: url('images/home/hero-background.svg')">
    <!-- Hero content -->
</div>
```

## Features

- **Scalable**: SVG format ensures crisp display at any resolution
- **Lightweight**: Small file sizes for fast loading
- **Customizable**: Easy to modify colors and elements
- **Animated**: CSS animations can be applied to elements
- **Responsive**: Works well on all device sizes

## Customization

### Colors
- Modify the gradient stops in the SVG `<defs>` section
- Change opacity values for different effects
- Adjust stroke and fill colors for elements

### Elements
- Add/remove connection lines
- Modify icon designs
- Adjust positioning and sizing
- Add new geometric shapes

### Animations
- Use CSS keyframes for floating, pulsing, and glowing effects
- Apply different animation delays for staggered effects
- Customize animation timing and easing

## Browser Support

- **Modern Browsers**: Full SVG support with animations
- **Older Browsers**: Fallback to CSS gradients
- **Mobile**: Optimized for touch devices

## Performance

- **File Size**: SVG files are typically under 10KB
- **Loading**: Fast loading with minimal impact on page speed
- **Caching**: SVG files can be cached by browsers
- **Compression**: Further optimization possible with GZIP compression

## Best Practices

1. **Use SVG for scalability** - Perfect for responsive designs
2. **Optimize file size** - Remove unnecessary elements
3. **Test on different devices** - Ensure good performance
4. **Provide fallbacks** - CSS gradients as backup
5. **Consider accessibility** - Ensure sufficient contrast

## File Structure

```
images/home/
├── hero-background.svg          # Blue network theme
├── hero-tech-background.svg     # Dark tech theme
└── README.md                    # This documentation
```

## Support

For questions or customization requests, contact the development team.
