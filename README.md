# LOK TARANG - Folk Dance Competition

## Podar Blossom School, Chakan

A modern, interactive, and professional website for the LOK TARANG Folk Dance Competition event celebrating Republic Day 2026.

---

## 📋 Project Overview

This is a fully responsive, single-page website built with pure HTML, CSS, and JavaScript (no frameworks). The website features a Republic Day themed color palette, smooth animations, interactive elements, and a complete registration system.

### Event Details

- **Date:** 26 January 2027
- **Time:** Evening
- **Venue:** Podar Blossom School, Chakan
- **Registration Deadline:** 17 January (Tentative)

---

## 🚀 Features

### Design & UI

- ✅ Modern, sleek design with Republic Day theme (Orange/White/Green/Blue)
- ✅ Fully responsive layout (Mobile, Tablet, Desktop)
- ✅ Smooth scroll navigation with sticky navbar
- ✅ Hero section with background video support
- ✅ Background music with mute/unmute control
- ✅ Image carousel with auto-play and manual controls
- ✅ Animated event cards and sections
- ✅ Professional typography (Poppins + Playfair Display)

### Functionality

- ✅ Registration form with real-time validation
- ✅ Form data saved to localStorage
- ✅ Toast notifications for user feedback
- ✅ Dynamic form fields (Group fields appear when Group category selected)
- ✅ Smooth scroll to sections
- ✅ Active navigation link highlighting
- ✅ Mobile-friendly hamburger menu

### Sections

1. **Hero** - Eye-catching header with video background
2. **About** - Event description and purpose
3. **Gallery** - Image carousel slider
4. **Event Details** - Key information cards
5. **Rules** - Competition rules and guidelines
6. **Awards** - Award categories and descriptions
7. **Registration** - Complete registration form
8. **Contact** - Contact information
9. **Footer** - School branding and quick links

---

## 📁 Project Structure

```
folk-dance-competition/
│
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
├── README.md           # This file
│
└── assets/
    ├── images/
    │   ├── school-logo.png      # School logo (required)
    │   ├── favicon.ico           # Favicon (required)
    │   └── [placeholder images] # Gallery images (optional)
    │
    ├── video/
    │   └── hero-background.mp4   # Hero section background video (optional)
    │
    └── audio/
        └── background-music.mp3 # Background music file (optional)
```

---

## 🎨 Asset Requirements

### Required Assets

#### 1. School Logo

- **Path:** `assets/images/school-logo.png`
- **Format:** PNG with transparent background
- **Size:** Recommended 200x200px or higher
- **Usage:** Navigation bar and footer

#### 2. Favicon

- **Path:** `assets/images/favicon.ico`
- **Format:** ICO file
- **Size:** 32x32px or 16x16px
- **Theme:** Republic Day themed (Tricolor or Ashoka Chakra)

### Optional Assets

#### 3. Hero Background Video

- **Path:** `assets/video/hero-background.mp4`
- **Format:** MP4 (also provide WebM for better browser support)
- **Duration:** 10-30 seconds (looping)
- **Content:** Indian cultural/dance theme, school events, or abstract patriotic visuals
- **Resolution:** 1920x1080 or higher
- **Note:** If video is not available, the hero section will use a gradient background

#### 4. Background Music

- **Path:** `assets/audio/background-music.mp3`
- **Format:** MP3 (also provide OGG for better browser support)
- **Duration:** 2-5 minutes (looping)
- **Content:** Traditional Indian instrumental music, folk music, or soft patriotic tunes
- **Volume:** Keep it subtle (30% volume in code)
- **Note:** Music is muted by default, users can toggle it

#### 5. Gallery Images

- **Path:** `assets/images/gallery-*.jpg` or similar
- **Format:** JPG or PNG
- **Size:** Recommended 1200x800px or higher
- **Content:**
  - School events
  - Dance performances
  - Cultural celebrations
  - Students in traditional attire
- **Quantity:** 4-6 images recommended
- **Note:** Currently using SVG placeholders. Replace with actual images in `index.html` carousel section

---

## 🛠️ Setup Instructions

### 1. Basic Setup

1. Ensure all files are in the project directory
2. Create the `assets` folder structure as shown above
3. Add required assets (logo, favicon)

### 2. Adding Assets

#### Adding School Logo

```html
<!-- Replace in index.html -->
<img src="assets/images/school-logo.png" alt="Podar Blossom School Logo" />
```

#### Adding Favicon

```html
<!-- Already in index.html head section -->
<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico" />
```

#### Adding Hero Video

```html
<!-- Replace in index.html hero section -->
<video class="hero-video" autoplay muted loop playsinline>
  <source src="assets/video/hero-background.mp4" type="video/mp4" />
  <source src="assets/video/hero-background.webm" type="video/webm" />
</video>
```

#### Adding Background Music

```html
<!-- Already in index.html -->
<audio id="backgroundMusic" loop>
  <source src="assets/audio/background-music.mp3" type="audio/mpeg" />
  <source src="assets/audio/background-music.ogg" type="audio/ogg" />
</audio>
```

#### Adding Gallery Images

Replace the SVG placeholders in the carousel section:

```html
<!-- Replace in index.html carousel section -->
<div class="slide-image">
  <img src="assets/images/gallery-1.jpg" alt="School Event" />
</div>
```

### 3. Customization

#### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --color-saffron: #ff9933;
  --color-white: #ffffff;
  --color-green: #138808;
  --color-blue: #000080;
}
```

#### Updating Contact Information

Edit the contact section in `index.html`:

```html
<p>Contact No. (placeholder)</p>
<p>Event Coordinator (placeholder)</p>
```

#### Modifying Event Details

Update the event details cards in `index.html` as needed.

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎯 Key Features Explained

### Registration Form

- **Validation:** Real-time field validation
- **Storage:** Data saved to browser localStorage
- **Dynamic Fields:** Group name and participants appear when "Group" category is selected
- **Toast Notifications:** Success/error messages

### LocalStorage Structure

```javascript
{
    "folkDanceRegistrations": [
        {
            "studentName": "Student Name",
            "classDivision": "8A",
            "category": "solo",
            "groupName": null,
            "folkDanceType": "Garba (Gujarat)",
            "participants": null,
            "contactNumber": "9876543210",
            "parentTeacherName": "Parent Name",
            "submittedAt": "2027-01-15T10:30:00.000Z"
        }
    ]
}
```

### Accessing Stored Registrations

Open browser console and run:

```javascript
JSON.parse(localStorage.getItem("folkDanceRegistrations"));
```

---

## 🎨 Color Palette

- **Saffron (Orange):** `#FF9933` - Primary accent
- **White:** `#FFFFFF` - Background and text
- **Green:** `#138808` - Secondary accent
- **Blue:** `#000080` - Headers and dark sections
- **Gold:** `#FFD700` - Awards and highlights

---

## 📝 Notes

1. **No External Dependencies:** Pure HTML, CSS, and JavaScript only
2. **No Build Process:** Open `index.html` directly in a browser
3. **LocalStorage:** Registration data persists in browser (not sent to server)
4. **Responsive:** Tested on mobile, tablet, and desktop viewports
5. **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation support

---

## 🔧 Troubleshooting

### Music Not Playing

- Modern browsers require user interaction before playing audio
- Click the music button to enable playback
- Ensure audio file exists and is in correct format

### Video Not Showing

- Check video file path and format
- Ensure video file is not too large (optimize for web)
- Fallback gradient background will show if video fails to load

### Form Not Saving

- Check browser console for errors
- Ensure localStorage is enabled in browser
- Clear browser cache if issues persist

### Images Not Loading

- Verify file paths are correct
- Check image file formats (JPG, PNG supported)
- Ensure images are in the `assets/images/` folder

---

## 📄 License

This project is created for Podar Blossom School, Chakan for the Folk Dance Competition event.

---

## 👨‍💻 Development

### Code Structure

- **HTML:** Semantic, accessible markup
- **CSS:** Modular, organized with CSS variables
- **JavaScript:** ES6+, event-driven, no dependencies

### Performance

- Optimized animations using CSS transforms
- Debounced scroll handlers
- Lazy loading ready (can be added)

---

## 📞 Support

For questions or issues, contact the event coordinator at Podar Blossom School, Chakan.

---

**Built with ❤️ for Podar Blossom School, Chakan**

_Folk Dance Competition - Republic Day Special 2027_
