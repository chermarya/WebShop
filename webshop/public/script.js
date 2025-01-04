document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const contentDiv = document.getElementById('content');

    async function loadContent(tab) {
        try {
            console.log(`Loading content for tab: ${tab}`);
            const response = await fetch(`${tab}.html`);
            if (!response.ok) throw new Error(`Failed to load ${tab}.html`);
            const html = await response.text();
            contentDiv.innerHTML = html;

            const script = document.createElement('script');
            script.src = `script-${tab}.js`;
            document.body.appendChild(script);

            console.log(`Content loaded for tab: ${tab}`);
        } catch (error) {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = `<p>Error loading content for ${tab}.</p>`;
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedTab = tab.dataset.tab;
            await loadContent(selectedTab);
        });
    });

    loadContent('users');
});
