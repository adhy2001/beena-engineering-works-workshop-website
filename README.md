# Beena Engineering Works - Professional Website

A modern, responsive website for Beena Engineering Works, showcasing their welding and fabrication expertise.

## 🚨 IMPORTANT: Email Setup Required

**To receive client messages, you must configure Formspree (default) or EmailJS:**

### Quick Setup with Formspree (Recommended - 2 minutes)
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create free account → Create form → Get your endpoint URL
3. Replace `YOUR_FORM_ID` in `index.html` with your actual form ID
4. That's it! You'll receive emails when clients submit the form.

### Alternative: EmailJS Setup (More Control)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Set up Email Service
1. Go to **Email Services** in your dashboard
2. Add a new service (Gmail, Outlook, etc.)
3. Connect your email account
4. Note down the **Service ID**

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Create a new template with these variables:
   ```
   Subject: New Contact Form Message from {{from_name}}

   Hi {{to_name}},

   You have received a new message from your website:

   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Service: {{service}}

   Message:
   {{message}}

   Reply to: {{reply_to}}
   ```
3. Note down the **Template ID**

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### Step 5: Update Your Website
Replace the placeholders in `index.html`:
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
```

And in `script.js`:
```javascript
emailjs.send(
    'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
    'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
    emailData
)
```

### Step 6: Test
1. Submit the contact form on your website
2. Check your email for the message
3. Verify everything works correctly

**Note:** EmailJS free plan allows 200 emails/month. Upgrade if needed.

## Alternative: Formspree (Simpler Setup)

If EmailJS seems complex, try Formspree:

1. Go to [https://formspree.io/](https://formspree.io/)
2. Create free account
3. Create a new form
4. Get your form endpoint URL
5. Update the contact form in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="contactForm">
   ```
6. Remove the EmailJS scripts and JavaScript code
7. Formspree will email you directly when forms are submitted

**Formspree free plan:** 50 submissions/month

## Features

### 🎨 Design & UI
- **Industrial Theme**: Dark, professional color scheme with orange accents representing welding/flames
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Modern UI**: Clean, professional interface with smooth animations
- **Loading Screen**: Elegant loading animation with branded elements

### 🚀 Functionality
- **Smooth Navigation**: Fixed navigation with smooth scrolling to sections
- **Interactive Portfolio**: Filterable portfolio with categories (Structural Steel, Machinery, Welding, Fabrication)
- **Contact Form**: Validated contact form with success/error notifications
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Scroll Animations**: Elements animate in as they come into view
- **Back to Top**: Convenient back-to-top button

### 📱 Sections
1. **Hero Section**: Compelling headline with key statistics
2. **Services**: Four main service categories with detailed descriptions
3. **About**: Company history, experience, and key statistics
4. **Portfolio**: Showcase of completed projects with filtering
5. **Testimonials**: Client reviews and ratings
6. **Contact**: Contact information and inquiry form
7. **Footer**: Additional links and social media

### 🛠️ Technical Features
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **CSS Grid & Flexbox**: Modern layout techniques
- **SVG Graphics**: Scalable vector graphics for logos and patterns
- **Form Validation**: Client-side validation with user feedback
- **Accessibility**: Proper focus states and semantic HTML
- **Performance**: Optimized images and efficient code

## File Structure

```
beena-engineering-works/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/
    ├── hero-bg.svg     # Hero background with industrial elements
    ├── welding-sparks.svg # Animated welding sparks
    └── gear-pattern.svg # Industrial pattern overlay
```

## Color Scheme

- **Primary**: #FF6B35 (Orange - welding flame)
- **Secondary**: #1a1a1a (Dark industrial)
- **Accent**: #FF8F65 (Light orange)
- **Text Light**: #ffffff
- **Text Dark**: #333333
- **Background Light**: #f8f9fa

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript (ES6)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter and Roboto Mono

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimizations

- **Minified Code**: Clean, optimized code
- **SVG Graphics**: Lightweight vector images
- **Efficient Animations**: CSS animations over JavaScript
- **Lazy Loading**: Content loads as needed
- **Fast Loading**: Optimized for quick page loads

## Customization

### Colors
Edit the CSS custom properties in `:root` to change the color scheme.

### Content
Update text, images, and contact information in `index.html`.

### Services & Portfolio
Modify the services and portfolio sections to reflect your specific offerings.

### Contact Information
Update the contact details in the contact section and footer.

## Deployment

1. Upload all files to your web hosting service
2. Ensure the `images/` directory is included
3. Test all functionality on different devices
4. Update contact information and content as needed

## Contact

For customization or support, contact the development team.

---

**Built with precision for excellence in welding and fabrication.**
