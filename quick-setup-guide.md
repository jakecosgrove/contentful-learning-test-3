# Quick Setup Guide

## What You Need
- 10-15 minutes
- A web browser
- No technical skills required!

---

## Setup Steps

### 1️⃣ Download the Project Files
Download and extract the project folder to your computer (e.g., your Desktop or Documents folder).

### 2️⃣ Create Your Contentful Account
1. Go to **contentful.com**
2. Click "Start building for free"
3. Sign up with your email
4. Create an empty space called "My Learning Project"

### 3️⃣ Follow the README
Open `README.md` and follow the instructions to:
- Set up your content types (Organisation and Service Page)
- Create sample content
- Get your API keys

### 4️⃣ Configure Your HTML File
1. Open `index.html` in a text editor (Notepad on Windows, TextEdit on Mac)
2. Find this section near the top:
   ```javascript
   const SPACE_ID = 'YOUR_SPACE_ID_HERE';
   const DELIVERY_TOKEN = 'YOUR_DELIVERY_TOKEN_HERE';
   const PREVIEW_TOKEN = 'YOUR_PREVIEW_TOKEN_HERE';
   ```
3. Replace each `'YOUR_..._HERE'` with your actual keys from Contentful
4. **Important:** Keep the single quotes around your keys
5. Save the file

### 5️⃣ Open Your Website
1. Find `index.html` in your file browser
2. Double-click to open it in your web browser
3. You should see your service page!

---

## Example: How to Replace API Keys

**Before (in index.html):**
```javascript
const SPACE_ID = 'YOUR_SPACE_ID_HERE';
```

**After (with your actual Space ID):**
```javascript
const SPACE_ID = 'abc123xyz456';
```

Do this for all three values (Space ID, Delivery Token, and Preview Token).

---

## Troubleshooting

**❌ "Please configure your Contentful API keys"**
- You haven't replaced the placeholder text in `index.html` yet
- Follow step 4 above

**❌ "No service pages found"**
- Make sure you created and **published** a Service Page in Contentful
- The green "Publish" button must be clicked, not just "Save"

**❌ "HTTP error! status: 401"**
- Your API keys might be incorrect
- Copy them again from Contentful Settings > API keys
- Make sure you kept the single quotes around them

**❌ Nothing happens when I open index.html**
- Try a different browser (Chrome usually works best)
- Check if JavaScript is enabled in your browser
- Open the browser console (F12) to see error messages

---

## Next Steps

Once everything is working:
1. Try the learning exercises in the README
2. Create more content in Contentful
3. Experiment with the Preview Mode checkbox
4. Share what you've learned with your team!

---

## Need Help?

- Read the full README.md for detailed instructions
- Check the Troubleshooting section above
- Ask your team lead or instructor