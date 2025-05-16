document.addEventListener('DOMContentLoaded', async () => {
    const resultsList = document.getElementById('resultsList');
    const filterYear = document.getElementById('filterYear');
    const filterDate = document.getElementById('filterDate');
    const filterTopic = document.getElementById('filterTopic');
    const sortOrder = document.getElementById('sortOrder');

    let blogs = [];

    // Load blog data once
    async function loadBlogs() {
        const res = await fetch('blog-data.json');
        blogs = await res.json();
        displayBlogs(blogs);
    }

    // Display blogs function
    function displayBlogs(entries) {
        resultsList.innerHTML = '';

        if (entries.length === 0) {
            resultsList.innerHTML = '<li>No entries found.</li>';
            return;
        }

        entries.forEach(blog => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.gap = '10px';

            const a = document.createElement('a');
            a.href = blog.url;
            a.textContent = blog.title;

            const meta = document.createElement('span');
            meta.className = 'blog-meta';
            meta.textContent = `${blog.date} at ${blog.time}`;

            li.appendChild(meta);
            li.appendChild(a);
            resultsList.appendChild(li);
        });
    }

    // Filter and sort handler
    function filterAndSort() {
        let filtered = blogs.filter(blog => {
            const yearMatch = !filterYear.value || blog.year === filterYear.value.trim();
            const dateMatch = !filterDate.value || blog.date === filterDate.value;
            const topicMatch = !filterTopic.value || blog.topics.includes(filterTopic.value);
            return yearMatch && dateMatch && topicMatch;
        });

        // Sort
        switch (sortOrder.value) {
            case 'date-desc':
                filtered.sort((a, b) => b.date.localeCompare(a.date));
                break;
            case 'date-asc':
                filtered.sort((a, b) => a.date.localeCompare(b.date));
                break;
            case 'title-asc':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }

        displayBlogs(filtered);
    }

    // Event listeners for inputs
    filterYear.addEventListener('input', filterAndSort);
    filterDate.addEventListener('change', filterAndSort);
    filterTopic.addEventListener('change', filterAndSort);
    sortOrder.addEventListener('change', filterAndSort);

    await loadBlogs();
});
