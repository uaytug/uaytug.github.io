new Vue({
    el: '#app',
    data: {
        name: '',
        jobTitle: '',
        jobDescription: '',
        skills: [],
        works: [],
        education: [],
        experience: [],
        hobbies: [],
        contacts: {}
    },
    created() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                this.name = data.name;
                this.jobTitle = data.jobTitle;
                this.jobDescription = data.jobDescription;
                this.skills = data.skills;
                this.works = data.works;
                this.education = data.education;
                this.experience = data.experience;
                this.hobbies = data.hobbies;
                this.contacts = data.contacts;
            });
    }
});

// Ek Animasyonlar ve Efektler
document.addEventListener('DOMContentLoaded', () => {
    // Scroll animasyonları için Intersection Observer
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-section');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});