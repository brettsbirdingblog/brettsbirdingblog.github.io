document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('blogSearch');
    const resultsList = document.getElementById('resultsList');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const year = document.getElementById('searchYear').value.trim();
        const date = document.getElementById('searchDate').value.trim();
        const topic = document.getElementById('searchTopic').value;

        resultsList.innerHTML = ""; // Always clear before showing results

        if (!year && !date && !topic) {
            resultsList.innerHTML = "<li>Please enter at least one search filter.</li>";
            return;
        }

        try {
            const res = await fetch('blog-data.json');
            const blogs = await res.json();

            const filtered = blogs.filter(blog => {
                return (!year || blog.year === year) &&
                       (!date || blog.date === date) &&
                       (!topic || blog.topics.includes(topic));
            });

            if (filtered.length === 0) {
                resultsList.innerHTML = "<li>No matching entries found.</li>";
            } else {
                filtered.forEach(blog => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = blog.url;
                    a.textContent = blog.title;
                    li.appendChild(a);
                    resultsList.appendChild(li);
                });
            }
            
        } catch (err) {
            resultsList.innerHTML = "<li>Error loading blog data.</li>";
            console.error(err);
        }
    });
});
