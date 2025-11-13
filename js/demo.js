// Demo site configuration - connected to the sample Contentful space
const SPACE_ID = '580251rmw49s';
const DELIVERY_TOKEN = 'uy1OK3vdmQXP2YHWiQySRP2MDN04fbCiPR8WLB3g-7U';

let servicePages = [];
let organisations = [];
const contentDiv = document.getElementById('content');

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const pageSlug = urlParams.get('page');

/**
 * Fetch content from Contentful
 */
async function fetchContent() {
    contentDiv.innerHTML = '<div class="loading-box"><p style="margin: 0;">Loading service pages from Contentful...</p></div>';

    try {
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=servicePage&include=2`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${DELIVERY_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            servicePages = data.items;
            
            // Extract organisations from includes
            if (data.includes?.Entry) {
                organisations = data.includes.Entry;
            }

            // Check if we should show a specific page or list all
            if (pageSlug) {
                renderSinglePage(pageSlug);
            } else {
                renderPageList();
            }
        } else {
            showError('No service pages found in the demo space.');
        }
    } catch (err) {
        console.error('Fetch error:', err);
        showError(`Unable to load demo content: ${err.message}`);
    }
}

/**
 * Render list of all service pages
 */
function renderPageList() {
    let html = '<h1 class="govuk-heading-xl">Service pages</h1>';
    html += `<p class="govuk-body-l">Example GOV.UK service pages powered by Contentful. ${servicePages.length} ${servicePages.length === 1 ? 'page' : 'pages'} published.</p>`;
    
    servicePages.forEach(page => {
        const slug = page.fields.slug || page.sys.id;
        const organisation = getOrganisation(page);
        
        html += '<div class="service-list-item">';
        
        if (organisation) {
            html += `<p class="govuk-body-s" style="margin: 0 0 5px 0; color: #505a5f;">${escapeHtml(organisation.fields.name)}</p>`;
        }
        
        html += `<h2 class="govuk-heading-m" style="margin: 0 0 10px 0;">
            <a href="demo.html?page=${escapeHtml(slug)}" class="govuk-link govuk-link--no-visited-state">
                ${escapeHtml(page.fields.title)}
            </a>
        </h2>`;
        
        if (page.fields.summary) {
            html += `<p class="govuk-body">${escapeHtml(page.fields.summary)}</p>`;
        }
        
        html += '</div>';
    });
    
    html += `
        <div class="govuk-inset-text" style="margin-top: 40px;">
            <p><strong>For content designers:</strong> These pages are pulled from Contentful in real-time. 
            When you create and publish new service pages in Contentful, they'll appear here automatically. Just refresh the page!</p>
        </div>
    `;
    
    contentDiv.innerHTML = html;
}

/**
 * Render a single service page
 */
function renderSinglePage(slug) {
    const page = servicePages.find(p => p.fields.slug === slug || p.sys.id === slug);
    
    if (!page) {
        showError(`Service page "${slug}" not found.`);
        return;
    }
    
    const organisation = getOrganisation(page);
    let html = '';
    
    // Back link
    html += '<a href="demo.html" class="back-link">Back to all service pages</a>';
    
    // Organisation caption
    if (organisation && organisation.fields) {
        html += `<span class="govuk-caption-xl">${escapeHtml(organisation.fields.name)}</span>`;
    }
    
    // Page title
    html += `<h1 class="govuk-heading-xl">${escapeHtml(page.fields.title)}</h1>`;
    
    // Summary
    if (page.fields.summary) {
        html += `<p class="govuk-body-l">${escapeHtml(page.fields.summary)}</p>`;
    }
    
    // Start button
    const startUrl = page.fields.startButton || page.fields.startButtonUrl;
    if (startUrl) {
        html += `
            <a href="${escapeHtml(startUrl)}" 
               class="govuk-button govuk-button--start" 
               target="_blank" 
               rel="noopener noreferrer">
                Start now
            </a>`;
    }
    
    // Body content
    if (page.fields.bodyContent) {
        html += '<div style="margin-top: 40px;">';
        html += renderRichText(page.fields.bodyContent);
        html += '</div>';
    }
    
    // Last updated
    if (page.fields.lastUpdated) {
        const date = new Date(page.fields.lastUpdated);
        const formatted = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        html += `
            <p class="govuk-body" style="color: #505a5f; margin-top: 40px; font-size: 16px;">
                Last updated: ${formatted}
            </p>`;
    }
    
    // Organisation details
    if (organisation && organisation.fields) {
        html += '<div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #b1b4b6;">';
        html += `<h2 class="govuk-heading-m">${escapeHtml(organisation.fields.name)}</h2>`;
        
        if (organisation.fields.description) {
            html += `<p class="govuk-body">${escapeHtml(organisation.fields.description)}</p>`;
        }
        
        if (organisation.fields.websiteUrl) {
            html += `
                <p class="govuk-body">
                    <a href="${escapeHtml(organisation.fields.websiteUrl)}" target="_blank" rel="noopener noreferrer">
                        Visit the ${escapeHtml(organisation.fields.name)} website
                    </a>
                </p>`;
        }
        
        html += '</div>';
    }
    
    contentDiv.innerHTML = html;
}

/**
 * Get organisation for a service page
 */
function getOrganisation(page) {
    if (!page.fields.organisation || !organisations.length) {
        return null;
    }
    
    const orgId = page.fields.organisation.sys.id;
    return organisations.find(org => org.sys.id === orgId);
}

/**
 * Render rich text content from Contentful
 */
function renderRichText(richText) {
    if (!richText || !richText.content) return '';

    let html = '';

    richText.content.forEach(node => {
        if (node.nodeType === 'paragraph') {
            const text = node.content?.map(n => escapeHtml(n.value || '')).join('');
            if (text) {
                html += `<p class="govuk-body">${text}</p>`;
            }
        } else if (node.nodeType === 'unordered-list') {
            html += '<ul class="govuk-list govuk-list--bullet">';
            node.content?.forEach(listItem => {
                const text = escapeHtml(listItem.content?.[0]?.content?.[0]?.value || '');
                if (text) {
                    html += `<li>${text}</li>`;
                }
            });
            html += '</ul>';
        } else if (node.nodeType === 'heading-2') {
            const text = node.content?.map(n => escapeHtml(n.value || '')).join('');
            if (text) {
                html += `<h2 class="govuk-heading-m">${text}</h2>`;
            }
        } else if (node.nodeType === 'heading-3') {
            const text = node.content?.map(n => escapeHtml(n.value || '')).join('');
            if (text) {
                html += `<h3 class="govuk-heading-s">${text}</h3>`;
            }
        }
    });

    return html;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show error message
 */
function showError(message) {
    let html = '<a href="demo.html" class="back-link">Back to all service pages</a>';
    html += `
        <div class="error-box">
            <h2>Error loading demo content</h2>
            <p class="govuk-body">${escapeHtml(message)}</p>
            <p class="govuk-body">This demo requires the sample Contentful space to be set up correctly.</p>
        </div>`;
    contentDiv.innerHTML = html;
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', fetchContent);
