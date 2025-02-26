/**
 * Script to fetch publications from Google Scholar
 * Note: Due to CORS restrictions, this might require a proxy server in production
 */
document.addEventListener('DOMContentLoaded', function() {
    const scholarID = 'JhARGjAAAAAJ'; // Your Google Scholar ID
    const publicationsSection = document.getElementById('publications-container');
    
    // Since direct calls to Google Scholar API aren't supported due to CORS, 
    // we'll use a predefined list that's updated periodically

    // In production, you would use:
    // fetchPublicationsFromProxy(scholarID);
    
    // For now, we'll use this function to simulate API fetch and render publications
    displayPublications([
        {
            title: "Real-Time Sensory Adaptive Learning for Engineering Students",
            conference: "ICL Conference 2022",
            url: "https://scholar.google.com.mx/citations?view_op=view_citation&hl=es&user=JhARGjAAAAAJ&citation_for_view=JhARGjAAAAAJ:u5HHmVD_uO8C"
        },
        {
            title: "Towards Diffusion Model-Based Dataset Augmentation for Negative Obstacle Detection Systems",
            conference: "ICECC 2024",
            url: "https://scholar.google.com.mx/citations?view_op=view_citation&hl=es&user=JhARGjAAAAAJ&citation_for_view=JhARGjAAAAAJ:2osOgNQ5qMEC"
        },
        {
            title: "Leveraging PIX2PIX architecture for saliency map generation from teaching slides",
            conference: "EDULEARN24",
            url: "https://scholar.google.com.mx/citations?view_op=view_citation&hl=es&user=JhARGjAAAAAJ&citation_for_view=JhARGjAAAAAJ:9yKSN-GCB0IC"
        },
        {
            title: "Bio-inspired explainable neuromorphic controller for path tracking and obstacle evasion using an array of Hindmarsh-Rose neurons",
            conference: "ISEM2024",
            url: "https://scholar.google.com.mx/citations?view_op=view_citation&hl=es&user=JhARGjAAAAAJ&citation_for_view=JhARGjAAAAAJ:u-x6o8ySG0sC"
        },
        {
            title: "Fatigue Analysis of Printed Composites of Onyx and Kevlar",
            conference: "",
            url: "https://scholar.google.com.mx/citations?view_op=view_citation&hl=es&user=JhARGjAAAAAJ&citation_for_view=JhARGjAAAAAJ:d1gkVwhDpl0C"
        },
        {
            title: "Methodology to Size a Battery Pack and Electric Motor with Real Drive-Cycles for Different Vehicles",
            conference: "",
            url: "#"
        },
        {
            title: "Multi-objective optimization methodology to select electric motor and battery pack using real drive-cycles",
            conference: "",
            url: "#"
        }
    ]);

    // Function to render publications
    function displayPublications(publications) {
        if (!publicationsSection) return;
        
        publicationsSection.innerHTML = '';
        
        publications.forEach(pub => {
            const card = document.createElement('div');
            card.className = 'publication-card';
            
            const title = document.createElement('h3');
            title.textContent = pub.title;
            
            const conference = document.createElement('p');
            conference.textContent = pub.conference;
            
            const link = document.createElement('a');
            link.href = pub.url;
            link.className = 'publication-link';
            link.textContent = 'View Publication';
            link.target = '_blank';
            
            card.appendChild(title);
            if (pub.conference) card.appendChild(conference);
            card.appendChild(link);
            
            publicationsSection.appendChild(card);
        });
    }

    /**
     * For production use with a proxy server:
     * 
     * function fetchPublicationsFromProxy(scholarID) {
     *     const proxyUrl = `https://your-proxy-server.com/scholar?id=${scholarID}`;
     *     
     *     fetch(proxyUrl)
     *         .then(response => response.json())
     *         .then(data => {
     *             displayPublications(data.publications);
     *         })
     *         .catch(error => {
     *             console.error('Error fetching publications:', error);
     *             // Fall back to the predefined list
     *             displayPublications(predefinedPublications);
     *         });
     * }
     */
    
    // For ORCID implementation, use:
    /**
     * function fetchPublicationsFromORCID(orcidID) {
     *     const orcidUrl = `https://pub.orcid.org/v3.0/${orcidID}/works`;
     *     
     *     fetch(orcidUrl, {
     *         headers: {
     *             'Accept': 'application/json'
     *         }
     *     })
     *     .then(response => response.json())
     *     .then(data => {
     *         // Transform ORCID data to our format
     *         const publications = data.group.map(item => {
     *             return {
     *                 title: item['work-summary'][0]['title']['title']['value'],
     *                 conference: item['work-summary'][0]['journal-title']?.['value'] || '',
     *                 url: item['work-summary'][0]['url']?.['value'] || '#'
     *             };
     *         });
     *         
     *         displayPublications(publications);
     *     })
     *     .catch(error => {
     *         console.error('Error fetching ORCID publications:', error);
     *         // Fall back to the predefined list
     *         displayPublications(predefinedPublications);
     *     });
     * }
     */
});
