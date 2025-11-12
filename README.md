# GOV.UK Contentful Learning Project

A hands-on learning environment for content designers to explore headless CMS concepts using Contentful.

## 🎯 Two Ways to Learn

### 1. View the Live Demo (No Setup Required)
See a working example right away: **[View Demo Site](https://jakecosgrove.github.io/contentful-learning-test-3/pages/demo.html)**

This shows you what's possible with Contentful - a real GOV.UK-styled website powered by a headless CMS.

### 2. Build Your Own (Recommended for Learning)
Download this project and create your own version with your own Contentful space. This is where the real learning happens!

## What You'll Learn

- Content modeling (structuring content independently from design)
- Content relationships (how different content types connect)
- Preview workflow (draft → preview → publish)
- API basics (how content is delivered to websites)
- Separation of content and presentation

## Prerequisites

- A web browser (Chrome, Firefox, Safari, or Edge)
- A free Contentful account (for building your own)
- No coding knowledge required!

---

## Quick Start Guide

### Step 1: Create Your Contentful Account

1. Go to [contentful.com](https://www.contentful.com)
2. Click **"Start building for free"**
3. Sign up with your email or GitHub
4. When prompted, select **"Create an empty space"**
5. Name your space (e.g., "My Learning Project")

### Step 2: Set Up Your Content Model

#### Create the "Organisation" Content Type

1. In Contentful, go to **Content model** in the top navigation
2. Click **Add content type**
3. Fill in:
   - **Name:** Organisation
   - **API Identifier:** organisation (leave as default)
4. Click **Create**

5. Add these fields by clicking **Add field**:

   **Field 1: Name**
   - Type: Text (Short text)
   - Check "Required field"
   
   **Field 2: Acronym**
   - Type: Text (Short text)
   - Help text: "e.g., HMRC, DWP, DVLA"
   
   **Field 3: Description**
   - Type: Text (Long text)
   - Help text: "What this organisation does"
   
   **Field 4: Website URL**
   - Type: Text (Short text)
   - Help text: "Link to the organisation's main website"
   
   **Field 5: Slug**
   - Type: Text (Short text)
   - Check "Required field"
   - Help text: "URL-friendly identifier"

6. Click **Save** at the top right

#### Create the "Service Page" Content Type

1. Go back to **Content model**
2. Click **Add content type**
3. Fill in:
   - **Name:** Service Page
   - **API Identifier:** servicePage (leave as default)
4. Click **Create**

5. Add these fields:

   **Field 1: Title**
   - Type: Text (Short text)
   - Check "Required field"
   
   **Field 2: Summary**
   - Type: Text (Long text)
   - Help text: "Brief overview of the service (2-3 sentences)"
   
   **Field 3: Body Content**
   - Type: Rich text
   - Check "Required field"
   
   **Field 4: Start Button URL**
   - Type: Text (Short text)
   - Help text: "Link to start the service"
   
   **Field 5: Organisation**
   - Type: Reference (One reference)
   - Under "Accept only specified entry type", select **Organisation**
   
   **Field 6: Last Updated**
   - Type: Date and time
   
   **Field 7: Slug**
   - Type: Text (Short text)
   - Check "Required field"
   - Help text: "URL-friendly version of the title"

6. Click **Save**

### Step 3: Create Sample Content

#### Create an Organisation

1. Go to **Content** in the top navigation
2. Click **Add entry** → **Organisation**
3. Fill in:
   - **Name:** Department for Transport
   - **Acronym:** DfT
   - **Description:** We work with our agencies and partners to support the transport network that helps the UK's businesses and gets people and goods travelling around the country.
   - **Website URL:** https://www.gov.uk/government/organisations/department-for-transport
   - **Slug:** department-for-transport
4. Click **Publish** (green button, top right)

#### Create a Service Page

1. Go to **Content** → **Add entry** → **Service Page**
2. Fill in:
   - **Title:** Apply for a provisional driving licence
   - **Summary:** You need a provisional driving licence to take lessons or practice before taking your driving test.
   - **Body Content:** (Use the rich text editor to add):
     ```
     You must be at least 15 years and 9 months old to apply for a provisional driving licence.
     
     What you need to apply:
     - An address in Great Britain
     - A valid UK passport or other form of ID
     - Your National Insurance number (if you know it)
     
     It costs £34 to apply online or £43 to apply by post.
     ```
   - **Start Button URL:** https://www.gov.uk/apply-first-provisional-driving-licence
   - **Organisation:** Click and select "Department for Transport"
   - **Last Updated:** Select today's date
   - **Slug:** apply-provisional-driving-licence
3. Click **Publish**

### Step 4: Get Your API Keys

1. In Contentful, go to **Settings** (top navigation) → **API keys**
2. Click **Add API key**
3. Give it a name like "Learning Project - Website"
4. You'll see these important values - **copy them**:
   - **Space ID**
   - **Content Delivery API - access token**
   - **Content Preview API - access token**

### Step 5: Set Up Your Website

1. Open the `index.html` file in a text editor (Notepad, TextEdit, or VS Code)
2. Find these lines near the top of the `<script>` section:
   ```javascript
   const SPACE_ID = 'YOUR_SPACE_ID_HERE';
   const DELIVERY_TOKEN = 'YOUR_DELIVERY_TOKEN_HERE';
   const PREVIEW_TOKEN = 'YOUR_PREVIEW_TOKEN_HERE';
   ```
3. Replace the placeholder text with your actual API keys from Step 4
4. Save the file

### Step 6: View Your Website

1. Double-click `index.html` to open it in your web browser
2. You should see your service page displayed with GOV.UK styling!
3. Try checking the **Preview Mode** checkbox to toggle between published and draft content

---

## How to Use the Preview Workflow

1. **Edit content in Contentful** - Make changes to your service page
2. **Save as draft** (don't publish yet)
3. **Check "Preview Mode"** in your website - You'll see your unpublished changes
4. **When happy, publish in Contentful**
5. **Uncheck "Preview Mode"** - You'll see the live published version

---

## Learning Exercises

### Exercise 1: Edit Existing Content
**Goal:** Understand the edit → preview → publish workflow

1. In Contentful, edit your Service Page
2. Change the title to something different
3. Save (don't publish)
4. In your website, check "Preview Mode" - see your change
5. Publish in Contentful
6. Uncheck "Preview Mode" - see the published version

### Exercise 2: Use Rich Text Formatting
**Goal:** Learn how rich text works in a headless CMS

1. Edit the Body Content field of your Service Page
2. Add a new heading using the formatting toolbar
3. Add a bulleted list
4. Make some text bold
5. Preview and publish

### Exercise 3: Create a New Organisation
**Goal:** Understand content relationships

1. Create a new Organisation (e.g., DVLA, HMRC, Home Office)
2. Create a new Service Page
3. Link it to your new organisation
4. Publish both
5. Refresh your website to see it

### Exercise 4: Content Without Publishing
**Goal:** Understand draft vs. published content

1. Create a new Service Page but DON'T publish it
2. With Preview Mode OFF, refresh your website - you won't see it
3. With Preview Mode ON, refresh - now you'll see it
4. This shows the difference between draft and live content

---

## Troubleshooting

### "Error loading content"
- Check that you've published at least one Service Page in Contentful
- Verify your API keys are correct in `index.html`
- Make sure your Space ID is correct
- Check the browser console (F12) for detailed errors

### Changes not appearing
- Make sure you've clicked **Publish** in Contentful (not just Save)
- Refresh your browser (F5)
- If using Preview Mode, make sure the checkbox matches what you want to see

### "No service pages found"
- You must have at least one Service Page created AND published
- Check the content type API identifier is exactly "servicePage" (case-sensitive)

---

## What's Next?

Once you're comfortable with the basics, try:

1. **Create more content types** (Guide, News Article, Contact Information)
2. **Create multiple service pages** and add navigation
3. **Experiment with media** - add images to your organisations
4. **Learn about localization** - create content in multiple languages

---

## Additional Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [Content Modeling Guide](https://www.contentful.com/developers/docs/concepts/data-model/)

---

## Need Help?

- Check the troubleshooting section above
- Review the Contentful documentation
- Ask your team lead or instructor
