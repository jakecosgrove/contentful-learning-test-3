// Demo site configuration - connected to the sample Contentful space
const SPACE_ID = '580251rmw49s';
const DELIVERY_TOKEN = 'uy1OK3vdmQXP2YHWiQySRP2MDN04fbCiPR8WLB3g-7U';

let servicePage = null;
let organisation = null;

const contentDiv = document.getElementById('content');

/**
 * Fetch content from Contentful
 */
async function fetchContent() {
    contentDiv.innerHTML = '<div class="loading-box"><p style="margin: 0;">Loading content from Contentful...</p></div>';

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
            servicePage = data.items[0];

            // Find linked organisation
            if (servicePage.fields.organisation && data.includes?.Entry) {
                const orgId = servicePage.fields.organisation.sys.id;
                organisation = data.includes.Entry.find(entry => entry.sys.id === orgId);
            }

            renderContent();
        } else {
            showError('No service pages found in the demo space.');
        }
    } catch (err) {
        console.error('Fetch error:', err);
        showError(`Unable to load demo content: ${err.message}`);
    }
}

/**
 * Render the service page content
 */
function renderContent() {
    let html = '';

    // Organisation caption
    if (organisation && organisation.fields) {
        html += `<span class="govuk-caption-xl">${escapeHtml(organisation.fields.name)}</span>`;
    }

    // Page title
    html += `<h1 class="govuk-heading-xl">${escapeHtml(servicePage.fields.title)}</h1>`;

    // Summary
    if (servicePage.fields.summary) {
        html += `<p class="govuk-body-l">${escapeHtml(servicePage.fields.summary)}</p>`;
    }

    // Start button - check for both field IDs
    const startUrl = servicePage.fields.startButton || servicePage.fields.startButtonUrl;
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
    if (servicePage.fields.bodyContent) {
        html += '<div style="margin-top: 40px;">';
        html += renderRichText(servicePage.fields.bodyContent);
        html += '</div>';
    }

    // Last updated
    if (servicePage.fields.lastUpdated) {
        const date = new Date(servicePage.fields.lastUpdated);
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
    contentDiv.innerHTML = `
        <div class="error-box">
            <h2>Error loading demo content</h2>
            <p class="govuk-body">${escapeHtml(message)}</p>
            <p class="govuk-body">This demo requires the sample Contentful space to be set up correctly.</p>
        </div>`;
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', fetchContent);
