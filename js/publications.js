/**
 * Publications loader with Google Scholar integration
 */

class PublicationsLoader {
    constructor(options = {}) {
        this.options = {
            googleScholarId: 'JhARGjAAAAAJ',
            containerId: 'publications-container',
            ...options
        };

        this.publicationsContainer = document.getElementById(this.options.containerId);
        this.yearFilters = new Set();
        this.activeYear = 'all';
        this.visibleItems = 3;
    }
    
    async loadPublications() {
        if (!this.publicationsContainer) {
            console.error('Publications container not found');
            return;
        }

        try {
            // Clear existing content
            this.publicationsContainer.innerHTML = '';
            
            // Get publications
            const publications = PUBLICATIONS_DATA || [];
            
            if (publications.length === 0) {
                this.publicationsContainer.innerHTML = '<p class="no-publications">No publications found.</p>';
                return;
            }

            // Extract unique years for filters
            publications.forEach(pub => this.yearFilters.add(pub.year));
            const sortedYears = Array.from(this.yearFilters).sort().reverse();
            
            // Create the main layout container
            const layoutContainer = document.createElement('div');
            layoutContainer.className = 'publications-layout';
            
            // Create the year filter sidebar
            const filterContainer = this.createYearFilter(sortedYears);
            layoutContainer.appendChild(filterContainer);
            
            // Create publications content area
            const publicationsContent = document.createElement('div');
            publicationsContent.className = 'publications-content';
            
            // Group publications by year
            const publicationsByYear = this.groupByYear(publications);
            
            // For each year, create a section
            sortedYears.forEach(year => {
                const yearPublications = publicationsByYear[year];
                
                // Create year section with header
                const yearSection = document.createElement('div');
                yearSection.className = 'publication-year-section';
                yearSection.id = `pub-year-${year}`;
                yearSection.dataset.year = year;
                
                // Add year header
                const yearHeader = document.createElement('h3');
                yearHeader.className = 'publication-year-header';
                yearHeader.textContent = year;
                yearSection.appendChild(yearHeader);
                
                // Add publications for this year
                const pubList = document.createElement('div');
                pubList.className = 'publication-list';
                
                yearPublications.forEach(publication => {
                    const card = this.createPublicationCard(publication);
                    pubList.appendChild(card);
                });
                
                yearSection.appendChild(pubList);
                publicationsContent.appendChild(yearSection);
            });
            
            layoutContainer.appendChild(publicationsContent);
            
            // Add everything to the publications container
            this.publicationsContainer.appendChild(layoutContainer);
            
            // Initialize with All filter
            this.filterByYear('all');
            
            // Add scrolling event listener for the content area
            publicationsContent.addEventListener('scroll', () => {
                this.updateYearHighlight(publicationsContent);
            });
            
        } catch (error) {
            console.error('Error loading publications:', error);
            this.loadFallbackPublications();
        }
    }

    groupByYear(publications) {
        return publications.reduce((acc, pub) => {
            if (!acc[pub.year]) acc[pub.year] = [];
            acc[pub.year].push(pub);
            return acc;
        }, {});
    }
    
    createYearFilter(years) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'publication-filters';
        
        // Create "All" filter option
        const allFilter = document.createElement('button');
        allFilter.className = 'year-filter active';
        allFilter.textContent = 'All';
        allFilter.dataset.year = 'all';
        allFilter.addEventListener('click', () => this.filterByYear('all'));
        filterContainer.appendChild(allFilter);
        
        // Create year-specific filters
        years.forEach(year => {
            const yearFilter = document.createElement('button');
            yearFilter.className = 'year-filter';
            yearFilter.textContent = year;
            yearFilter.dataset.year = year;
            yearFilter.addEventListener('click', () => this.filterByYear(year));
            filterContainer.appendChild(yearFilter);
        });
        
        return filterContainer;
    }
    
    filterByYear(year) {
        this.activeYear = year;
        
        // Update active class on filter buttons
        document.querySelectorAll('.year-filter').forEach(btn => {
            if (btn.dataset.year === year) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        const publicationsContent = document.querySelector('.publications-content');
        const yearSections = document.querySelectorAll('.publication-year-section');
        
        if (year === 'all') {
            // Show all years
            yearSections.forEach(section => {
                section.style.display = 'block';
            });
            // Scroll to top with improved behavior
            if (publicationsContent) {
                publicationsContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        } else {
            // Show only selected year
            yearSections.forEach(section => {
                if (section.dataset.year === year) {
                    section.style.display = 'block';
                    // Scroll to this year with improved behavior
                    if (publicationsContent) {
                        const sectionTop = section.offsetTop;
                        publicationsContent.scrollTo({
                            top: sectionTop,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    section.style.display = 'none';
                }
            });
        }
    }
    
    updateYearHighlight(container) {
        if (this.activeYear !== 'all') return;
        
        const yearSections = document.querySelectorAll('.publication-year-section');
        const scrollTop = container.scrollTop;
        const containerHeight = container.offsetHeight;
        const middlePosition = scrollTop + (containerHeight / 2);
        
        // Find the section that is most visible
        let mostVisibleSection = null;
        let maxVisibility = -1;
        
        yearSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionMiddle = (sectionTop + sectionBottom) / 2;
            
            // Calculate how "visible" this section is (closer to middle = more visible)
            const visibility = 1 / (Math.abs(middlePosition - sectionMiddle) + 1);
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisibleSection = section;
            }
        });
        
        if (mostVisibleSection) {
            const year = mostVisibleSection.dataset.year;
            // Update only the visual highlight, not the actual filter
            document.querySelectorAll('.year-filter').forEach(btn => {
                if (btn.dataset.year === year) {
                    btn.classList.add('highlight');
                } else {
                    btn.classList.remove('highlight');
                }
            });
        }
    }

    createPublicationCard(publication) {
        // Create publication card DOM element
        const card = document.createElement('div');
        card.className = 'publication-card';
        card.dataset.publicationId = publication.id;
        card.dataset.year = publication.year;
        
        // Citation badge HTML
        const citationBadge = publication.citations > 0 
            ? `<span class="citation-badge" title="Citation count"><i class="fas fa-quote-right"></i> ${publication.citations}</span>` 
            : '';
        
        card.innerHTML = `
            <div class="publication-content">
                <div class="publication-header">
                    <h3>
                        ${publication.googleScholarUrl ? 
                            `<a href="${publication.googleScholarUrl}" target="_blank">${publication.title}</a>` : 
                            publication.title}
                    </h3>
                    ${citationBadge}
                </div>
                <p class="publication-authors">${publication.authors}</p>
                <p class="publication-venue">${publication.venue} (${publication.year})${publication.pages ? `, pp. ${publication.pages}` : ''}</p>
            </div>
        `;
        
        return card;
    }

    loadFallbackPublications() {
        console.log('Using static HTML publications as fallback');
    }
}

// Initialize and load publications when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const loader = new PublicationsLoader({
        googleScholarId: 'JhARGjAAAAAJ',
        containerId: 'publications-container'
    });
    
    loader.loadPublications();
});
